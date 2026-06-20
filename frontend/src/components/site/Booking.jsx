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
  { label: "Account Number", value: "071405003337" },
  { label: "Account Holder", value: "MEERA SAKHRANI BEAUTY" },
  { label: "IFSC Code", value: "ICIC0000714" },
  { label: "UPI", value: "meerasakhranibeauty.ibz@icici" },
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
            <span className="h-px w-8 md:w-10 bg-[#c08aa0]" />
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
              Secure Your Seat
            </p>
            <span className="h-px w-8 md:w-10 bg-[#c08aa0]" />
          </div>
          <h2
            data-testid="booking-title"
            className="mt-5 font-serif-display text-[36px] md:text-[56px] leading-[1.02] text-[#3b2f33]"
          >
            Reserve your <span className="italic text-[#7c5a6e]">place</span>
          </h2>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[#5a4750]">
            A limited, intimate cohort. The fee covers the full live session,
            certificate, product list & success checklist.
          </p>
        </div>

        <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          {/* LEFT — At a glance details */}
          <div
            data-testid="details-card"
            className="bg-[#efd9e0] border border-[#e3c3cd] rounded-sm p-7 md:p-9 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#7c5a6e]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium">
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
                      <Icon size={15} className="text-[#7c5a6e]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9.5px] tracking-[0.28em] uppercase text-[#7c5a6e] font-semibold">
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

          {/* RIGHT — Compact booking card */}
          <div
            data-testid="booking-card"
            className="relative bg-[#f1e2d8] border border-[#e3d2c8] rounded-sm p-7 md:p-9 flex flex-col items-center text-center overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(124,90,110,0.12) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#efd9e0] flex items-center justify-center">
              <Landmark size={20} className="text-[#7c5a6e]" />
            </div>

            <p className="mt-4 text-[10px] md:text-[11px] tracking-[0.36em] uppercase text-[#3b2f33]/80 font-medium">
              Booking Amount
            </p>
            <p className="mt-2.5 font-serif-display text-[36px] md:text-[44px] leading-[0.95] text-[#7c5a6e] tracking-[-0.01em]">
              INR <span className="font-semibold">17,700</span>
            </p>
            <p className="mt-1.5 font-serif-body italic text-[14px] md:text-[15px] text-[#5a4750]">
              To secure your seat
            </p>

            <button
              data-testid="pay-securely-btn"
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full max-w-xs px-8 py-3.5 rounded-full bg-[#7c5a6e] text-[#f5ede7] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5d4254] transition-all shadow-[0_12px_28px_-14px_rgba(124,90,110,0.55)]"
            >
              Pay Securely
            </button>

            <p className="mt-4 text-[11px] md:text-[12px] tracking-[0.04em] text-[#5a4750]">
              Instant confirmation · Limited seats
            </p>

            {/* collapsible bank details */}
            <button
              data-testid="toggle-bank-details"
              onClick={() => setOpenBank((o) => !o)}
              className="mt-5 w-full flex items-center justify-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-[#7c5a6e] font-semibold hover:text-[#5d4254] transition-colors"
            >
              {openBank ? "Hide bank details" : "Show bank · UPI details"}
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
                  <li
                    key={p.label}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[9px] tracking-[0.26em] uppercase text-[#7c5a6e]/85 font-semibold">
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
                      className="shrink-0 w-8 h-8 rounded-full border border-[#7c5a6e]/30 flex items-center justify-center text-[#7c5a6e] hover:bg-[#7c5a6e] hover:text-[#f5ede7] hover:border-[#7c5a6e] transition-all"
                    >
                      {copied === p.label ? (
                        <Check size={12} />
                      ) : (
                        <Copy size={12} />
                      )}
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
