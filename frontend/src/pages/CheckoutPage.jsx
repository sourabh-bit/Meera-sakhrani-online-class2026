import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Copy, Check, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";

const API = (process.env.REACT_APP_BACKEND_URL || "") + "/api";

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
      .then((r) => r.json())
      .then(setPaymentInfo)
      .catch(() => {});
  }, []);

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
      const data = await r.json();
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
      const data = await r.json();
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
      <header className="max-w-[1100px] mx-auto px-6 md:px-10 py-6 md:py-8 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          data-testid="checkout-back"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#3b2f33] hover:text-[#7c5a6e] transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <Link
          to="/"
          className="font-serif-display italic text-[20px] md:text-[24px] text-[#2d2326]"
        >
          Meera Sakhrani
        </Link>
        <div className="w-12" />
      </header>

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pb-24">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 md:gap-6">
          {["Details", "Payment", "Confirmed"].map((s, i) => (
            <div key={s} className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors ${
                    step >= i
                      ? "bg-[#7c5a6e] text-[#f5ede7]"
                      : "bg-[#efd9e0] text-[#7c5a6e]"
                  }`}
                >
                  {step > i ? <Check size={13} /> : i + 1}
                </span>
                <span
                  className={`text-[10px] tracking-[0.3em] uppercase font-semibold ${
                    step >= i ? "text-[#3b2f33]" : "text-[#a48b95]"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < 2 && (
                <span
                  className={`h-px w-6 md:w-12 ${
                    step > i ? "bg-[#7c5a6e]" : "bg-[#dcc8be]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <h1 className="mt-12 md:mt-16 text-center font-serif-display text-[40px] md:text-[60px] leading-[1.02] text-[#3b2f33]">
          {step === STEPS.FORM && (
            <>
              Reserve your <span className="italic text-[#7c5a6e]">seat</span>
            </>
          )}
          {step === STEPS.PAY && (
            <>
              Pay by <span className="italic text-[#7c5a6e]">UPI</span>
            </>
          )}
          {step === STEPS.DONE && (
            <>
              You&apos;re <span className="italic text-[#7c5a6e]">in.</span>
            </>
          )}
        </h1>

        <p className="mt-4 text-center text-[15px] md:text-[16px] text-[#5a4750] max-w-xl mx-auto">
          {step === STEPS.FORM &&
            "Tell us a little about you — we'll send your confirmation here."}
          {step === STEPS.PAY &&
            "Scan the QR or use the UPI ID below. Then enter your UTR / reference number."}
          {step === STEPS.DONE &&
            "Thanks — your payment is being verified. You'll hear from us soon."}
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
                  <label className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-semibold">
                    {f.label}
                  </label>
                  <input
                    data-testid={`field-${f.k}`}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    className="mt-2 w-full bg-transparent border-b border-[#3b2f33]/30 focus:border-[#7c5a6e] outline-none py-2.5 font-serif-body text-[18px] md:text-[20px] text-[#3b2f33] placeholder:text-[#a48b95] transition-colors"
                  />
                </div>
              ))}

              <div className="pt-2 flex items-center justify-between text-[14px]">
                <p className="text-[#5a4750]">
                  Booking amount:{" "}
                  <span className="font-serif-display text-[20px] text-[#7c5a6e]">
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
                className="w-full px-8 py-4 rounded-full bg-[#7c5a6e] text-[#f5ede7] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5d4254] transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
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
                <p className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-semibold">
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
                <p className="mt-5 text-[12px] tracking-[0.05em] text-[#5a4750]">
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
                <p className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-semibold">
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
                      className="shrink-0 w-9 h-9 rounded-full border border-[#7c5a6e]/30 flex items-center justify-center text-[#7c5a6e] hover:bg-[#7c5a6e] hover:text-[#f5ede7] hover:border-[#7c5a6e] transition-all"
                    >
                      {copied === "upi" ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  )}
                </div>

                <div className="mt-6 p-4 bg-[#efd9e0]/60 border border-[#e3c3cd] rounded-sm text-[12px] text-[#5a4750] leading-relaxed">
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
                  <label className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-semibold">
                    UTR / Reference No.
                  </label>
                  <input
                    data-testid="utr-input"
                    type="text"
                    required
                    placeholder="e.g. 234567890123"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    className="mt-2 w-full bg-transparent border-b border-[#3b2f33]/30 focus:border-[#7c5a6e] outline-none py-2.5 font-serif-body text-[18px] md:text-[20px] text-[#3b2f33] placeholder:text-[#a48b95] transition-colors"
                  />
                  {err && (
                    <p className="mt-3 text-[13px] text-red-700">{err}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="have-paid-btn"
                    className="mt-6 w-full px-8 py-4 rounded-full bg-[#7c5a6e] text-[#f5ede7] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5d4254] transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
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
              className="max-w-xl mx-auto bg-white/70 border border-[#e3d2c8] rounded-sm p-8 md:p-12 text-center"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-[#efd9e0] flex items-center justify-center">
                <ShieldCheck size={24} className="text-[#7c5a6e]" />
              </div>
              <h3 className="mt-6 font-serif-display text-[26px] md:text-[32px] text-[#3b2f33]">
                Payment submitted
              </h3>
              <p className="mt-3 text-[14.5px] md:text-[15px] text-[#5a4750] leading-relaxed">
                We&apos;ve recorded your UTR. Our team will verify and confirm
                your seat shortly.
              </p>

              <ul className="mt-7 text-left bg-[#f5ede7]/70 border border-[#e3d2c8] rounded-sm p-5 space-y-3">
                <li className="flex justify-between text-[14px]">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-[#7c5a6e] font-semibold pt-1">
                    Reservation
                  </span>
                  <span className="font-serif-body text-[#3b2f33]">
                    {reservation.mpm_id}
                  </span>
                </li>
                <li className="flex justify-between text-[14px]">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-[#7c5a6e] font-semibold pt-1">
                    UTR
                  </span>
                  <span className="font-serif-body text-[#3b2f33] break-all text-right">
                    {reservation.utr}
                  </span>
                </li>
                <li className="flex justify-between text-[14px]">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-[#7c5a6e] font-semibold pt-1">
                    Amount
                  </span>
                  <span className="font-serif-body text-[#3b2f33]">
                    INR {reservation.amount.toLocaleString("en-IN")}
                  </span>
                </li>
              </ul>

              <Link
                to="/"
                data-testid="back-home-btn"
                className="mt-8 inline-flex px-8 py-3.5 rounded-full bg-[#7c5a6e] text-[#f5ede7] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5d4254] transition-all"
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
