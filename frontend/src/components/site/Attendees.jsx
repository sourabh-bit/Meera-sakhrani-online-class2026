import { Clock, Hourglass, Wallet, Wifi, Copy, Check } from "lucide-react";
import { useState } from "react";

const attendees = [
  "Aspiring & professional makeup artists wanting to master luxury dusky bridal makeup.",
  "Artists who've completed basic courses but still struggle with undertones, shade matching & seamless complexion work on deeper skin tones.",
  "Creatives who wish to understand luxury bridal artistry, skin preparation, product selection & high-end finishing techniques.",
  "Makeup artists serious about building a signature identity in the luxury bridal industry while confidently working on every skin tone.",
];

const details = [
  { icon: Clock, label: "Time", value: "12:00 PM – 06:00 PM IST" },
  { icon: Hourglass, label: "Duration", value: "6 Hours" },
  { icon: Wallet, label: "Fee", value: "INR 15,000 + 18% GST = INR 17,700" },
  { icon: Wifi, label: "Mode", value: "Online (LIVE)" },
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
      className="w-full bg-[#f5ede7] py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
            Designed For
          </p>
          <h2
            data-testid="attendees-title"
            className="mt-5 font-serif-display text-[42px] md:text-[64px] leading-[1.05] text-[#3b2f33]"
          >
            Who should <span className="italic text-[#7c5a6e]">attend</span>
          </h2>
        </div>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 max-w-5xl mx-auto">
          {attendees.map((a, i) => (
            <li
              key={i}
              data-testid={`attendee-${i + 1}`}
              className="group relative flex items-start gap-5 bg-[#f1e2d8] border border-[#e3d2c8] rounded-sm p-7 md:p-8 transition-all duration-300 hover:border-[#7c5a6e] hover:-translate-y-0.5"
            >
              <span className="font-serif-display italic text-[36px] leading-none text-[#c08aa0] shrink-0">
                0{i + 1}
              </span>
              <p className="text-[15px] md:text-[16px] leading-[1.75] text-[#3b2f33]">
                {a}
              </p>
            </li>
          ))}
        </ul>

        {/* Details grid */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div
            data-testid="details-card"
            className="bg-[#efd9e0] border border-[#e3c3cd] rounded-sm p-9 md:p-12"
          >
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium">
              At a Glance
            </p>
            <h3 className="mt-4 font-serif-display text-[32px] md:text-[40px] leading-[1.1] text-[#3b2f33]">
              The <span className="italic">details</span>
            </h3>
            <ul className="mt-10 space-y-7">
              {details.map((d) => {
                const Icon = d.icon;
                return (
                  <li key={d.label} className="flex items-start gap-5">
                    <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-[#f5ede7] rounded-sm">
                      <Icon size={18} className="text-[#7c5a6e]" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#7c5a6e] font-semibold">
                        {d.label}
                      </p>
                      <p className="mt-1 font-serif-body text-[20px] md:text-[22px] text-[#3b2f33] leading-snug">
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
            className="bg-[#3b2f33] text-[#f5ede7] rounded-sm p-9 md:p-12 relative overflow-hidden"
          >
            {/* subtle accent */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#7c5a6e]/30 blur-3xl" />
            <p className="relative text-[11px] tracking-[0.32em] uppercase text-[#e2c4ce] font-medium">
              Bank Transfer
            </p>
            <h3 className="relative mt-4 font-serif-display text-[32px] md:text-[40px] leading-[1.1] text-[#f5ede7]">
              Payment <span className="italic text-[#e2c4ce]">details</span>
            </h3>

            <ul className="relative mt-10 space-y-6">
              {payment.map((p) => (
                <li
                  key={p.label}
                  className="flex items-start justify-between gap-4 pb-5 border-b border-white/10 last:border-b-0"
                >
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#e2c4ce]/80">
                      {p.label}
                    </p>
                    <p className="mt-1 font-serif-body text-[18px] md:text-[20px] text-[#f5ede7] break-all">
                      {p.value}
                    </p>
                  </div>
                  <button
                    data-testid={`copy-${p.label.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => copy(p.label, p.value)}
                    aria-label={`Copy ${p.label}`}
                    className="shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#e2c4ce] hover:bg-[#7c5a6e] hover:border-[#7c5a6e] transition-all"
                  >
                    {copied === p.label ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <button
              data-testid="reserve-seat-btn"
              className="relative mt-10 w-full px-7 py-4 rounded-full bg-[#f5ede7] text-[#3b2f33] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#e2c4ce] transition-all"
            >
              Reserve a Seat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
