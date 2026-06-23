import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Hourglass,
  Wallet,
  Wifi,
  Copy,
  Check,
  Landmark,
  ChevronDown,
} from "lucide-react";

const details = [
  { icon: Clock, label: "Time", value: "12:00 — 06:00 PM IST" },
  { icon: Hourglass, label: "Duration", value: "6 Hours" },
  { icon: Wallet, label: "Fee", value: "INR 15,000 + 18% GST" },
  { icon: Wifi, label: "Mode", value: "Online · LIVE" },
];

const payment = [
  { label: "Account Number", value: "Provided in backend" },
  { label: "Account Holder", value: "Studio Account" },
  { label: "IFSC Code", value: "Configured in backend" },
  { label: "UPI", value: "Configured in backend" },
];

export default function Booking() {
  const [copied, setCopied] = useState(null);
  const [openBank, setOpenBank] = useState(false);
  const navigate = useNavigate();

  const copy = (key, val) => {
    navigator.clipboard?.writeText(val).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1400);
    });
  };

  return (
    <section
      id="booking-section"
      data-testid="booking-section"
      className="w-full bg-[#f5ede7] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 md:w-10 bg-[#b79d8b]" />
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#b79d8b] font-medium">
              Secure Your Seat
            </p>
            <span className="h-px w-8 md:w-10 bg-[#b79d8b]" />
          </div>
          <h2
            data-testid="booking-title"
            className="mt-5 font-serif-display text-[36px] md:text-[56px] leading-[1.02] text-[#3b2f33]"
          >
            Reserve your <span className="italic text-[#7a6455]">place</span>
          </h2>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[#5a4750]">
            A limited, intimate cohort. The fee covers the full live session,
            certificate, product list & success checklist.
          </p>
        </div>

        <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          <div
            data-testid="details-card"
            className="bg-[#eee4d8] border border-[#dfd2c4] rounded-sm p-7 md:p-9 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#7a6455]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#7a6455] font-medium">
                At a Glance
              </p>
            </div>
            <h3 className="mt-4 font-serif-display text-[28px] md:text-[34px] leading-[1.05] text-[#3b2f33]">
              The <span className="italic">details</span>
            </h3>

            <ul className="mt-7 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 flex-1">
              {details.map((d) => {
                const Icon = d.icon;
                return (
                  <li key={d.label} className="flex items-start gap-3.5">
                    <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#f5ede7] rounded-sm">
                      <Icon size={15} className="text-[#7a6455]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9.5px] tracking-[0.28em] uppercase text-[#7a6455] font-semibold">
                        {d.label}
                      </p>
                      <p className="mt-1 font-serif-body text-[17px] md:text-[19px] text-[#3b2f33] leading-snug">
                        {d.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            data-testid="booking-card"
            className="relative bg-[#f1e2d8] border border-[#e3d2c8] rounded-sm p-7 md:p-9 flex flex-col items-center text-center overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(124,90,110,0.12) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#eee4d8] flex items-center justify-center">
              <Landmark size={20} className="text-[#7a6455]" />
            </div>

            <p className="mt-4 text-[10px] md:text-[11px] tracking-[0.36em] uppercase text-[#3b2f33]/80 font-medium">
              Booking Amount
            </p>
            <p className="mt-2.5 font-serif-display text-[36px] md:text-[44px] leading-[0.95] text-[#7a6455] tracking-[-0.01em]">
              INR <span className="font-semibold">17,700</span>
            </p>
            <p className="mt-1.5 font-serif-body italic text-[14px] md:text-[15px] text-[#5a4750]">
              To secure your seat
            </p>

            <button
              data-testid="pay-securely-btn"
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full max-w-xs px-8 py-3.5 rounded-full bg-[#7a6455] text-[#f5ede7] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5b4a40] transition-all shadow-[0_12px_28px_-14px_rgba(124,90,110,0.55)]"
            >
              Pay Securely
            </button>

            <p className="mt-4 text-[11px] md:text-[12px] tracking-[0.04em] text-[#5a4750] font-sans not-italic">
              Instant confirmation · Limited seats
            </p>

            <button
              data-testid="toggle-bank-details"
              onClick={() => setOpenBank((o) => !o)}
              className="mt-5 w-full flex items-center justify-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-[#7a6455] font-semibold hover:text-[#5b4a40] transition-colors"
            >
              {openBank ? "Hide payment details" : "Show payment details"}
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${
                  openBank ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`w-full overflow-hidden transition-[max-height,opacity] duration-400 ${
                openBank ? "max-h-[420px] opacity-100 mt-5" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-3 text-left bg-[#f5ede7] border border-[#e3d2c8] rounded-sm p-4">
                {payment.map((p) => (
                  <li key={p.label} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[9px] tracking-[0.26em] uppercase text-[#7a6455]/85 font-semibold">
                        {p.label}
                      </p>
                      <p className="mt-0.5 font-serif-body text-[14px] md:text-[15px] text-[#3b2f33] break-all leading-snug">
                        {p.value}
                      </p>
                    </div>
                    <button
                      data-testid={`copy-${p.label.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => copy(p.label, p.value)}
                      aria-label={`Copy ${p.label}`}
                      className="shrink-0 w-8 h-8 rounded-full border border-[#7a6455]/30 flex items-center justify-center text-[#7a6455] hover:bg-[#7a6455] hover:text-[#f5ede7] hover:border-[#7a6455] transition-all"
                    >
                      {copied === p.label ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
