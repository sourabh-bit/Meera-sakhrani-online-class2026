import { useState } from "react";
import {
  Clock,
  Hourglass,
  Wallet,
  Wifi,
  Copy,
  Check,
  Landmark,
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

  const copy = (key, val) => {
    navigator.clipboard?.writeText(val).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1400);
    });
  };

  return (
    <section
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

        <div className="mt-14 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* LEFT — At a glance details */}
          <div
            data-testid="details-card"
            className="bg-[#efd9e0] border border-[#e3c3cd] rounded-[2px] p-8 md:p-12"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#7c5a6e]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium">
                At a Glance
              </p>
            </div>
            <h3 className="mt-4 font-serif-display text-[30px] md:text-[40px] leading-[1.05] text-[#3b2f33]">
              The <span className="italic">details</span>
            </h3>

            <ul className="mt-8 md:mt-10 space-y-6">
              {details.map((d) => {
                const Icon = d.icon;
                return (
                  <li key={d.label} className="flex items-start gap-4 md:gap-5">
                    <div className="shrink-0 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-[#f5ede7] rounded-sm">
                      <Icon size={16} className="text-[#7c5a6e]" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#7c5a6e] font-semibold">
                        {d.label}
                      </p>
                      <p className="mt-1 font-serif-body text-[19px] md:text-[22px] text-[#3b2f33] leading-snug">
                        {d.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* divider + payment account info (compact) */}
            <div className="mt-10 pt-8 border-t border-[#e3c3cd]">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#7c5a6e]" />
                <p className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium">
                  Bank Transfer · UPI
                </p>
              </div>
              <ul className="mt-6 space-y-4">
                {payment.map((p) => (
                  <li
                    key={p.label}
                    className="flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-[9.5px] tracking-[0.28em] uppercase text-[#7c5a6e]/85 font-semibold">
                        {p.label}
                      </p>
                      <p className="mt-0.5 font-serif-body text-[15px] md:text-[17px] text-[#3b2f33] break-all leading-snug">
                        {p.value}
                      </p>
                    </div>
                    <button
                      data-testid={`copy-${p.label.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => copy(p.label, p.value)}
                      aria-label={`Copy ${p.label}`}
                      className="shrink-0 w-9 h-9 rounded-full border border-[#7c5a6e]/30 flex items-center justify-center text-[#7c5a6e] hover:bg-[#7c5a6e] hover:text-[#f5ede7] hover:border-[#7c5a6e] transition-all"
                    >
                      {copied === p.label ? (
                        <Check size={13} />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — Booking amount card (reference style) */}
          <div
            data-testid="booking-card"
            className="relative bg-[#f1e2d8] border border-[#e3d2c8] rounded-[2px] p-8 md:p-12 flex flex-col items-center text-center overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(124,90,110,0.12) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          >
            {/* bank icon */}
            <div className="mt-2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#efd9e0] flex items-center justify-center">
              <Landmark size={28} className="text-[#7c5a6e]" />
            </div>

            <p className="mt-7 text-[11px] md:text-[12px] tracking-[0.42em] uppercase text-[#3b2f33]/80 font-medium">
              Booking Amount
            </p>
            <p className="mt-4 font-serif-display text-[48px] md:text-[72px] leading-[0.95] text-[#7c5a6e] tracking-[-0.01em]">
              INR <span className="font-semibold">17,700</span>
            </p>
            <p className="mt-3 font-serif-body italic text-[16px] md:text-[18px] text-[#5a4750]">
              To secure your seat
            </p>

            <div className="mt-8 md:mt-10 w-full max-w-sm h-px bg-[#7c5a6e]/20" />

            <button
              data-testid="pay-securely-btn"
              className="mt-8 md:mt-10 px-10 md:px-14 py-4 md:py-4.5 rounded-full bg-[#7c5a6e] text-[#f5ede7] text-[11px] md:text-[12px] tracking-[0.34em] uppercase font-semibold hover:bg-[#5d4254] transition-all shadow-[0_14px_30px_-14px_rgba(124,90,110,0.55)]"
            >
              Pay Securely
            </button>

            <p className="mt-8 text-[12px] md:text-[13px] tracking-[0.05em] text-[#5a4750]">
              Instant confirmation · Limited seats available
            </p>
            <p className="mt-1 text-[12px] md:text-[13px] tracking-[0.05em] text-[#5a4750]/85">
              Secure your seat with the booking amount
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
