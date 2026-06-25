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
const WHATSAPP_NUMBER = "919818793850";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi MS Art, I have paid and shared the screenshot.")}`;
const UPI_APP_SHORTCUTS = [
  { label: "PhonePe", androidPackage: "com.phonepe.app", iosScheme: "phonepe" },
  { label: "Google Pay", androidPackage: "com.google.android.apps.nbu.paisa.user", iosScheme: "tez" },
  { label: "Paytm", androidPackage: "net.one97.paytm", iosScheme: "paytmmp" },
  { label: "BHIM", androidPackage: "in.org.npci.upiapp", iosScheme: "bhim" },
];

function buildPaymentLaunchUrl(app, paymentInfo) {
  const params = new URLSearchParams({
    pa: paymentInfo.upi_id,
    pn: paymentInfo.payee_name,
    am: String(paymentInfo.amount),
    cu: paymentInfo.currency || "INR",
    tn: "Signature Glam Look Masterclass",
  });
  const query = params.toString();
  const isAndroid = /Android/i.test(navigator.userAgent || "");
  if (isAndroid) {
    return `intent://pay?${query}#Intent;scheme=upi;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=${app.androidPackage};end`;
  }
  return `${app.iosScheme}://pay?${query}`;
}

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
  const [showUpiChooser, setShowUpiChooser] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", gst_number: "", pan_number: "" });
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
      const whatsappMessage = `Hi Ms Art. this is ${form.name}. I have paid this is my screenshot. UTR id ${utr}.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener,noreferrer");
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
  const openUpiApp = (app) => {
    if (!paymentInfo?.upi_uri) return;
    const launchUrl = buildPaymentLaunchUrl(app, paymentInfo);
    setShowUpiChooser(false);
    window.location.href = launchUrl;
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
            "Tell us a little about you - we'll send your confirmation here."}
          {step === STEPS.PAY &&
            "Scan the QR or use the UPI ID below. Then enter your UTR / reference number."}
          {step === STEPS.DONE &&
            reservation?.status === "approved" &&
            "Your payment has been verified. Welcome to the masterclass - see you on the day."}
          {step === STEPS.DONE &&
            reservation?.status === "rejected" &&
            "We could not verify this payment. Please contact support with your reservation ID."}
          {step === STEPS.DONE &&
            (!reservation?.status || reservation?.status === "pending") &&
            "Thanks - your payment is being verified. This page will update once our team confirms."}
        </p>

        <div className="mt-10 md:mt-14">
          {step === STEPS.FORM && (
            <form
              data-testid="checkout-form"
              onSubmit={onCreate}
              className="max-w-xl mx-auto bg-white/60 border border-[#e3d2c8] rounded-sm p-7 md:p-9 space-y-5"
            >
              {[
                { k: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
                { k: "email", label: "Email", type: "email", placeholder: "you@email.com", required: true },
                { k: "phone", label: "Phone", type: "tel", placeholder: "+91 9XXXXXXXXX", required: true },
                { k: "gst_number", label: "GST Number (Optional)", type: "text", placeholder: "15-digit GST number", required: false },
                { k: "pan_number", label: "PAN Number (Optional)", type: "text", placeholder: "ABCDE1234F", required: false },
              ].map((f) => (
                <div key={f.k}>
                  <label className="text-[10px] tracking-[0.32em] uppercase text-[#7a6455] font-semibold">
                    {f.label}
                  </label>
                  <input
                    data-testid={`field-${f.k}`}
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={form[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    className="mt-2 w-full bg-transparent border-b border-[#3b2f33]/30 focus:border-[#7a6455] outline-none py-2.5 font-serif-body text-[18px] md:text-[20px] text-[#3b2f33] placeholder:text-[#9b8a7c] transition-colors uppercase tracking-[0.08em]"
                  />
                </div>
              ))}

              <div className="pt-2 space-y-2 text-[14px]">
                <p className="text-[#5a4750]">
                  Booking amount:{" "}
                  <span className="font-serif-display text-[20px] text-[#7a6455]">
                    12711 + gst = 15000
                  </span>
                </p>
                <p className="text-[12px] md:text-[13px] text-[#5a4750]">
                  Base fee INR 12,711 + gst = 15000
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
                  12711 + gst = 15000
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
                <div className="mt-5 rounded-lg border border-[#7a6455]/20 bg-[#7a6455]/10 px-4 py-3 text-center shadow-[0_8px_24px_rgba(122,100,85,0.08)]">
                  <p className="text-[11px] md:text-[12px] font-semibold tracking-[0.14em] uppercase text-[#3b2f33]">After paying, send the screenshot on WhatsApp to MS Art.</p>
                </div>
                {paymentInfo?.upi_uri && (
                  <button
                    data-testid="upi-app-link"
                    type="button"
                    onClick={() => setShowUpiChooser(true)}
                    className="mt-5 inline-flex md:hidden px-6 py-3 rounded-full bg-[#3b2f33] text-[#f5ede7] text-[10.5px] tracking-[0.32em] uppercase font-semibold"
                  >
                    Open UPI App
                  </button>
                )}
              </div>

              {showUpiChooser && paymentInfo?.upi_uri && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/45 px-4 py-6 md:p-6">
                  <div className="w-full max-w-md rounded-2xl bg-[#f7efea] border border-[#7a6455]/20 shadow-[0_18px_48px_rgba(0,0,0,0.22)] p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.32em] uppercase text-[#7a6455] font-semibold">Choose UPI app</p>
                        <h3 className="mt-2 font-serif-display text-[24px] text-[#2d2326]">Open with</h3>
                        <p className="mt-2 text-[12px] leading-relaxed text-[#5a4750]">Pick the app you want to pay with.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowUpiChooser(false)}
                        aria-label="Close UPI chooser"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#7a6455]/20 bg-white text-[#3b2f33]"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {UPI_APP_SHORTCUTS.map((app) => (
                        <button
                          key={app.androidPackage}
                          type="button"
                          onClick={() => openUpiApp(app)}
                          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#7a6455]/20 bg-white px-3 py-4 text-center transition-colors hover:bg-[#f5ede7]"
                        >
                          <span className="text-[13px] font-semibold text-[#2d2326]">{app.label}</span>
                          <span className="text-[10px] uppercase tracking-[0.22em] text-[#7a6455]">Installed app</span>
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowUpiChooser(false)}
                      className="mt-4 w-full rounded-full bg-[#3b2f33] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f5ede7]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {/* UPI ID + UTR */}
              <div className="rounded-xl border border-[#7a6455]/20 bg-[#f7efea] p-6 md:p-9 shadow-[0_10px_28px_rgba(122,100,85,0.08)]">
                <p className="inline-flex rounded-full bg-[#7a6455] px-3 py-1 text-[10px] tracking-[0.32em] uppercase text-[#f5ede7] font-semibold">
                  Or pay to this UPI ID
                </p>
                <div className="mt-4 flex items-start justify-between gap-3 rounded-lg border border-[#e4d5ca] bg-white px-4 py-4">
                  <p
                    data-testid="upi-id-text"
                    className="font-serif-body text-[18px] md:text-[20px] text-[#3b2f33] break-all font-semibold"
                  >
                    {paymentInfo?.upi_id || "-"}
                  </p>
                  {paymentInfo?.upi_id && (
                    <button
                      onClick={() => copy("upi", paymentInfo.upi_id)}
                      data-testid="copy-upi-id"
                      aria-label="Copy UPI ID"
                      className="shrink-0 w-10 h-10 rounded-full border border-[#7a6455]/30 bg-[#f7efea] flex items-center justify-center text-[#7a6455] hover:bg-[#7a6455] hover:text-[#f5ede7] hover:border-[#7a6455] transition-all"
                    >
                      {copied === "upi" ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  )}
                </div>

                <div className="mt-6 p-4 bg-[#eee4d8]/60 border border-[#dfd2c4] rounded-sm text-[12px] text-[#5a4750] leading-relaxed">
                  Reservation ID: {" "}
                  <span className="font-semibold text-[#3b2f33]">
                    {reservation?.mpm_id}
                  </span>
                  <br />
                  After paying, enter your {" "}
                  <span className="italic">UTR / reference number</span> below
                  and click {" "}
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
                    className="mt-2 w-full bg-transparent border-b border-[#3b2f33]/30 focus:border-[#7a6455] outline-none py-2.5 font-serif-body text-[18px] md:text-[20px] text-[#3b2f33] placeholder:text-[#9b8a7c] transition-colors uppercase tracking-[0.08em]"
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
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          data-testid="whatsapp-chat-btn"
          aria-label="Chat with MS Art on WhatsApp"
          className="fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-transparent transition-transform duration-300 hover:scale-105 md:bottom-7 md:right-7 md:h-12 md:w-12"
        >
          <svg
            viewBox="0 0 64 64"
            aria-hidden="true"
            className="block h-full w-full drop-shadow-[0_8px_18px_rgba(37,211,102,0.22)]"
          >
            <rect x="4" y="4" width="56" height="56" rx="18" fill="#25D366" />
            <rect x="12" y="12" width="40" height="40" rx="14" fill="#2fd865" />
            <path
              d="M32 18.5c-7.5 0-13.6 5.5-13.6 12.3 0 2.9 1 5.7 2.9 8l-1.7 7.6 7.8-2c2.1 1 4.5 1.5 7 1.5 7.5 0 13.6-5.5 13.6-12.3S39.5 18.5 32 18.5Z"
              fill="#fff"
            />
            <path
              d="M22.2 29.1c0-1.3.6-2.5 1.6-3.2l.9-.7c1-.8 2.5-.6 3.4.4l1.4 1.6c.7.8.8 2 .2 2.9l-1 1.3c-.2.3-.3.7-.1 1.1.6 1.2 1.6 2.2 2.8 2.8.4.2.8.1 1.1-.1l1.3-1c.9-.6 2.1-.5 2.9.2l1.6 1.4c1 .9 1.2 2.4.4 3.4l-.7.9c-.7 1-1.9 1.6-3.2 1.6h-.4c-2.8 0-5.6-1-7.7-2.7-3-2.4-5-6.2-5-9.9Z"
              fill="#25D366"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}















