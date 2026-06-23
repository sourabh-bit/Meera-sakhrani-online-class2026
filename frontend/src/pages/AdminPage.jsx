import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, LogOut, RefreshCcw, ArrowLeft } from "lucide-react";

const API = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000") + "/api";
const STORAGE_KEY = "msk-admin-passcode";

async function readJsonResponse(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { detail: text || "Unexpected response from server" };
  }
}

const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

function formatDateTime(s) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleString();
  } catch {
    return s;
  }
}

function Lock({ onUnlocked }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const r = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: code }),
      });
      if (!r.ok) {
        const d = await readJsonResponse(r);
        throw new Error(d.detail || "Invalid passcode");
      }
      localStorage.setItem(STORAGE_KEY, code);
      onUnlocked(code);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="admin-lock"
      className="min-h-screen bg-[#0d0d0d] text-[#f5ede7] flex items-center justify-center px-6 relative"
    >
      <Link
        to="/"
        data-testid="admin-lock-back"
        className="absolute top-6 left-6 md:top-8 md:left-8 inline-flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} /> Home
      </Link>

      <form
        onSubmit={submit}
        className="w-full max-w-xl"
      >
        <p className="text-[10px] tracking-[0.32em] uppercase text-[#9b8a7c] font-semibold">
          Admin
        </p>
        <h1 className="mt-6 font-serif-display text-[56px] md:text-[88px] leading-[0.95] text-white">
          Enter <span className="italic">passcode.</span>
        </h1>

        <input
          data-testid="admin-passcode-input"
          type="password"
          required
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-12 w-full bg-transparent border-b border-white/40 focus:border-white outline-none py-3 text-[24px] md:text-[28px] tracking-[0.45em] text-white placeholder:text-white/30"
          placeholder="••••••••"
        />

        {err && (
          <p className="mt-4 text-[12px] tracking-[0.06em] text-red-400">{err}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          data-testid="admin-unlock-btn"
          className="mt-10 inline-flex items-center gap-3 bg-white text-[#0d0d0d] px-9 py-4 text-[11px] tracking-[0.34em] uppercase font-semibold hover:bg-[#e6d6ca] transition-all disabled:opacity-60"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          Unlock <ArrowRight size={14} />
        </button>
      </form>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    pending: "bg-[#eee4d8] text-[#7a6455]",
    approved: "bg-[#1f6f4e] text-[#f5ede7]",
    rejected: "bg-[#7a1f2a] text-[#f5ede7]",
  };
  return (
    <span
      data-testid={`status-pill-${status}`}
      className={`px-3 py-1.5 text-[10px] tracking-[0.32em] uppercase font-semibold ${
        map[status] || "bg-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

function ReservationCard({ r, onAct, busy }) {
  return (
    <article
      data-testid={`res-${r.mpm_id}`}
      className="bg-[#f4eee9] border border-[#e3d2c8] rounded-sm p-7 md:p-9"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif-display text-[28px] md:text-[34px] text-[#3b2f33] leading-tight">
            {r.name}
          </h3>
          <p className="mt-1 text-[10px] tracking-[0.3em] uppercase text-[#9b8a7c] font-semibold">
            {r.mpm_id}
          </p>
        </div>
        <StatusPill status={r.status} />
      </div>

      <dl className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
        {[
          { k: "Email", v: r.email },
          { k: "Phone", v: r.phone },
          { k: "Amount", v: `Rs ${r.amount?.toLocaleString("en-IN")}` },
          { k: "Created", v: formatDateTime(r.created_at) },
          {
            k: "Claimed Paid At",
            v: r.claimed_paid_at ? formatDateTime(r.claimed_paid_at) : "Not claimed yet",
          },
          { k: "UTR", v: r.utr || "—" },
          { k: "Decided At", v: r.decided_at ? formatDateTime(r.decided_at) : "—" },
        ].map((row) => (
          <div key={row.k}>
            <dt className="text-[10px] tracking-[0.3em] uppercase text-[#9b8a7c] font-semibold">
              {row.k}
            </dt>
            <dd className="mt-1.5 font-serif-body text-[16px] md:text-[17px] text-[#3b2f33] break-all">
              {row.v}
            </dd>
          </div>
        ))}
      </dl>

      {r.status === "pending" && (
        <div className="mt-7 flex items-center gap-3">
          <button
            data-testid={`approve-${r.mpm_id}`}
            disabled={busy}
            onClick={() => onAct(r.mpm_id, "approve")}
            className="px-7 py-3 bg-[#3b2f33] text-[#f5ede7] text-[10.5px] tracking-[0.32em] uppercase font-semibold hover:bg-[#1f1719] disabled:opacity-60 transition-all"
          >
            Approve
          </button>
          <button
            data-testid={`reject-${r.mpm_id}`}
            disabled={busy}
            onClick={() => onAct(r.mpm_id, "reject")}
            className="px-7 py-3 border border-[#3b2f33]/40 text-[#3b2f33] text-[10.5px] tracking-[0.32em] uppercase font-semibold hover:bg-[#3b2f33] hover:text-[#f5ede7] disabled:opacity-60 transition-all"
          >
            Reject
          </button>
        </div>
      )}
    </article>
  );
}

export default function AdminPage() {
  const [code, setCode] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState("all");

  const load = async (pcode = code) => {
    if (!pcode) return;
    setLoading(true);
    try {
      const r = await fetch(`${API}/admin/reservations`, {
        headers: { "X-Admin-Passcode": pcode },
      });
      if (r.status === 401) {
        localStorage.removeItem(STORAGE_KEY);
        setCode(null);
        return;
      }
      const data = await readJsonResponse(r);
      setList(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) load(code);
    // eslint-disable-next-line
  }, [code]);

  if (!code) return <Lock onUnlocked={(c) => setCode(c)} />;

  const onAct = async (mpm, action) => {
    if (!window.confirm(`${action.toUpperCase()} this reservation?`)) return;
    setBusy(true);
    try {
      await fetch(`${API}/admin/reservations/${mpm}/${action}`, {
        method: "POST",
        headers: { "X-Admin-Passcode": code },
      });
      await load();
    } finally {
      setBusy(false);
    }
  };

  const counts = {
    all: list.length,
    pending: list.filter((r) => r.status === "pending").length,
    approved: list.filter((r) => r.status === "approved").length,
    rejected: list.filter((r) => r.status === "rejected").length,
  };

  const filtered = tab === "all" ? list : list.filter((r) => r.status === tab);

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCode(null);
  };

  return (
    <div className="min-h-screen bg-[#f5ede7]" data-testid="admin-page">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <Link
          to="/"
          data-testid="admin-back"
          className="inline-flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#3b2f33] hover:text-[#7a6455] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#9b8a7c] font-semibold">
              Admin
            </p>
            <h1
              data-testid="admin-title"
              className="mt-4 font-serif-display text-[48px] md:text-[72px] leading-[0.95] text-[#3b2f33]"
            >
              Reservations
            </h1>
            <p className="mt-4 text-[14.5px] text-[#5a4750]">
              Verify UPI payments and approve or reject reservations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {STATUS_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                data-testid={`tab-${t.id}`}
                className={`px-4 py-2.5 text-[10px] tracking-[0.3em] uppercase font-semibold border transition-all ${
                  tab === t.id
                    ? "bg-[#0d0d0d] text-[#f5ede7] border-[#0d0d0d]"
                    : "bg-[#f5ede7] text-[#3b2f33] border-[#3b2f33]/25 hover:border-[#3b2f33]"
                }`}
              >
                {t.label}
                <span className="ml-2 text-[9px] opacity-70">
                  {counts[t.id]}
                </span>
              </button>
            ))}
            <button
              onClick={() => load()}
              data-testid="refresh-btn"
              className="ml-1 p-2.5 border border-[#3b2f33]/25 text-[#3b2f33] hover:bg-[#3b2f33] hover:text-[#f5ede7] transition-all"
              aria-label="Refresh"
            >
              <RefreshCcw size={14} />
            </button>
            <button
              onClick={logout}
              data-testid="logout-btn"
              className="p-2.5 border border-[#3b2f33]/25 text-[#3b2f33] hover:bg-[#3b2f33] hover:text-[#f5ede7] transition-all"
              aria-label="Lock"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-14 space-y-5">
          {loading && (
            <div className="flex items-center gap-2 text-[#7a6455] text-[13px]">
              <Loader2 size={14} className="animate-spin" /> Loading...
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 font-serif-display italic text-[24px] text-[#8a7b71]">
              No reservations in this view.
            </div>
          )}
          {filtered.map((r) => (
            <ReservationCard key={r.mpm_id} r={r} onAct={onAct} busy={busy} />
          ))}
        </div>
      </div>
    </div>
  );
}



