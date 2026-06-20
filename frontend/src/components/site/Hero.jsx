import { heroImage } from "../../data/content";

export default function Hero() {
  return (
    <section
      id="masterclass"
      data-testid="hero-section"
      className="w-full bg-[#f5ede7] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14 pt-6 md:pt-10 pb-20 md:pb-28">
        {/* On mobile: image FIRST then text. On desktop: text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-14 lg:gap-24 items-center">
          {/* IMAGE — appears first on mobile via order */}
          <div
            className="relative fade-up order-1 lg:order-2 w-full"
            style={{ animationDelay: "0.05s" }}
          >
            <div
              data-testid="hero-magazine"
              className="relative aspect-[3/4] w-full max-w-[480px] mx-auto magazine-shadow rounded-[2px] overflow-hidden bg-[#e7c9d0]"
            >
              <img
                src={heroImage}
                alt="Signature glam look by Meera Sakhrani"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

              <div className="absolute top-6 left-6 right-6 flex items-start justify-between gap-4">
                <div className="font-serif-display">
                  <p className="italic text-white/95 text-[16px] md:text-[22px] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                    Signature
                  </p>
                  <p className="font-bold uppercase text-[#f7c8d3] text-[40px] md:text-[58px] leading-[0.85] tracking-[-0.02em] mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                    Glam Look
                  </p>
                  <p className="italic text-white text-[13px] md:text-[17px] leading-none mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    by Meera Sakhrani
                  </p>
                </div>
                <p className="text-[8px] md:text-[10px] tracking-[0.28em] uppercase text-white font-semibold text-right leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
                  Meera<br />Sakhrani<br />School
                </p>
              </div>

              <div className="absolute bottom-6 left-6 right-20 md:right-28">
                <p className="text-[10px] md:text-[12px] tracking-[0.2em] uppercase text-white font-semibold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  A 6-Hour<br />Live Online Masterclass
                </p>
                <p className="mt-1 font-serif-display italic text-white text-[14px] md:text-[17px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  By Meera Sakhrani
                </p>
              </div>
            </div>

            {/* duration badge */}
            <div
              data-testid="hero-days-badge"
              className="absolute -bottom-3 left-1 sm:left-4 md:left-6 bg-[#f5ede7] border border-[#e3d2c8] px-4 md:px-5 py-2.5 md:py-3 text-center shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]"
            >
              <p className="font-serif-display text-[28px] md:text-[36px] leading-none text-[#7c5a6e] font-semibold">
                6
              </p>
              <p className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-[#8a7480] mt-1">
                Hours
              </p>
            </div>
          </div>

          {/* TEXT — appears second on mobile, left on desktop */}
          <div className="fade-up order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c08aa0]" />
              <p
                data-testid="hero-eyebrow"
                className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#8a7480] font-medium"
              >
                Meera Sakhrani School
              </p>
            </div>

            <h1 className="mt-7 md:mt-9">
              <span className="block font-serif-display italic font-normal text-[36px] md:text-[52px] leading-[1.05] text-[#3b2f33]">
                Signature
              </span>
              <span
                data-testid="hero-title-makeup"
                className="block font-serif-display font-bold uppercase text-[56px] sm:text-[70px] md:text-[90px] lg:text-[100px] leading-[0.92] tracking-[-0.015em] text-[#7c5a6e] mt-1"
              >
                Glam Look
              </span>
              <span className="block font-serif-display italic font-normal text-[22px] md:text-[30px] leading-[1.2] text-[#3b2f33] mt-3">
                by Meera Sakhrani
              </span>
            </h1>

            <div className="divider-thin mt-8 md:mt-10" />

            <p className="mt-6 md:mt-8 font-serif-body italic text-[22px] md:text-[28px] text-[#3b2f33]">
              Online Masterclass · LIVE
            </p>

            <p className="mt-5 text-[15px] md:text-[16.5px] leading-[1.75] text-[#5a4750] max-w-md">
              A 6-hour intensive live masterclass by Meera Sakhrani — master
              the modern luminous bridal look and luxury artistry on every skin
              tone.
            </p>

            <div className="mt-8 md:mt-10 flex items-center gap-3 md:gap-4 flex-wrap">
              <button
                data-testid="hero-pay-now-btn"
                className="px-7 md:px-9 py-3.5 md:py-4 rounded-full bg-[#7c5a6e] text-[#f5ede7] text-[10.5px] md:text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5d4254] transition-all shadow-[0_8px_24px_-8px_rgba(124,90,110,0.45)]"
              >
                Pay Now
              </button>
              <button
                data-testid="hero-view-details-btn"
                className="px-7 md:px-9 py-3.5 md:py-4 rounded-full border border-[#2d2326]/30 text-[#2d2326] text-[10.5px] md:text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#2d2326] hover:text-[#f5ede7] transition-all"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
