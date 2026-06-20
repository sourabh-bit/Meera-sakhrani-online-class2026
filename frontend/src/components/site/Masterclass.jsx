import { Award, ListChecks, BadgeCheck, MessageCircle } from "lucide-react";

const takeaways = [
  { icon: Award, label: "Certificate", note: "Official course completion" },
  { icon: ListChecks, label: "Product List", note: "Curated by Meera" },
  { icon: BadgeCheck, label: "Success Checklist", note: "Personal blueprint" },
];

const flow = [
  {
    time: "12:00 PM – 3:00 PM",
    title: "Meera's High-Demand Signature Bridal Look",
    body: "Learn Meera's luxury bridal artistry — from flawless skin prep and seamless complexion work to her modern, luminous signature bridal finish.",
  },
  {
    time: "3:30 PM – 4:30 PM",
    title: "Mastering Dusky Bridal Skin",
    body: "Understand undertones, shade matching, complexion balancing, and luxury skin techniques to create radiant, skin-like finishes on deeper skin tones. Plus photography and editing tips to showcase your work like a pro.",
  },
  {
    time: "4:30 PM – 6:00 PM",
    title: "Q & A with Meera",
    icon: MessageCircle,
    body: "An intimate, open session — ask anything about technique, business, or building your signature in the luxury bridal industry.",
  },
];

export default function Masterclass() {
  return (
    <section
      data-testid="masterclass-section"
      className="w-full bg-[#efe2da] py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Takeaways */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
              Take Home
            </p>
            <h3
              data-testid="takeaways-title"
              className="mt-4 font-serif-display text-[38px] md:text-[52px] leading-[1.05] text-[#3b2f33]"
            >
              Take<span className="italic text-[#7c5a6e]">aways</span>
            </h3>
            <p className="mt-4 text-[15px] text-[#5a4750] leading-relaxed max-w-xs">
              Three tangible assets you carry into every booking after the
              masterclass.
            </p>
          </div>

          <ol className="space-y-4">
            {takeaways.map((t, i) => {
              const Icon = t.icon;
              return (
                <li
                  key={t.label}
                  data-testid={`takeaway-${i + 1}`}
                  className="group flex items-center gap-6 bg-[#f5ede7] border border-[#e3d2c8] rounded-sm px-7 py-6 transition-all duration-300 hover:border-[#7c5a6e] hover:-translate-y-0.5"
                >
                  <span className="font-serif-display italic text-[40px] leading-none text-[#c08aa0]">
                    0{i + 1}
                  </span>
                  <span className="w-px h-12 bg-[#e3d2c8]" />
                  <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-[#f1dde3] rounded-sm">
                    <Icon size={18} className="text-[#7c5a6e]" />
                  </div>
                  <div>
                    <p className="font-serif-display text-[22px] text-[#3b2f33] leading-tight">
                      {t.label}
                    </p>
                    <p className="text-[12px] tracking-[0.18em] uppercase text-[#8a7480] mt-0.5">
                      {t.note}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Masterclass Flow */}
        <div className="mt-24 md:mt-32">
          <div className="text-center">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
              The Schedule
            </p>
            <h3
              data-testid="flow-title"
              className="mt-4 font-serif-display text-[42px] md:text-[60px] leading-[1.05] text-[#3b2f33]"
            >
              Masterclass <span className="italic text-[#7c5a6e]">flow</span>
            </h3>
          </div>

          <div className="mt-14 relative">
            {/* vertical line */}
            <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-[#d6c0b4] -translate-x-1/2" />

            <div className="space-y-10 md:space-y-16">
              {flow.map((f, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={f.time}
                    data-testid={`flow-${i + 1}`}
                    className={`md:grid md:grid-cols-2 md:gap-16 items-start ${
                      isLeft ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div
                      className={`relative bg-[#f5ede7] border border-[#e3d2c8] rounded-sm p-7 md:p-9 transition-all duration-500 hover:border-[#7c5a6e] hover:-translate-y-0.5 ${
                        isLeft ? "md:mr-6" : "md:ml-6"
                      }`}
                    >
                      {/* marker dot */}
                      <div
                        className={`hidden md:block absolute top-9 w-3 h-3 rounded-full bg-[#7c5a6e] ring-4 ring-[#efe2da] ${
                          isLeft ? "-right-[34px]" : "-left-[34px]"
                        }`}
                      />
                      <p className="text-[11px] tracking-[0.3em] uppercase text-[#7c5a6e] font-semibold">
                        {f.time}
                      </p>
                      <h4 className="mt-3 font-serif-display text-[24px] md:text-[28px] leading-[1.2] text-[#3b2f33]">
                        {f.title}
                      </h4>
                      <p className="mt-4 text-[15px] leading-[1.75] text-[#5a4750]">
                        {f.body}
                      </p>
                    </div>
                    <div />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
