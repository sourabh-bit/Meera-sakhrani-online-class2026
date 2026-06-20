import { heroImage } from "../../data/content";
import { useNavigate } from "react-router-dom";

// Free-stock looping beauty video; replace with your own URL when ready.
const HERO_VIDEO_URL =
  "https://videos.pexels.com/video-files/8074200/8074200-uhd_2160_4096_25fps.mp4";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section
      id="masterclass"
      data-testid="hero-section"
      className="w-full bg-[#f5ede7] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14 pt-6 md:pt-10 pb-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-14 lg:gap-24 items-center">
          {/* IMAGE — first on mobile */}
          <div
            className="relative fade-up order-1 lg:order-2 w-full"
            style={{ animationDelay: "0.05s" }}
          >
            <div
              data-testid="hero-image"
              className="relative aspect-[3/4] w-full max-w-[460px] mx-auto magazine-shadow rounded-[2px] overflow-hidden bg-[#e7c9d0]"
            >
              <video
                data-testid="hero-video"
                autoPlay
                loop
                muted
                playsInline
                poster={heroImage}
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={HERO_VIDEO_URL} type="video/mp4" />
                <img
                  src={heroImage}
                  alt="Signature glam look by Meera Sakhrani"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </video>
            </div>

            {/* 6 Hours badge — bottom-left corner of the image */}
            <div
              data-testid="hero-days-badge"
              className="absolute -bottom-4 left-3 sm:left-5 md:left-8 bg-[#f5ede7] border border-[#e3d2c8] px-5 md:px-6 py-3 md:py-3.5 text-center shadow-[0_12px_28px_-12px_rgba(0,0,0,0.3)]"
            >
              <p className="font-serif-display text-[30px] md:text-[38px] leading-none text-[#7c5a6e] font-semibold">
                6
              </p>
              <p className="text-[8px] md:text-[9px] tracking-[0.32em] uppercase text-[#8a7480] mt-1">
                Hours
              </p>
            </div>
          </div>

          {/* TEXT */}
          <div className="fade-up order-2 lg:order-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="h-px w-8 bg-[#c08aa0]" />
              <p
                data-testid="hero-eyebrow"
                className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#8a7480] font-medium"
              >
                Meera Sakhrani School
              </p>
            </div>

            <h1 data-testid="hero-title" className="mt-8 md:mt-10">
              <span className="block font-serif-display italic font-normal text-[32px] sm:text-[44px] md:text-[58px] leading-[1.02] text-[#3b2f33]">
                Signature
              </span>
              <span
                data-testid="hero-title-glamlook"
                className="block whitespace-nowrap font-serif-display font-bold uppercase text-[44px] sm:text-[60px] md:text-[78px] lg:text-[84px] leading-[0.95] tracking-[-0.015em] text-[#7c5a6e] mt-1"
              >
                Glam Look
              </span>
              <div className="divider-thin mt-7 md:mt-9 mx-auto lg:mx-0" />
              <span className="block font-serif-display italic font-normal text-[20px] sm:text-[24px] md:text-[28px] leading-[1.2] text-[#3b2f33] mt-6">
                by Meera Sakhrani
              </span>
            </h1>

            <p className="mt-8 md:mt-10 font-serif-body italic text-[20px] md:text-[26px] text-[#3b2f33]">
              Online Masterclass · LIVE
            </p>

            <p className="mt-4 text-[15px] md:text-[16.5px] leading-[1.75] text-[#5a4750] max-w-md mx-auto lg:mx-0">
              A 6-hour live masterclass with Meera Sakhrani — recreate her
              signature glam look from luminous base to sculpted finish, step
              by step.
            </p>

            <div className="mt-8 md:mt-10 flex items-stretch sm:items-center gap-3 md:gap-4">
              <button
                data-testid="hero-pay-now-btn"
                onClick={() => navigate("/checkout")}
                className="flex-1 sm:flex-none px-6 md:px-9 py-3.5 md:py-4 rounded-full bg-[#7c5a6e] text-[#f5ede7] text-[10.5px] md:text-[11px] tracking-[0.28em] md:tracking-[0.32em] uppercase font-semibold hover:bg-[#5d4254] transition-all shadow-[0_8px_24px_-8px_rgba(124,90,110,0.45)]"
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
                className="flex-1 sm:flex-none px-6 md:px-9 py-3.5 md:py-4 rounded-full border border-[#2d2326]/30 text-[#2d2326] text-[10.5px] md:text-[11px] tracking-[0.28em] md:tracking-[0.32em] uppercase font-semibold hover:bg-[#2d2326] hover:text-[#f5ede7] transition-all"
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
