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

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_PASSCODE = os.environ.get('ADMIN_PASSCODE', '')
UPI_ID = os.environ.get('UPI_ID', '')
UPI_PAYEE_NAME = os.environ.get('UPI_PAYEE_NAME', '')
BOOKING_AMOUNT = int(os.environ.get('BOOKING_AMOUNT', '17700') or '17700')

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ------------------ Models ------------------
def gen_mpm_id() -> str:
    alphabet = string.ascii_uppercase + string.digits
    return "MPM-" + "".join(secrets.choice(alphabet) for _ in range(8))


def now_utc_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class ReservationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str


class ReservationClaimPaid(BaseModel):
    utr: str


class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    mpm_id: str = Field(default_factory=gen_mpm_id)
    name: str
    email: str
    phone: str
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
    return {"message": "ok"}


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
    if not name:
        raise HTTPException(status_code=400, detail="Name required")
    if not re.match(r"^[+\d][\d\s\-()+]{6,19}$", phone):
        raise HTTPException(status_code=400, detail="Invalid phone")

    obj = Reservation(name=name, email=str(payload.email).strip().lower(), phone=phone)
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
    if not ADMIN_PASSCODE or not x_admin_passcode or x_admin_passcode != ADMIN_PASSCODE:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True


@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    if not ADMIN_PASSCODE or payload.passcode != ADMIN_PASSCODE:
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


# ------------------ App wiring ------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
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
    client.close()
