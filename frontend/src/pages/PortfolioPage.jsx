import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import { glamLooks } from "../data/content";

export default function PortfolioPage() {
  const [selectedLook, setSelectedLook] = useState(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedLook(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div data-testid="portfolio-page" className="min-h-screen bg-[#fcf5ef] text-[#3b2f33]">
      <Navbar />

      <section className="w-full">
        <div className="mx-auto max-w-[1320px] px-4 pb-16 pt-8 sm:px-6 md:px-10 md:pb-20 md:pt-14">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              data-testid="portfolio-title"
              className="mt-4 font-serif-display leading-[0.95] text-[#6f5961]"
            >
              <span className="block text-[26px] sm:text-[34px] md:text-[44px] font-normal tracking-[0.18em] uppercase">
                Seductive
              </span>
              <span className="block text-[44px] sm:text-[62px] md:text-[84px] font-normal mt-1">
                Glam Looks
              </span>
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed text-[#8a7480] md:mt-5 md:text-[16px]">
              Explore our luxury makeup artistry curated beautifully.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 md:grid-cols-4 md:gap-5">
            {glamLooks.map((look) => (
              <article key={look.id} data-testid={`portfolio-card-${look.id}`} className="min-w-0">
                <button
                  type="button"
                  onClick={() => setSelectedLook(look)}
                  className="group relative block w-full overflow-hidden rounded-[16px] md:rounded-[18px] magazine-shadow aspect-[4/5] focus:outline-none focus:ring-2 focus:ring-[#c8a1a0] focus:ring-offset-2 focus:ring-offset-[#fcf5ef]"
                  aria-label="Open portfolio image"
                >
                  <img
                    src={look.image}
                    alt="Portfolio image"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="absolute inset-0 h-full w-full object-cover object-[50%_18%] transition-transform duration-[900ms] group-hover:scale-[1.04]"
                  />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedLook && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedLook.title} full view`}
          className="fixed inset-0 z-50 bg-[#1c1416]/85 px-4 py-6 sm:px-6"
          onClick={() => setSelectedLook(null)}
        >
          <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
            <div
              className="relative w-full overflow-hidden rounded-[24px] bg-[#fcf5ef] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedLook(null)}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fcf5ef]/90 text-[#6f5961] shadow-md transition hover:bg-white"
                aria-label="Close full view"
              >
                <X size={18} />
              </button>
              <div className="bg-black">
                <img
                  src={selectedLook.fullImage || selectedLook.image}
                  alt="Portfolio image"
                  decoding="async"
                  className="h-[70vh] w-full object-contain sm:h-[78vh] md:h-[84vh]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

