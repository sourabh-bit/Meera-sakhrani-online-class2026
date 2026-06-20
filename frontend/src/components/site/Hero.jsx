import { heroImage } from "../../data/content";

export default function Hero() {
  return (
    <section
      id="masterclass"
      data-testid="hero-section"
      className="w-full bg-[#f5ede7]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-8 md:pt-12 pb-24 md:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT - Headline */}
        <div className="fade-up">
          <p
            data-testid="hero-eyebrow"
            className="text-[11px] tracking-[0.32em] uppercase text-[#8a7480] font-medium"
          >
            Meera Sakhrani School
          </p>

          <h1 className="mt-10">
            <span className="block font-serif-display italic font-normal text-[40px] md:text-[54px] leading-[1.05] text-[#3b2f33]">
              Signature
            </span>
            <span
              data-testid="hero-title-makeup"
              className="block font-serif-display font-bold uppercase text-[64px] md:text-[104px] leading-[0.92] tracking-[-0.01em] text-[#7c5a6e] mt-1"
            >
              Glam Look
            </span>
            <span className="block font-serif-display italic font-normal text-[26px] md:text-[34px] leading-[1.15] text-[#3b2f33] mt-3">
              by Meera Sakhrani
            </span>
          </h1>

          <div className="divider-thin mt-10" />

          <p className="mt-8 font-serif-body italic text-[26px] md:text-[30px] text-[#3b2f33]">
            Online Masterclass · LIVE
          </p>

          <p className="mt-6 text-[16px] md:text-[17px] leading-[1.7] text-[#5a4750] max-w-md">
            A 6-hour intensive live masterclass by Meera Sakhrani — master the
            modern luminous bridal look and luxury artistry on every skin tone.
          </p>

          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <button
              data-testid="hero-pay-now-btn"
              className="px-9 py-4 rounded-full bg-[#7c5a6e] text-[#f5ede7] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5d4254] transition-all shadow-[0_8px_24px_-8px_rgba(124,90,110,0.45)]"
            >
              Pay Now
            </button>
            <button
              data-testid="hero-view-details-btn"
              className="px-9 py-4 rounded-full border border-[#2d2326]/30 text-[#2d2326] text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#2d2326] hover:text-[#f5ede7] transition-all"
            >
              View Details
            </button>
          </div>
        </div>

        {/* RIGHT - Magazine cover */}
        <div className="relative fade-up" style={{ animationDelay: "0.15s" }}>
          <div
            data-testid="hero-magazine"
            className="relative aspect-[3/4] w-full max-w-[540px] mx-auto magazine-shadow rounded-[2px] overflow-hidden bg-[#e7c9d0]"
          >
            <img
              src={heroImage}
              alt="Bridal makeup model"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* subtle bottom gradient for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

            {/* magazine title overlay */}
            <div className="absolute top-7 left-7 right-7 flex items-start justify-between gap-4">
              <div className="font-serif-display">
                <p className="italic text-white/95 text-[18px] md:text-[24px] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                  Signature
                </p>
                <p className="font-bold uppercase text-[#f7c8d3] text-[44px] md:text-[64px] leading-[0.85] tracking-[-0.02em] mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                  Glam Look
                </p>
                <p className="italic text-white text-[15px] md:text-[20px] leading-none mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  by Meera Sakhrani
                </p>
              </div>
              <p className="text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-white font-semibold text-right leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                Meera<br />Sakhrani<br />School
              </p>
            </div>

            {/* bottom overlay text */}
            <div className="absolute bottom-7 left-7 right-24 md:right-32">
              <p className="text-[11px] md:text-[13px] tracking-[0.2em] uppercase text-white font-semibold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                A 6-Hour<br />Live Online Masterclass
              </p>
              <p className="mt-1 font-serif-display italic text-white text-[15px] md:text-[18px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                By Meera Sakhrani
              </p>
            </div>
          </div>

          {/* duration badge */}
          <div
            data-testid="hero-days-badge"
            className="absolute -bottom-3 left-2 md:left-6 bg-[#f5ede7] border border-[#e3d2c8] px-5 py-3 text-center"
          >
            <p className="font-serif-display text-[34px] md:text-[40px] leading-none text-[#7c5a6e] font-semibold">
              6
            </p>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#8a7480] mt-1">
              Hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
