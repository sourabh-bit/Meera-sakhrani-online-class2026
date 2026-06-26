from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
import secrets
import string
import urllib.parse
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')


def gen_mpm_id() -> str:
    alphabet = string.ascii_uppercase + string.digits
    return "MPM-" + "".join(secrets.choice(alphabet) for _ in range(8))


def now_utc_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class InMemoryInsertResult:
    def __init__(self, inserted_id: str):
        self.inserted_id = inserted_id


class InMemoryUpdateResult:
    def __init__(self, matched_count: int, modified_count: int):
        self.matched_count = matched_count
        self.modified_count = modified_count


class InMemoryCursor:
    def __init__(self, items):
        self._items = items

    def sort(self, key, direction):
        reverse = direction < 0
        self._items = sorted(self._items, key=lambda item: item.get(key, ""), reverse=reverse)
        return self

    async def to_list(self, length):
        return [item.copy() for item in self._items[:length]]


class InMemoryCollection:
    def __init__(self):
        self._docs = []

    def _matches(self, doc, query):
        return all(doc.get(k) == v for k, v in query.items())

    def _project(self, doc, projection):
        if not projection:
            return doc.copy()
        projected = doc.copy()
        if projection.get("_id") == 0:
            projected.pop("_id", None)
        return projected

    async def insert_one(self, doc):
        self._docs.append(doc.copy())
        return InMemoryInsertResult(doc.get("id", doc.get("mpm_id", "")))

    async def find_one(self, query, projection=None):
        for doc in self._docs:
            if self._matches(doc, query):
                return self._project(doc, projection)
        return None

    async def update_one(self, query, update):
        for idx, doc in enumerate(self._docs):
            if self._matches(doc, query):
                changes = update.get("$set", {})
                new_doc = doc.copy()
                new_doc.update(changes)
                self._docs[idx] = new_doc
                return InMemoryUpdateResult(1, 1)
        return InMemoryUpdateResult(0, 0)

    async def delete_one(self, query):
        for idx, doc in enumerate(self._docs):
            if self._matches(doc, query):
                del self._docs[idx]
                return InMemoryUpdateResult(1, 1)
        return InMemoryUpdateResult(0, 0)

    def find(self, query, projection=None):
        items = [self._project(doc, projection) for doc in self._docs if self._matches(doc, query)]
        return InMemoryCursor(items)


class InMemoryDB:
    def __init__(self):
        self.reservations = InMemoryCollection()


# MongoDB connection or local fallback
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME')
if mongo_url and db_name:
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    _using_memory_db = False
else:
    client = None
    db = InMemoryDB()
    _using_memory_db = True

ADMIN_PASSCODE = os.environ.get('ADMIN_PASSCODE') or 'admin'
UPI_ID = os.environ.get('UPI_ID') or 'meerasakhranibeauty.ibz@icici'
UPI_PAYEE_NAME = os.environ.get('UPI_PAYEE_NAME') or 'Meera Sakhrani Beauty'
BOOKING_AMOUNT = int(os.environ.get('BOOKING_AMOUNT', '15000') or '15000')

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ------------------ Models ------------------
class ReservationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    gst_number: Optional[str] = None
    pan_number: Optional[str] = None


class ReservationClaimPaid(BaseModel):
    utr: str


class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    mpm_id: str = Field(default_factory=gen_mpm_id)
    name: str
    email: str
    phone: str
    gst_number: Optional[str] = None
    pan_number: Optional[str] = None
    amount: int = BOOKING_AMOUNT
    status: Literal["pending", "approved", "rejected"] = "pending"
    utr: Optional[str] = None
    claimed_paid_at: Optional[str] = None
    decided_at: Optional[str] = None
    created_at: str = Field(default_factory=now_utc_iso)


class AdminLogin(BaseModel):
    passcode: str


# ------------------ Public meta ------------------
@api_router.get("/")
async def root():
    return {"message": "ok", "mode": "memory" if _using_memory_db else "mongo"}


@api_router.get("/payment-info")
async def payment_info():
    upi_uri = (
        f"upi://pay?pa={UPI_ID}"
        f"&pn={urllib.parse.quote(UPI_PAYEE_NAME)}"
        f"&am={BOOKING_AMOUNT}"
        f"&cu=INR"
        f"&tn={urllib.parse.quote('Signature Glam Look Masterclass')}"
    )
    qr_url = (
        "https://api.qrserver.com/v1/create-qr-code/"
        f"?size=320x320&margin=10&data={urllib.parse.quote(upi_uri)}"
    )
    return {
        "upi_id": UPI_ID,
        "payee_name": UPI_PAYEE_NAME,
        "amount": BOOKING_AMOUNT,
        "currency": "INR",
        "upi_uri": upi_uri,
        "qr_url": qr_url,
    }


# ------------------ Reservation flow ------------------
@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(payload: ReservationCreate):
    name = payload.name.strip()
    phone = payload.phone.strip()
    gst_number = payload.gst_number.strip() if payload.gst_number else None
    pan_number = payload.pan_number.strip().upper() if payload.pan_number else None
    if not name:
        raise HTTPException(status_code=400, detail="Name required")
    if not re.match(r"^[+\d][\d\s\-()+]{6,19}$", phone):
        raise HTTPException(status_code=400, detail="Invalid phone")
    if gst_number and not re.match(r"^[0-9A-Z]{15}$", gst_number.upper()):
        raise HTTPException(status_code=400, detail="Invalid GST number")
    if pan_number and not re.match(r"^[A-Z]{5}[0-9]{4}[A-Z]{1}$", pan_number.upper()):
        raise HTTPException(status_code=400, detail="Invalid PAN number")

    obj = Reservation(name=name, email=str(payload.email).strip().lower(), phone=phone, gst_number=gst_number, pan_number=pan_number)
    doc = obj.model_dump()
    await db.reservations.insert_one(doc)
    return obj


@api_router.post("/reservations/{mpm_id}/claim-paid", response_model=Reservation)
async def claim_paid(mpm_id: str, payload: ReservationClaimPaid):
    utr = payload.utr.strip()
    if len(utr) < 6:
        raise HTTPException(status_code=400, detail="Enter a valid UTR / reference number")

    doc = await db.reservations.find_one({"mpm_id": mpm_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Reservation not found")

    update = {
        "utr": utr,
        "claimed_paid_at": now_utc_iso(),
    }
    await db.reservations.update_one({"mpm_id": mpm_id}, {"$set": update})
    doc.update(update)
    return Reservation(**doc)


@api_router.get("/reservations/{mpm_id}", response_model=Reservation)
async def get_reservation(mpm_id: str):
    doc = await db.reservations.find_one({"mpm_id": mpm_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return Reservation(**doc)


# ------------------ Admin ------------------
def require_admin(x_admin_passcode: Optional[str] = Header(default=None)):
    if not x_admin_passcode or x_admin_passcode != ADMIN_PASSCODE:
        raise HTTPException(status_code=401, detail="Invalid passcode")
    return True


@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    if payload.passcode != ADMIN_PASSCODE:
        raise HTTPException(status_code=401, detail="Invalid passcode")
    return {"ok": True}


@api_router.get("/admin/reservations", response_model=List[Reservation])
async def admin_list_reservations(_: bool = Depends(require_admin)):
    cursor = db.reservations.find({}, {"_id": 0}).sort("created_at", -1)
    items = await cursor.to_list(1000)
    return [Reservation(**i) for i in items]


@api_router.post("/admin/reservations/{mpm_id}/approve", response_model=Reservation)
async def admin_approve(mpm_id: str, _: bool = Depends(require_admin)):
    doc = await db.reservations.find_one({"mpm_id": mpm_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Reservation not found")
    update = {"status": "approved", "decided_at": now_utc_iso()}
    await db.reservations.update_one({"mpm_id": mpm_id}, {"$set": update})
    doc.update(update)
    return Reservation(**doc)


@api_router.post("/admin/reservations/{mpm_id}/reject", response_model=Reservation)
async def admin_reject(mpm_id: str, _: bool = Depends(require_admin)):
    doc = await db.reservations.find_one({"mpm_id": mpm_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Reservation not found")
    update = {"status": "rejected", "decided_at": now_utc_iso()}
    await db.reservations.update_one({"mpm_id": mpm_id}, {"$set": update})
    doc.update(update)
    return Reservation(**doc)


@api_router.delete("/admin/reservations/{mpm_id}")
async def admin_delete_reservation(mpm_id: str, _: bool = Depends(require_admin)):
    doc = await db.reservations.find_one({"mpm_id": mpm_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Reservation not found")
    await db.reservations.delete_one({"mpm_id": mpm_id})
    return {"ok": True, "deleted": mpm_id}


# ------------------ App wiring ------------------
app.include_router(api_router)

def _get_cors_origins():
    raw = os.environ.get("CORS_ORIGINS")
    if raw:
        origins = [origin.strip() for origin in raw.split(",") if origin.strip()]
        if origins:
            return origins
    return [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]


def _get_cors_origin_regex():
    return os.environ.get("CORS_ORIGIN_REGEX") or r"https://.*\.vercel\.app"


app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=_get_cors_origins(),
    allow_origin_regex=_get_cors_origin_regex(),
    allow_methods=["*"],
    allow_headers=["*"],
)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()




