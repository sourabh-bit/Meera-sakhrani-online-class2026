import { useState } from "react";
import { Clock, Hourglass, Wallet, Wifi, Copy, Check } from "lucide-react";

const attendees = [
  "Aspiring & professional makeup artists wanting to master luxury dusky bridal makeup.",
  "Artists who've completed basic courses but still struggle with undertones, shade matching & seamless complexion work on deeper tones.",
  "Creatives who wish to understand luxury bridal artistry, skin prep, product selection & high-end finishing techniques.",
  "Makeup artists serious about building a signature identity while confidently working on every skin tone.",
];

const details = [
  { icon: Clock, label: "Time", value: "12:00 — 06:00 PM IST" },
  { icon: Hourglass, label: "Duration", value: "6 Hours" },
  { icon: Wallet, label: "Fee", value: "INR 17,700 (incl. GST)" },
  { icon: Wifi, label: "Mode", value: "Online · LIVE" },
];

const payment = [
  { label: "Account Number", value: "071405003337" },
  { label: "Account Holder", value: "MEERA SAKHRANI BEAUTY" },
  { label: "IFSC Code", value: "ICIC0000714" },
  { label: "UPI", value: "meerasakhranibeauty.ibz@icici" },
];

export default function Attendees() {
  const [copied, setCopied] = useState(null);

  const copy = (key, val) => {
    navigator.clipboard?.writeText(val).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1400);
    });
  };

  return (
    <section
      data-testid="attendees-section"
      className="w-full bg-[#f5ede7] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#c08aa0]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
                Designed For
              </p>
            </div>
            <h2
              data-testid="attendees-title"
              className="mt-5 font-serif-display text-[40px] md:text-[58px] leading-[1.02] text-[#3b2f33]"
            >
              Who should<br /><span className="italic text-[#7c5a6e]">attend</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-[#5a4750] max-w-sm">
              A focused room of artists ready to refine luxury bridal craft and
              own their signature.
            </p>
          </div>

          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {attendees.map((a, i) => (
              <li
                key={i}
                data-testid={`attendee-${i + 1}`}
                className="group relative bg-[#f1e2d8] border border-[#e3d2c8] rounded-sm p-6 transition-all duration-300 hover:border-[#7c5a6e] hover:-translate-y-0.5"
              >
                <span className="font-serif-display italic text-[26px] leading-none text-[#c08aa0]">
                  0{i + 1}
                </span>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-[#3b2f33]">
                  {a}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Details + Payment — compact two-col card pair */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div
            data-testid="details-card"
            className="lg:col-span-2 bg-[#efd9e0] border border-[#e3c3cd] rounded-sm p-8 md:p-10"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#7c5a6e]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium">
                At a Glance
              </p>
            </div>
            <h3 className="mt-4 font-serif-display text-[28px] md:text-[34px] leading-[1.1] text-[#3b2f33]">
              The <span className="italic">details</span>
            </h3>

            <ul className="mt-8 space-y-5">
              {details.map((d) => {
                const Icon = d.icon;
                return (
                  <li key={d.label} className="flex items-start gap-4">
                    <div className="shrink-0 w-9 h-9 flex items-center justify-center bg-[#f5ede7] rounded-sm">
                      <Icon size={15} className="text-[#7c5a6e]" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.28em] uppercase text-[#7c5a6e] font-semibold">
                        {d.label}
                      </p>
                      <p className="mt-0.5 font-serif-body text-[18px] md:text-[19px] text-[#3b2f33] leading-snug">
                        {d.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            data-testid="payment-card"
            className="lg:col-span-3 bg-[#3b2f33] text-[#f5ede7] rounded-sm p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#7c5a6e]/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-[#c08aa0]/15 blur-3xl" />

            <div className="relative flex items-center gap-3">
              <span className="h-px w-8 bg-[#e2c4ce]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#e2c4ce] font-medium">
                Bank Transfer · UPI
              </p>
            </div>
            <h3 className="relative mt-4 font-serif-display text-[28px] md:text-[34px] leading-[1.1] text-[#f5ede7]">
              Payment <span className="italic text-[#e2c4ce]">details</span>
            </h3>

            <ul className="relative mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {payment.map((p) => (
                <li
                  key={p.label}
                  className="flex items-start justify-between gap-3 pb-4 border-b border-white/10 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="text-[9.5px] tracking-[0.28em] uppercase text-[#e2c4ce]/80">
                      {p.label}
                    </p>
                    <p className="mt-1 font-serif-body text-[15.5px] md:text-[17px] text-[#f5ede7] break-all leading-snug">
                      {p.value}
                    </p>
                  </div>
                  <button
                    data-testid={`copy-${p.label.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => copy(p.label, p.value)}
                    aria-label={`Copy ${p.label}`}
                    className="shrink-0 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#e2c4ce] hover:bg-[#7c5a6e] hover:border-[#7c5a6e] transition-all"
                  >
                    {copied === p.label ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </li>
              ))}
            </ul>

            <button
              data-testid="reserve-seat-btn"
              className="relative mt-9 inline-flex items-center justify-center w-full sm:w-auto px-9 py-3.5 rounded-full bg-[#f5ede7] text-[#3b2f33] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#e2c4ce] transition-all"
            >
              Reserve a Seat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
