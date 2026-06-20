import { Award, ListChecks, BadgeCheck } from "lucide-react";

const takeaways = [
  { icon: Award, label: "Certificate", note: "Official course completion" },
  { icon: ListChecks, label: "Product List", note: "Curated by Meera" },
  { icon: BadgeCheck, label: "Success Checklist", note: "Personal blueprint" },
];

const flow = [
  {
    time: "12:00 — 3:00 PM",
    chapter: "Chapter I",
    title: "Meera's Signature Glam Look",
    body: "A live, step-by-step demonstration of the full signature glam — skin prep, luminous base, sculpting, eye, blush and lip artistry on real skin.",
  },
  {
    time: "3:30 — 4:30 PM",
    chapter: "Chapter II",
    title: "Finishing & Editorial Capture",
    body: "Lock-in & set the look, refine the finishing details, plus photography lighting and editing tips to showcase your signature glam like a pro.",
  },
  {
    time: "4:30 — 6:00 PM",
    chapter: "Chapter III",
    title: "Q & A with Meera",
    body: "An intimate, open session — ask anything on technique, products, business, or building your signature in the luxury glam industry.",
  },
];

export default function Masterclass() {
  return (
    <section
      data-testid="masterclass-section"
      className="w-full bg-[#efe2da] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-14 items-end text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="h-px w-8 md:w-10 bg-[#c08aa0]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
                Take Home
              </p>
            </div>
            <h3
              data-testid="takeaways-title"
              className="mt-4 font-serif-display text-[32px] md:text-[48px] leading-[1.02] text-[#3b2f33]"
            >
              Take<span className="italic text-[#7c5a6e]">aways</span>
            </h3>
          </div>
          <p className="text-[14.5px] leading-[1.7] text-[#5a4750] max-w-md mx-auto md:mx-0 md:justify-self-end md:text-right">
            Three tangible assets you carry into every booking after the
            masterclass.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {takeaways.map((t, i) => {
            const Icon = t.icon;
            return (
              <li
                key={t.label}
                data-testid={`takeaway-${i + 1}`}
                className="group relative bg-[#f5ede7] border border-[#e3d2c8] rounded-sm p-5 md:p-6 transition-all duration-300 hover:border-[#7c5a6e] hover:-translate-y-0.5 flex items-center gap-4 md:gap-5"
              >
                <span className="font-serif-display italic text-[24px] md:text-[28px] leading-none text-[#c08aa0] w-7">
                  0{i + 1}
                </span>
                <span className="w-px h-9 md:h-10 bg-[#e3d2c8]" />
                <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#f1dde3] rounded-sm">
                  <Icon size={16} className="text-[#7c5a6e]" />
                </div>
                <div className="min-w-0">
                  <p className="font-serif-display text-[17px] md:text-[19px] text-[#3b2f33] leading-tight">
                    {t.label}
                  </p>
                  <p className="text-[9.5px] md:text-[10px] tracking-[0.22em] uppercase text-[#8a7480] mt-0.5">
                    {t.note}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Flow — zigzag */}
        <div className="mt-20 md:mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="h-px w-8 md:w-10 bg-[#c08aa0]" />
                <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
                  The Schedule
                </p>
              </div>
              <h3
                data-testid="flow-title"
                className="mt-4 font-serif-display text-[32px] md:text-[48px] leading-[1.02] text-[#3b2f33]"
              >
                Masterclass <span className="italic text-[#7c5a6e]">flow</span>
              </h3>
            </div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium">
              12:00 PM — 06:00 PM IST
            </p>
          </div>

          <div className="mt-14 relative">
            {/* center rail — desktop only */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#d6c0b4] -translate-x-1/2" />
            {/* mobile rail */}
            <div className="md:hidden absolute left-[18px] top-3 bottom-3 w-px bg-[#d6c0b4]" />

            <ol className="space-y-8 md:space-y-14">
              {flow.map((f, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <li
                    key={f.time}
                    data-testid={`flow-${i + 1}`}
                    className="relative pl-11 md:pl-0"
                  >
                    {/* mobile marker */}
                    <span className="md:hidden absolute left-[10px] top-5 w-4 h-4 rounded-full bg-[#7c5a6e] ring-[6px] ring-[#efe2da]" />

                    <div
                      className={`md:grid md:grid-cols-2 md:gap-12 lg:gap-20 items-start`}
                    >
                      <div
                        className={`relative ${
                          isLeft ? "md:pr-10 lg:pr-16" : "md:col-start-2 md:pl-10 lg:pl-16"
                        }`}
                      >
                        {/* desktop marker */}
                        <span
                          className={`hidden md:block absolute top-7 w-3.5 h-3.5 rounded-full bg-[#7c5a6e] ring-[6px] ring-[#efe2da] ${
                            isLeft ? "-right-[28px] lg:-right-[34px]" : "-left-[28px] lg:-left-[34px]"
                          }`}
                        />

                        <article className="bg-[#f5ede7] border border-[#e3d2c8] rounded-sm px-6 py-6 md:px-8 md:py-7 transition-all duration-300 hover:border-[#7c5a6e] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(124,90,110,0.4)]">
                          <div className="flex items-baseline justify-between gap-4 flex-wrap">
                            <p className="font-serif-display italic text-[15px] md:text-[17px] text-[#c08aa0]">
                              {f.chapter}
                            </p>
                            <p className="text-[10px] tracking-[0.3em] uppercase text-[#7c5a6e] font-semibold">
                              {f.time}
                            </p>
                          </div>
                          <h4 className="mt-2.5 font-serif-display text-[22px] md:text-[26px] leading-[1.18] text-[#3b2f33]">
                            {f.title}
                          </h4>
                          <p className="mt-3 text-[14.5px] leading-[1.75] text-[#5a4750]">
                            {f.body}
                          </p>
                        </article>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
