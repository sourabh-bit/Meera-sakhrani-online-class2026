import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Copy,
  Check,
  ArrowLeft,
  Loader2,
  PartyPopper,
  XCircle,
  Hourglass,
} from "lucide-react";

const API = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000") + "/api";

async function readJsonResponse(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { detail: text || "Unexpected response from server" };
  }
}

const STEPS = { FORM: 0, PAY: 1, DONE: 2 };

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.FORM);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [copied, setCopied] = useState(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [reservation, setReservation] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [utr, setUtr] = useState("");

  useEffect(() => {
    fetch(`${API}/payment-info`)
      .then((r) => readJsonResponse(r))
      .then(setPaymentInfo)
      .catch(() => {});
  }, []);

  // Poll status while on DONE step and still pending
  useEffect(() => {
    if (step !== STEPS.DONE || !reservation?.mpm_id) return;
    if (reservation.status !== "pending") return;
    let alive = true;
    const tick = async () => {
      try {
        const r = await fetch(`${API}/reservations/${reservation.mpm_id}`);
        if (!r.ok) return;
        const data = await readJsonResponse(r);
        if (alive) setReservation(data);
      } catch {
        /* ignore */
      }
    };
    const id = setInterval(tick, 4000);
    tick();
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [step, reservation?.mpm_id, reservation?.status]);

  const onCreate = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const r = await fetch(`${API}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await readJsonResponse(r);
      if (!r.ok) throw new Error(data.detail || "Failed");
      setReservation(data);
      setStep(STEPS.PAY);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onClaim = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const r = await fetch(
        `${API}/reservations/${reservation.mpm_id}/claim-paid`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ utr }),
        }
      );
      const data = await readJsonResponse(r);
      if (!r.ok) throw new Error(data.detail || "Failed");
      setReservation(data);
      setStep(STEPS.DONE);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = (k, v) => {
    navigator.clipboard?.writeText(v).then(() => {
      setCopied(k);
      setTimeout(() => setCopied(null), 1400);
    });
  };

  return (
    <div className="min-h-screen bg-[#f5ede7]" data-testid="checkout-page">
      <header className="max-w-[1100px] mx-auto px-5 md:px-10 py-5 md:py-8 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          data-testid="checkout-back"
          className="inline-flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#3b2f33] hover:text-[#7a6455] transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <Link
          to="/"
          className="font-serif-display italic text-[18px] md:text-[24px] text-[#2d2326]"
        >
          Signature Glam
        </Link>
        <div className="w-12" />
      </header>

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pb-28 md:pb-24">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-6 flex-nowrap">
          {[
            { full: "Details", short: "Details" },
            { full: "Payment", short: "Pay" },
            { full: "Confirmed", short: "Done" },
          ].map((s, i) => (
            <div
              key={s.full}
              className="flex items-center gap-1.5 sm:gap-4 md:gap-6"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className={`shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-semibold transition-colors ${
                    step >= i
                      ? "bg-[#7a6455] text-[#f5ede7]"
                      : "bg-[#eee4d8] text-[#7a6455]"
                  }`}
                >
                  {step > i ? <Check size={12} /> : i + 1}
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] tracking-[0.24em] sm:tracking-[0.3em] uppercase font-semibold whitespace-nowrap ${
                    step >= i ? "text-[#3b2f33]" : "text-[#9b8a7c]"
                  }`}
                >
                  <span className="sm:hidden">{s.short}</span>
                  <span className="hidden sm:inline">{s.full}</span>
                </span>
              </div>
              {i < 2 && (
                <span
                  className={`h-px w-3 sm:w-6 md:w-12 shrink-0 ${
                    step > i ? "bg-[#7a6455]" : "bg-[#dcc8be]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <h1 className="mt-10 md:mt-16 text-center font-serif-display text-[34px] sm:text-[42px] md:text-[60px] leading-[1.02] text-[#3b2f33]">
          {step === STEPS.FORM && (
            <>
              Reserve your <span className="italic text-[#7a6455]">seat</span>
            </>
          )}
          {step === STEPS.PAY && (
            <>
              Pay by <span className="italic text-[#7a6455]">UPI</span>
            </>
          )}
          {step === STEPS.DONE && reservation?.status === "approved" && (
            <>
              Seat <span className="italic text-[#1f6f4e]">reserved.</span>
            </>
          )}
          {step === STEPS.DONE && reservation?.status === "rejected" && (
            <>
              Payment <span className="italic text-[#7a1f2a]">not verified.</span>
            </>
          )}
          {step === STEPS.DONE &&
            (!reservation?.status || reservation?.status === "pending") && (
              <>
                You&apos;re almost{" "}
                <span className="italic text-[#7a6455]">in.</span>
              </>
            )}
        </h1>

        <p className="mt-3 md:mt-4 text-center text-[14px] md:text-[16px] text-[#5a4750] max-w-xl mx-auto px-2">
          {step === STEPS.FORM &&
            "Tell us a little about you — we'll send your confirmation here."}
          {step === STEPS.PAY &&
            "Scan the QR or use the UPI ID below. Then enter your UTR / reference number."}
          {step === STEPS.DONE &&
            reservation?.status === "approved" &&
            "Your payment has been verified. Welcome to the masterclass — see you on the day."}
          {step === STEPS.DONE &&
            reservation?.status === "rejected" &&
            "We could not verify this payment. Please contact support with your reservation ID."}
          {step === STEPS.DONE &&
            (!reservation?.status || reservation?.status === "pending") &&
            "Thanks — your payment is being verified. This page will update once our team confirms."}
        </p>

        <div className="mt-10 md:mt-14">
          {step === STEPS.FORM && (
            <form
              data-testid="checkout-form"
              onSubmit={onCreate}
              className="max-w-xl mx-auto bg-white/60 border border-[#e3d2c8] rounded-sm p-7 md:p-9 space-y-5"
            >
              {[
                { k: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                { k: "email", label: "Email", type: "email", placeholder: "you@email.com" },
                { k: "phone", label: "Phone", type: "tel", placeholder: "+91 9XXXXXXXXX" },
              ].map((f) => (
                <div key={f.k}>
                  <label className="text-[10px] tracking-[0.32em] uppercase text-[#7a6455] font-semibold">
                    {f.label}
                  </label>
                  <input
                    data-testid={`field-${f.k}`}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    className="mt-2 w-full bg-transparent border-b border-[#3b2f33]/30 focus:border-[#7a6455] outline-none py-2.5 font-serif-body text-[18px] md:text-[20px] text-[#3b2f33] placeholder:text-[#9b8a7c] transition-colors"
                  />
                </div>
              ))}

              <div className="pt-2 flex items-center justify-between text-[14px]">
                <p className="text-[#5a4750]">
                  Booking amount:{" "}
                  <span className="font-serif-display text-[20px] text-[#7a6455]">
                    INR 17,700
                  </span>
                </p>
              </div>

              {err && (
                <p className="text-[13px] text-red-700" data-testid="form-error">
                  {err}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                data-testid="continue-to-pay-btn"
                className="w-full px-8 py-4 rounded-full bg-[#7a6455] text-[#f5ede7] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5b4a40] transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
                Continue to Payment
              </button>
            </form>
          )}

          {step === STEPS.PAY && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {/* QR card */}
              <div
                data-testid="qr-card"
                className="bg-white/70 border border-[#e3d2c8] rounded-sm p-6 md:p-9 text-center"
              >
                <p className="text-[10px] tracking-[0.32em] uppercase text-[#7a6455] font-semibold">
                  Scan to Pay
                </p>
                <h3 className="mt-2 font-serif-display text-[26px] md:text-[30px] text-[#3b2f33]">
                  INR <span className="font-semibold">17,700</span>
                </h3>
                <div className="mt-5 mx-auto w-[260px] max-w-full bg-white p-3 rounded-sm border border-[#e3d2c8]">
                  {paymentInfo?.qr_url ? (
                    <img
                      data-testid="qr-image"
                      src={paymentInfo.qr_url}
                      alt="UPI QR"
                      className="w-full h-auto"
                    />
                  ) : (
                    <div className="aspect-square animate-pulse bg-[#f5ede7]" />
                  )}
                </div>
                <p className="mt-5 text-[12px] tracking-[0.05em] text-[#5a4750] font-sans not-italic">
                  Open any UPI app · GPay · PhonePe · Paytm · BHIM
                </p>
                {paymentInfo?.upi_uri && (
                  <a
                    data-testid="upi-app-link"
                    href={paymentInfo.upi_uri}
                    className="mt-5 inline-flex md:hidden px-6 py-3 rounded-full bg-[#3b2f33] text-[#f5ede7] text-[10.5px] tracking-[0.32em] uppercase font-semibold"
                  >
                    Open UPI App
                  </a>
                )}
              </div>

              {/* UPI ID + UTR */}
              <div className="bg-white/70 border border-[#e3d2c8] rounded-sm p-6 md:p-9">
                <p className="text-[10px] tracking-[0.32em] uppercase text-[#7a6455] font-semibold">
                  Or pay to this UPI ID
                </p>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <p
                    data-testid="upi-id-text"
                    className="font-serif-body text-[18px] md:text-[20px] text-[#3b2f33] break-all"
                  >
                    {paymentInfo?.upi_id || "—"}
                  </p>
                  {paymentInfo?.upi_id && (
                    <button
                      onClick={() => copy("upi", paymentInfo.upi_id)}
                      data-testid="copy-upi-id"
                      aria-label="Copy UPI ID"
                      className="shrink-0 w-9 h-9 rounded-full border border-[#7a6455]/30 flex items-center justify-center text-[#7a6455] hover:bg-[#7a6455] hover:text-[#f5ede7] hover:border-[#7a6455] transition-all"
                    >
                      {copied === "upi" ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  )}
                </div>

                <div className="mt-6 p-4 bg-[#eee4d8]/60 border border-[#dfd2c4] rounded-sm text-[12px] text-[#5a4750] leading-relaxed">
                  Reservation ID:{" "}
                  <span className="font-semibold text-[#3b2f33]">
                    {reservation?.mpm_id}
                  </span>
                  <br />
                  After paying, enter your{" "}
                  <span className="italic">UTR / reference number</span> below
                  and click{" "}
                  <span className="font-semibold">&ldquo;I Have Paid&rdquo;</span>.
                </div>

                <form onSubmit={onClaim} className="mt-6">
                  <label className="text-[10px] tracking-[0.32em] uppercase text-[#7a6455] font-semibold">
                    UTR / Reference No.
                  </label>
                  <input
                    data-testid="utr-input"
                    type="text"
                    required
                    placeholder="e.g. 234567890123"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    className="mt-2 w-full bg-transparent border-b border-[#3b2f33]/30 focus:border-[#7a6455] outline-none py-2.5 font-serif-body text-[18px] md:text-[20px] text-[#3b2f33] placeholder:text-[#9b8a7c] transition-colors"
                  />
                  {err && (
                    <p className="mt-3 text-[13px] text-red-700">{err}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="have-paid-btn"
                    className="mt-6 w-full px-8 py-4 rounded-full bg-[#7a6455] text-[#f5ede7] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5b4a40] transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 size={14} className="animate-spin" />}
                    I Have Paid
                  </button>
                </form>
              </div>
            </div>
          )}

          {step === STEPS.DONE && reservation && (
            <div
              data-testid="success-panel"
              className="max-w-xl mx-auto bg-white/70 border border-[#e3d2c8] rounded-sm p-6 md:p-12 text-center"
            >
              {reservation.status === "approved" && (
                <div className="mx-auto w-14 h-14 rounded-full bg-[#dcf0e6] flex items-center justify-center">
                  <PartyPopper size={24} className="text-[#1f6f4e]" />
                </div>
              )}
              {reservation.status === "rejected" && (
                <div className="mx-auto w-14 h-14 rounded-full bg-[#f6e0e3] flex items-center justify-center">
                  <XCircle size={24} className="text-[#7a1f2a]" />
                </div>
              )}
              {(!reservation.status || reservation.status === "pending") && (
                <div className="mx-auto w-14 h-14 rounded-full bg-[#eee4d8] flex items-center justify-center relative">
                  <Hourglass size={22} className="text-[#7a6455]" />
                  <span className="absolute inset-0 rounded-full ring-2 ring-[#7a6455]/30 animate-ping" />
                </div>
              )}

              <h3 className="mt-5 md:mt-6 font-serif-display text-[24px] md:text-[32px] text-[#3b2f33]">
                {reservation.status === "approved" && "Your seat is confirmed"}
                {reservation.status === "rejected" && "Reservation rejected"}
                {(!reservation.status || reservation.status === "pending") &&
                  "Payment submitted"}
              </h3>
              <p className="mt-2 md:mt-3 text-[14px] md:text-[15px] text-[#5a4750] leading-relaxed px-2">
                {reservation.status === "approved" &&
                  "We've sent the masterclass details with the joining link to your email."}
                {reservation.status === "rejected" &&
                  "If you believe this is a mistake, contact support with your reservation ID."}
                {(!reservation.status || reservation.status === "pending") &&
                  "We've recorded your UTR. Our team will verify and confirm your seat shortly. This page refreshes automatically."}
              </p>

              <ul className="mt-6 md:mt-7 text-left bg-[#f5ede7]/70 border border-[#e3d2c8] rounded-sm p-4 md:p-5 space-y-3">
                <li className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-[13.5px] md:text-[14px]">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-[#7a6455] font-semibold">
                    Reservation
                  </span>
                  <span className="font-serif-body text-[#3b2f33] sm:text-right break-all">
                    {reservation.mpm_id}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-[13.5px] md:text-[14px]">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-[#7a6455] font-semibold">
                    UTR
                  </span>
                  <span className="font-serif-body text-[#3b2f33] sm:text-right break-all">
                    {reservation.utr}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-[13.5px] md:text-[14px]">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-[#7a6455] font-semibold">
                    Amount
                  </span>
                  <span className="font-serif-body text-[#3b2f33] sm:text-right">
                    INR {reservation.amount.toLocaleString("en-IN")}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-[13.5px] md:text-[14px]">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-[#7a6455] font-semibold">
                    Status
                  </span>
                  <span
                    data-testid="reservation-status"
                    className={`font-serif-body sm:text-right uppercase tracking-[0.18em] text-[12px] font-semibold ${
                      reservation.status === "approved"
                        ? "text-[#1f6f4e]"
                        : reservation.status === "rejected"
                          ? "text-[#7a1f2a]"
                          : "text-[#7a6455]"
                    }`}
                  >
                    {reservation.status || "pending"}
                  </span>
                </li>
              </ul>

              <Link
                to="/"
                data-testid="back-home-btn"
                className="mt-8 inline-flex w-full sm:w-auto items-center justify-center px-8 py-3.5 rounded-full bg-[#7a6455] text-[#f5ede7] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5b4a40] transition-all"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}








