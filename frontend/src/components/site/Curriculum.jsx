export default function Curriculum() {
  return (
    <section
      data-testid="curriculum-section"
      className="w-full bg-[#f5ede7] py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
            The Curriculum
          </p>
          <h2
            data-testid="curriculum-title"
            className="mt-5 font-serif-display text-[42px] md:text-[64px] leading-[1.05] text-[#3b2f33]"
          >
            What you will <span className="italic text-[#7c5a6e]">learn</span>
          </h2>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <article
            data-testid="learn-card-bridal"
            className="group relative bg-[#f1e2d8] border border-[#e3d2c8] rounded-sm p-9 md:p-12 transition-transform duration-500 hover:-translate-y-1"
          >
            <span className="absolute top-9 right-9 font-serif-display italic text-[80px] md:text-[120px] leading-none text-[#e2c4ce] select-none">
              01
            </span>
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
              Signature Bridal
            </p>
            <h3 className="mt-4 font-serif-display text-[28px] md:text-[34px] leading-[1.15] text-[#3b2f33] max-w-sm">
              The Modern Luminous Bridal Look
            </h3>
            <div className="divider-thin mt-6" />
            <p className="mt-6 text-[15px] md:text-[16px] leading-[1.75] text-[#5a4750] max-w-md">
              A modern, luminous bridal style perfected through flawless skin
              work, refined detailing, and luxury finishing techniques —
              taught step by step on real skin.
            </p>
          </article>

          <article
            data-testid="learn-card-dusky"
            className="group relative bg-[#efd9e0] border border-[#e3c3cd] rounded-sm p-9 md:p-12 transition-transform duration-500 hover:-translate-y-1"
          >
            <span className="absolute top-9 right-9 font-serif-display italic text-[80px] md:text-[120px] leading-none text-[#d5a5b5] select-none">
              02
            </span>
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium">
              Mastering Dusky Skin
            </p>
            <h3 className="mt-4 font-serif-display text-[28px] md:text-[34px] leading-[1.15] text-[#3b2f33] max-w-sm">
              Radiant Finishes on Deeper Tones
            </h3>
            <div className="divider-thin mt-6" />
            <p className="mt-6 text-[15px] md:text-[16px] leading-[1.75] text-[#5a4750] max-w-md">
              Understand undertones, complexion balancing, seamless base
              creation, and skin-like finishes designed specifically for deeper
              skin tones.
            </p>
          </article>
        </div>

        {/* Founder quote */}
        <div
          data-testid="founder-quote"
          className="mt-20 md:mt-24 max-w-3xl mx-auto text-center"
        >
          <p className="text-[10px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
            The Meera Sakhrani School
          </p>
          <blockquote className="mt-6 font-serif-display italic text-[26px] md:text-[34px] leading-[1.35] text-[#3b2f33]">
            “Every breakthrough in my journey came from acting fast. Waiting
            for the &lsquo;right time&rsquo; only delays success. Urgency
            builds discipline, confidence, and results. Decide, act, and let
            growth follow.”
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-[#7c5a6e]" />
            <p className="font-serif-body text-[18px] md:text-[20px] text-[#7c5a6e] italic">
              Meera Sakhrani
            </p>
            <div className="h-px w-10 bg-[#7c5a6e]" />
          </div>
        </div>
      </div>
    </section>
  );
}
