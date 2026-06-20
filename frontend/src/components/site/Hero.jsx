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
            <span className="block font-serif-display italic font-normal text-[44px] md:text-[60px] leading-[1.05] text-[#3b2f33]">
              The Future of
            </span>
            <span
              data-testid="hero-title-makeup"
              className="block font-serif-display font-bold uppercase text-[76px] md:text-[120px] leading-[0.95] tracking-[-0.01em] text-[#7c5a6e] mt-2"
            >
              Makeup
            </span>
          </h1>

          <div className="divider-thin mt-10" />

          <p className="mt-8 font-serif-body italic text-[26px] md:text-[30px] text-[#3b2f33]">
            Offline Masterclass
          </p>

          <p className="mt-6 text-[16px] md:text-[17px] leading-[1.7] text-[#5a4750] max-w-md">
            An annual 7-day intensive masterclass by Meera Sakhrani. Transform
            your artistry and elevate your career in the world of bridal makeup.
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
                <p className="italic text-white/95 text-[20px] md:text-[26px] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                  The Future of
                </p>
                <p className="font-bold uppercase text-[#f7c8d3] text-[56px] md:text-[78px] leading-[0.85] tracking-[-0.02em] mt-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
                  Makeup
                </p>
              </div>
              <p className="text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-white font-semibold text-right leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
                Meera<br />Sakhrani<br />School
              </p>
            </div>

            {/* bottom overlay text */}
            <div className="absolute bottom-7 left-7 right-24 md:right-32">
              <p className="text-[11px] md:text-[13px] tracking-[0.2em] uppercase text-white font-semibold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                An Annual 7-Days<br />Offline Masterclass
              </p>
              <p className="mt-1 font-serif-display italic text-white text-[15px] md:text-[18px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                By Meera Sakhrani
              </p>
            </div>
          </div>

          {/* 7 days badge */}
          <div
            data-testid="hero-days-badge"
            className="absolute -bottom-3 left-2 md:left-6 bg-[#f5ede7] border border-[#e3d2c8] px-5 py-3 text-center"
          >
            <p className="font-serif-display text-[34px] md:text-[40px] leading-none text-[#7c5a6e] font-semibold">
              7
            </p>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#8a7480] mt-1">
              Days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
