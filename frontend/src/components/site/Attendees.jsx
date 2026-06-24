import { Sparkles } from "lucide-react";

const attendees = [
  "Aspiring & professional makeup artists wanting to master Meera's signature glam look.",
  "Artists who've completed basic courses but want to refine luminous, skin-like glam finishes.",
  "Creatives who wish to understand signature artistry, product selection & high-end finishing techniques.",
  "Makeup artists serious about building a signature identity in luxury bridal & editorial glam.",
];

export default function Attendees() {
  return (
    <section
      data-testid="attendees-section"
      className="w-full bg-[#f5ede7] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="h-px w-8 md:w-10 bg-[#c08aa0]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
                Designed For
              </p>
            </div>
            <h2
              data-testid="attendees-title"
              className="mt-5 font-serif-display text-[34px] md:text-[58px] leading-[1.02] text-[#3b2f33]"
            >
              Who should<br />
              <span className="italic text-[#7c5a6e]">attend</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#5a4750] max-w-sm mx-auto lg:mx-0">
              A focused room of artists ready to refine luxury bridal craft
              and own their signature.
            </p>
          </div>

          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {attendees.map((a, i) => (
              <li
                key={i}
                data-testid={`attendee-${i + 1}`}
                className="group relative bg-[#f1e2d8] border border-[#e3d2c8] rounded-sm p-6 transition-all duration-300 hover:border-[#7c5a6e] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(124,90,110,0.35)]"
              >
                <span className="font-serif-display italic text-[24px] md:text-[26px] leading-none text-[#c08aa0]">
                  0{i + 1}
                </span>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-[#3b2f33]">
                  {a}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 md:mt-16 rounded-sm border border-[#e3d2c8] bg-[#f6eee7] px-6 py-6 md:px-8 md:py-7 shadow-[0_18px_42px_-32px_rgba(124,90,110,0.28)]">
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#efe1d6] flex items-center justify-center mx-auto md:mx-0 border border-[#ead7cb]">
              <Sparkles size={28} className="text-[#b88aa4]" />
            </div>
            <div className="min-w-0">
              <p className="font-serif-display italic text-[24px] md:text-[34px] leading-tight text-[#7c5a6e] text-center md:text-left">
                Arrive with an open mind.
              </p>
              <p className="mt-3 text-[14.5px] md:text-[16px] leading-[1.8] text-[#5a4750] text-center md:text-left max-w-4xl">
                Set aside previous techniques and assumptions, and experience
                Meera's signature approach from a fresh perspective. <span className="font-semibold text-[#3b2f33]">If you really want to master this art.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
