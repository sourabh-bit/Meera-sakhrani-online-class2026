import { useState } from "react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import { glamLooks } from "../data/content";

const categories = ["All", "Bridal", "Editorial", "Party", "Soft Glam"];

export default function PortfolioPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? glamLooks
      : glamLooks.filter((g) => g.category === active);

  return (
    <div data-testid="portfolio-page" className="min-h-screen bg-[#f5ede7]">
      <Navbar />

      <section className="w-full">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-16">
          <div className="text-center">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
              The Portfolio
            </p>
            <h1
              data-testid="portfolio-title"
              className="mt-5 font-serif-display text-[52px] md:text-[88px] leading-[0.95] text-[#3b2f33]"
            >
              Signature glam looks{" "}
              <span className="italic font-normal text-[#7c5a6e]">
                of Meera Sakhrani
              </span>
            </h1>
            <p className="mt-7 text-[16px] md:text-[17px] text-[#5a4750] max-w-2xl mx-auto leading-relaxed">
              A curated archive of bridal, editorial and signature looks —
              luminous skin, soft sculpting, and timeless artistry.
            </p>
          </div>

          {/* Category filter */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                data-testid={`filter-${c.toLowerCase().replace(" ", "-")}`}
                onClick={() => setActive(c)}
                className={`px-6 py-2.5 rounded-full text-[10px] tracking-[0.32em] uppercase font-semibold transition-all ${
                  active === c
                    ? "bg-[#7c5a6e] text-[#f5ede7] border border-[#7c5a6e]"
                    : "border border-[#2d2326]/25 text-[#2d2326] hover:bg-[#2d2326] hover:text-[#f5ede7] hover:border-[#2d2326]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Masonry-ish grid */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((look, idx) => (
              <article
                key={look.id}
                data-testid={`portfolio-card-${look.id}`}
                className="group fade-up"
                style={{
                  animationDelay: `${(idx % 6) * 0.08}s`,
                }}
              >
                <div
                  className={`relative overflow-hidden rounded-sm magazine-shadow ${
                    idx % 5 === 0 ? "aspect-[4/5]" : "aspect-[3/4]"
                  }`}
                >
                  <img
                    src={look.image}
                    alt={look.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d2326]/80 via-[#2d2326]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-5 left-5 right-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5ede7]/80">
                      {look.category}
                    </p>
                    <p className="font-serif-display italic text-[24px] text-[#f5ede7] leading-tight mt-0.5">
                      {look.title}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <p className="font-serif-body text-[20px] text-[#3b2f33]">
                    {look.title}
                  </p>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#8a7480]">
                    {look.category}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-20 text-center font-serif-body italic text-[22px] text-[#8a7480]">
              No looks in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
