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
    title: "Meera's Signature Bridal Look",
    body: "Meera's luxury bridal artistry — flawless skin prep, seamless complexion work, and her modern luminous signature finish.",
  },
  {
    time: "3:30 — 4:30 PM",
    chapter: "Chapter II",
    title: "Mastering Dusky Bridal Skin",
    body: "Undertones, shade matching, complexion balancing, and luxury techniques for radiant skin-like finishes on deeper tones — plus photography & editing tips.",
  },
  {
    time: "4:30 — 6:00 PM",
    chapter: "Chapter III",
    title: "Q & A with Meera",
    body: "An intimate, open session — ask anything on technique, business, or building your signature in luxury bridal.",
  },
];

export default function Masterclass() {
  return (
    <section
      data-testid="masterclass-section"
      className="w-full bg-[#efe2da] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Takeaways — single tight row */}
        <div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#c08aa0]" />
                <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
                  Take Home
                </p>
              </div>
              <h3
                data-testid="takeaways-title"
                className="mt-4 font-serif-display text-[36px] md:text-[48px] leading-[1.05] text-[#3b2f33]"
              >
                Take<span className="italic text-[#7c5a6e]">aways</span>
              </h3>
            </div>
            <p className="text-[14px] text-[#5a4750] max-w-sm">
              Three tangible assets carried into every booking after the
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
                  className="group relative bg-[#f5ede7] border border-[#e3d2c8] rounded-sm p-6 transition-all duration-300 hover:border-[#7c5a6e] hover:-translate-y-0.5 flex items-center gap-5"
                >
                  <span className="font-serif-display italic text-[28px] leading-none text-[#c08aa0] w-7">
                    0{i + 1}
                  </span>
                  <span className="w-px h-10 bg-[#e3d2c8]" />
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-[#f1dde3] rounded-sm">
                    <Icon size={16} className="text-[#7c5a6e]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif-display text-[18px] text-[#3b2f33] leading-tight">
                      {t.label}
                    </p>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a7480] mt-0.5">
                      {t.note}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Flow — single-rail vertical timeline */}
        <div className="mt-20 md:mt-24">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#c08aa0]" />
                <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
                  The Schedule
                </p>
              </div>
              <h3
                data-testid="flow-title"
                className="mt-4 font-serif-display text-[36px] md:text-[48px] leading-[1.05] text-[#3b2f33]"
              >
                Masterclass <span className="italic text-[#7c5a6e]">flow</span>
              </h3>
            </div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium">
              12:00 PM — 06:00 PM IST
            </p>
          </div>

          <div className="mt-12 relative max-w-3xl mx-auto md:mx-0">
            {/* vertical rail */}
            <div className="absolute left-[18px] md:left-[26px] top-3 bottom-3 w-px bg-[#d6c0b4]" />
            <ol className="space-y-5">
              {flow.map((f, i) => (
                <li
                  key={f.time}
                  data-testid={`flow-${i + 1}`}
                  className="relative pl-12 md:pl-16 group"
                >
                  {/* marker */}
                  <span className="absolute left-[10px] md:left-[18px] top-5 w-4 h-4 rounded-full bg-[#7c5a6e] ring-[6px] ring-[#efe2da]" />
                  <div className="bg-[#f5ede7] border border-[#e3d2c8] rounded-sm px-7 py-6 transition-all duration-300 hover:border-[#7c5a6e] hover:-translate-y-0.5">
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <p className="font-serif-display italic text-[16px] text-[#c08aa0]">
                        {f.chapter}
                      </p>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#7c5a6e] font-semibold">
                        {f.time}
                      </p>
                    </div>
                    <h4 className="mt-2 font-serif-display text-[22px] md:text-[26px] leading-[1.2] text-[#3b2f33]">
                      {f.title}
                    </h4>
                    <p className="mt-3 text-[14.5px] leading-[1.7] text-[#5a4750]">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
