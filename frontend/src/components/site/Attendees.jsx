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
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 md:w-10 bg-[#c08aa0]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
                Designed For
              </p>
            </div>
            <h2
              data-testid="attendees-title"
              className="mt-5 font-serif-display text-[36px] md:text-[58px] leading-[1.02] text-[#3b2f33]"
            >
              Who should<br />
              <span className="italic text-[#7c5a6e]">attend</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#5a4750] max-w-sm">
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
      </div>
    </section>
  );
}
