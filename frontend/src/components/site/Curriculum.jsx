export default function Curriculum() {
  return (
    <section
      data-testid="curriculum-section"
      className="w-full bg-[#f5ede7] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* sticky-feeling header */}
          <div className="lg:col-span-5 lg:sticky lg:top-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#c08aa0]" />
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
                The Curriculum
              </p>
            </div>
            <h2
              data-testid="curriculum-title"
              className="mt-5 font-serif-display text-[40px] md:text-[58px] leading-[1.02] text-[#3b2f33]"
            >
              What you<br />will <span className="italic text-[#7c5a6e]">learn</span>
            </h2>
            <p className="mt-6 text-[15px] leading-[1.7] text-[#5a4750] max-w-sm">
              Two focused chapters · designed to refine technique and master
              skin on every undertone.
            </p>
          </div>

          {/* right - two stacked compact cards */}
          <div className="lg:col-span-7 space-y-5">
            <article
              data-testid="learn-card-bridal"
              className="group relative bg-[#f1e2d8] border border-[#e3d2c8] rounded-sm p-7 md:p-9 transition-all duration-500 hover:border-[#7c5a6e] hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="absolute -top-2 -right-3 font-serif-display italic text-[110px] leading-none text-[#e2c4ce] select-none opacity-70">
                01
              </span>
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
                Signature Bridal
              </p>
              <h3 className="mt-3 font-serif-display text-[26px] md:text-[30px] leading-[1.15] text-[#3b2f33] max-w-md">
                The Modern Luminous Bridal Look
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.7] text-[#5a4750] max-w-md">
                A modern, luminous bridal style perfected through flawless
                skin work, refined detailing, and luxury finishing —
                taught step by step on real skin.
              </p>
            </article>

            <article
              data-testid="learn-card-dusky"
              className="group relative bg-[#efd9e0] border border-[#e3c3cd] rounded-sm p-7 md:p-9 transition-all duration-500 hover:border-[#7c5a6e] hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="absolute -top-2 -right-3 font-serif-display italic text-[110px] leading-none text-[#d5a5b5] select-none opacity-70">
                02
              </span>
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium">
                Mastering Dusky Skin
              </p>
              <h3 className="mt-3 font-serif-display text-[26px] md:text-[30px] leading-[1.15] text-[#3b2f33] max-w-md">
                Radiant Finishes on Deeper Tones
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.7] text-[#5a4750] max-w-md">
                Understand undertones, complexion balancing, seamless base
                creation, and skin-like finishes designed for deeper skin
                tones.
              </p>
            </article>
          </div>
        </div>

        {/* Founder quote — slim, refined */}
        <div
          data-testid="founder-quote"
          className="mt-20 md:mt-24 max-w-3xl mx-auto text-center relative"
        >
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-serif-display text-[80px] leading-none text-[#c08aa0]/50 select-none">
            “
          </span>
          <blockquote className="font-serif-display italic text-[22px] md:text-[28px] leading-[1.45] text-[#3b2f33]">
            Every breakthrough in my journey came from acting fast. Waiting
            for the &lsquo;right time&rsquo; only delays success. Urgency
            builds discipline, confidence, and results.
          </blockquote>
          <p className="mt-3 font-serif-display italic text-[22px] md:text-[28px] text-[#7c5a6e]">
            Decide, act, and let growth follow.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#7c5a6e]" />
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#7c5a6e] font-medium">
              Meera Sakhrani
            </p>
            <div className="h-px w-8 bg-[#7c5a6e]" />
          </div>
        </div>
      </div>
    </section>
  );
}
