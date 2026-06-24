export default function Curriculum() {
  return (
    <section
      id="curriculum-section"
      data-testid="curriculum-section"
      className="w-full bg-[#f5ede7] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="h-px w-10 bg-[#b79d8b]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#b79d8b] font-medium">
                The Curriculum
              </p>
            </div>
            <h2
              data-testid="curriculum-title"
              className="mt-5 font-serif-display text-[32px] sm:text-[40px] md:text-[58px] leading-[1.02] text-[#3b2f33]"
            >
              What you will <span className="italic text-[#6f5c4e]">learn</span>
            </h2>
            <p className="mt-6 text-[15px] leading-[1.7] text-[#5a4750] max-w-sm mx-auto lg:mx-0">
              Two focused chapters - taught on real skin - designed to recreate the signature glam look end to end.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <article
              data-testid="learn-card-base"
              className="group relative bg-[#f1e2d8] border border-[#e3d2c8] rounded-sm p-7 md:p-9 transition-all duration-500 hover:border-[#7a6455] hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="absolute -top-2 -right-3 font-serif-display italic text-[110px] leading-none text-[#e6d6ca] select-none opacity-70">
                01
              </span>
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#b79d8b] font-medium">
                The Luminous Base
              </p>
              <h3 className="mt-3 font-serif-display text-[26px] md:text-[30px] leading-[1.15] text-[#3b2f33] max-w-md">
                Signature Skin
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.7] text-[#5a4750] max-w-md">
                Skin prep, complexion balancing and the luxury luminous base that defines the signature glam - luminous, skin-like, and lit from within.
              </p>
            </article>

            <article
              data-testid="learn-card-glam"
              className="group relative bg-[#eee4d8] border border-[#dfd2c4] rounded-sm p-7 md:p-9 transition-all duration-500 hover:border-[#7a6455] hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="absolute -top-2 -right-3 font-serif-display italic text-[110px] leading-none text-[#d6c1b3] select-none opacity-70">
                02
              </span>
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#6f5c4e] font-medium">
                The Glam Architecture
              </p>
              <h3 className="mt-3 font-serif-display text-[26px] md:text-[30px] leading-[1.15] text-[#3b2f33] max-w-md">
                Sculpt / Eye / Lip / Finish
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.7] text-[#5a4750] max-w-md">
                Sculpting, signature eye work, blush placement, the luxe lip and the editorial finishing that pulls the signature glam together.
              </p>
            </article>
          </div>
        </div>

        <div
          data-testid="founder-quote"
          className="mt-20 md:mt-24 max-w-3xl mx-auto text-center relative"
        >
          <blockquote className="mx-auto font-serif-body text-[20px] md:text-[26px] leading-[1.65] text-[#3b2f33] max-w-2xl">
            "Progress comes from acting fast. Waiting for the right time only delays success. Urgency builds discipline, confidence, and results."
          </blockquote>
          <p className="mt-4 font-serif-display text-[18px] md:text-[22px] text-[#6f5c4e]">
            Decide, act, and let growth follow.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#7a6455]" />
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#6f5c4e] font-medium">
              Masterclass Studio
            </p>
            <div className="h-px w-8 bg-[#7a6455]" />
          </div>
        </div>
      </div>
    </section>
  );
}
