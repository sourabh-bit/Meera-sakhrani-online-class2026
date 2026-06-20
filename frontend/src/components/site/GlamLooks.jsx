import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { glamLooks } from "../../data/content";

export default function GlamLooks() {
  const preview = glamLooks.slice(0, 4);
  return (
    <section
      data-testid="glam-section"
      className="w-full bg-[#efe2da] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="h-px w-8 md:w-10 bg-[#c08aa0]" />
              <p className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
                Recent Work
              </p>
            </div>
            <h2
              data-testid="glam-title"
              className="mt-4 font-serif-display text-[32px] sm:text-[42px] md:text-[54px] leading-[1.05] text-[#3b2f33]"
            >
              Signature glam looks{" "}
              <span className="italic font-normal text-[#7c5a6e]">
                of Meera Sakhrani
              </span>
            </h2>
          </div>

          <Link
            to="/portfolio"
            data-testid="view-portfolio-btn"
            className="self-center md:self-auto inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 rounded-full border border-[#2d2326]/30 text-[#2d2326] text-[10.5px] md:text-[11px] tracking-[0.32em] uppercase font-semibold hover:bg-[#2d2326] hover:text-[#f5ede7] transition-all whitespace-nowrap"
          >
            View Portfolio
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-12 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {preview.map((look, idx) => (
            <Link
              key={look.id}
              to="/portfolio"
              data-testid={`glam-card-${look.id}`}
              className="group block fade-up"
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="relative overflow-hidden rounded-sm aspect-[3/4]">
                <img
                  src={look.image}
                  alt={look.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d2326]/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5ede7]/80">
                    {look.category}
                  </p>
                  <p className="font-serif-display italic text-[20px] text-[#f5ede7] leading-tight">
                    {look.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
