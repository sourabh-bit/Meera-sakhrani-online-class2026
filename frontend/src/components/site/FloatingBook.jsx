import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function FloatingBook() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => navigate("/checkout");

  return (
    <button
      data-testid="floating-book-now"
      onClick={onClick}
      aria-label="Book Now"
      className={`fixed z-50 bottom-5 right-5 md:bottom-7 md:right-7 group inline-flex items-center gap-2 pl-5 pr-3 md:pl-7 md:pr-4 py-3 md:py-3.5 rounded-full bg-[#7c5a6e] text-[#f5ede7] text-[10.5px] md:text-[11px] tracking-[0.32em] uppercase font-semibold shadow-[0_18px_38px_-14px_rgba(124,90,110,0.65)] transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      } hover:bg-[#5d4254] hover:shadow-[0_22px_44px_-12px_rgba(124,90,110,0.8)]`}
    >
      <span className="absolute inset-0 rounded-full bg-[#7c5a6e] opacity-50 animate-ping" style={{ animationDuration: "2.6s" }} />
      <span className="relative">Book Now</span>
      <span className="relative w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#f5ede7] text-[#7c5a6e] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight size={14} />
      </span>
    </button>
  );
}
