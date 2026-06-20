import { heroImage } from "../../data/content";

export default function Hero() {
  return (
    <section
      id="masterclass"
      data-testid="hero-section"
      className="w-full bg-[#f5ede7] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14 pt-6 md:pt-10 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-14 lg:gap-24 items-center">
          {/* IMAGE — first on mobile */}
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

              <div className="absolute top-6 left-6 right-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-serif-display italic text-white/95 text-[18px] md:text-[24px] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] ml-6 md:ml-10">
                    Signature
                  </p>
                  <p className="text-[8px] md:text-[10px] tracking-[0.28em] uppercase text-white font-semibold text-right leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
                    Meera<br />Sakhrani<br />School
                  </p>
                </div>
                <p className="font-serif-display font-bold uppercase text-[#f7c8d3] text-[42px] md:text-[60px] leading-[0.88] tracking-[-0.02em] mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                  Glam
                </p>
                <p className="font-serif-display font-bold uppercase text-[#f7c8d3] text-[42px] md:text-[60px] leading-[0.88] tracking-[-0.02em] mt-2 text-right drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                  Look
                </p>
                <p className="font-serif-display italic text-white text-[13px] md:text-[17px] leading-none mt-3 text-center pr-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  by Meera Sakhrani
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

          {/* TEXT */}
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

            {/* Editorial cascading title */}
            <h1
              data-testid="hero-title"
              className="mt-7 md:mt-9 relative"
            >
              <span className="block font-serif-display italic font-normal text-[34px] sm:text-[44px] md:text-[56px] leading-[1] text-[#3b2f33] text-center pr-[10%] sm:pr-[18%]">
                Signature
              </span>
              <span
                data-testid="hero-title-glam"
                className="block font-serif-display font-bold uppercase text-[60px] sm:text-[80px] md:text-[104px] leading-[0.9] tracking-[-0.015em] text-[#7c5a6e] text-left mt-1 md:mt-2"
              >
                Glam
              </span>
              <span
                data-testid="hero-title-look"
                className="block font-serif-display font-bold uppercase text-[60px] sm:text-[80px] md:text-[104px] leading-[0.9] tracking-[-0.015em] text-[#7c5a6e] text-right mt-1 md:mt-2"
              >
                Look
              </span>
              <span className="block font-serif-display italic font-normal text-[20px] sm:text-[26px] md:text-[32px] leading-[1.1] text-[#3b2f33] text-center mt-3 md:mt-4">
                by Meera Sakhrani
              </span>
            </h1>

            <div className="divider-thin mt-8 md:mt-10" />

            <p className="mt-6 md:mt-8 font-serif-body italic text-[22px] md:text-[28px] text-[#3b2f33]">
              Online Masterclass · LIVE
            </p>

            <p className="mt-5 text-[15px] md:text-[16.5px] leading-[1.75] text-[#5a4750] max-w-md">
              A 6-hour live masterclass with Meera Sakhrani — recreate her
              signature glam look from luminous base to sculpted finish, step
              by step.
            </p>

            <div className="mt-8 md:mt-10 flex items-center gap-3 md:gap-4 flex-wrap">
              <button
                data-testid="hero-pay-now-btn"
                onClick={() =>
                  document
                    .getElementById("booking-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 md:px-9 py-3.5 md:py-4 rounded-full bg-[#7c5a6e] text-[#f5ede7] text-[10.5px] md:text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#5d4254] transition-all shadow-[0_8px_24px_-8px_rgba(124,90,110,0.45)]"
              >
                Pay Now
              </button>
              <button
                data-testid="hero-view-details-btn"
                onClick={() =>
                  document
                    .getElementById("curriculum-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
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
