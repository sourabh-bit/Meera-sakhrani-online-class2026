import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import { glamLooks } from "../data/content";

const categories = ["All Work", "Bridal", "Editorial", "Events"];

const CATEGORY_FILTERS = {
  "All Work": () => true,
  Bridal: (look) => look.category === "Bridal",
  Editorial: (look) => look.category === "Editorial",
  Events: (look) => look.category === "Party" || look.category === "Soft Glam",
};

export default function PortfolioPage() {
  const [active, setActive] = useState("All Work");
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

  const filtered = glamLooks.filter(CATEGORY_FILTERS[active]);

  return (
    <div data-testid="portfolio-page" className="min-h-screen bg-[#fcf5ef] text-[#3b2f33]">
      <Navbar />

      <section className="w-full">
        <div className="mx-auto max-w-[1320px] px-4 pb-16 pt-8 sm:px-6 md:px-10 md:pb-20 md:pt-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#b9928f]">
              Portfolio
            </p>
            <h1
              data-testid="portfolio-title"
              className="mt-4 font-serif-display text-[44px] leading-[0.95] text-[#6f5961] sm:text-[62px] md:text-[84px]"
            >
              Portfolio
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed text-[#8a7480] md:mt-5 md:text-[16px]">
              Explore our luxury makeup artistry curated beautifully.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12 md:gap-4">
            {categories.map((category) => {
              const isActive = active === category;
              return (
                <button
                  key={category}
                  data-testid={`filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setActive(category)}
                  className={`min-w-[92px] rounded-full border px-5 py-2.5 text-[10px] uppercase tracking-[0.24em] transition-all md:text-[11px] md:tracking-[0.28em] ${
                    isActive
                      ? "border-[#c8a1a0] bg-[#f2e2de] text-[#6f5961] shadow-[0_8px_24px_-16px_rgba(111,89,97,0.55)]"
                      : "border-[#d9c5c3] bg-transparent text-[#8a7480] hover:border-[#c8a1a0] hover:bg-[#f7ebe7] hover:text-[#6f5961]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 md:grid-cols-4 md:gap-5">
            {filtered.map((look) => (
              <article key={look.id} data-testid={`portfolio-card-${look.id}`} className="min-w-0">
                <button
                  type="button"
                  onClick={() => setSelectedLook(look)}
                  className="group relative block w-full overflow-hidden rounded-[16px] md:rounded-[18px] magazine-shadow aspect-[4/5] focus:outline-none focus:ring-2 focus:ring-[#c8a1a0] focus:ring-offset-2 focus:ring-offset-[#fcf5ef]"
                  aria-label={`Open ${look.title} full view`}
                >
                                    <img
                    src={look.image}
                    alt={look.title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="absolute inset-0 h-full w-full object-cover object-[50%_18%] transition-transform duration-[900ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d2326]/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 sm:p-5 md:p-6">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#fff7f2]/85">
                      {look.category}
                    </p>
                    <p className="mt-1 font-serif-display italic text-[20px] leading-tight text-[#fff7f2] md:text-[24px]">
                      {look.title}
                    </p>
                  </div>
                </button>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-16 text-center font-serif-body text-[22px] italic text-[#8a7480]">
              No looks in this category yet - check back soon.
            </p>
          )}
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
              <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
                <div className="bg-black">
                                    <img
                    src={selectedLook.fullImage || selectedLook.image}
                    alt={selectedLook.title}
                    decoding="async"
                    className="h-[52vh] w-full object-contain sm:h-[64vh] md:h-[78vh]"
                  />
                </div>
                <div className="flex items-end bg-[#fcf5ef] p-6 sm:p-8 md:p-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#b9928f]">
                      {selectedLook.category}
                    </p>
                    <h2 className="mt-3 font-serif-display text-[34px] leading-tight text-[#6f5961] md:text-[46px]">
                      {selectedLook.title}
                    </h2>
                    <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#8a7480]">
                      Tap outside the image or press Escape to close this view.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}



