import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home", scrollTop: true },
  { to: "/", hash: "curriculum-section", label: "Masterclass" },
  { to: "/portfolio", label: "Portfolio" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleClick = (l) => (e) => {
    if (l.hash) {
      e.preventDefault();
      if (pathname === l.to) {
        document
          .getElementById(l.hash)
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(l.to);
        setTimeout(
          () =>
            document
              .getElementById(l.hash)
              ?.scrollIntoView({ behavior: "smooth" }),
          120
        );
      }
    } else if (l.scrollTop) {
      // For "Home" — let Link navigate and also scroll to top.
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  };

  return (
    <header
      data-testid="site-navbar"
      className="w-full bg-[#f5ede7] relative z-30"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-5 md:py-7 flex items-center justify-between">
        <Link
          to="/"
          data-testid="brand-logo"
          onClick={() =>
            setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50)
          }
          className="font-serif-display italic text-[20px] md:text-[26px] text-[#2d2326] flex items-baseline gap-2"
        >
          Meera Sakhrani
          <span className="not-italic font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#7c5a6e] font-medium">
            · School
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const isActive =
              (l.to === "/" && pathname === "/" && !l.hash) ||
              (l.to.startsWith("/portfolio") &&
                pathname.startsWith("/portfolio"));
            return (
              <Link
                key={l.label}
                to={l.to}
                onClick={handleClick(l)}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className={`text-[11px] tracking-[0.32em] uppercase font-medium transition-colors ${
                  isActive
                    ? "text-[#7c5a6e]"
                    : "text-[#2d2326] hover:text-[#7c5a6e]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          data-testid="mobile-menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#2d2326]/20 text-[#2d2326] hover:bg-[#2d2326] hover:text-[#f5ede7] transition-all"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* mobile dropdown */}
      <div
        className={`md:hidden absolute inset-x-0 top-full bg-[#f5ede7] border-t border-[#e3d2c8] overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 py-5 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={handleClick(l)}
              data-testid={`mobile-nav-${l.label.toLowerCase()}`}
              className="py-3 text-[12px] tracking-[0.32em] uppercase text-[#2d2326] font-medium border-b border-[#e3d2c8] last:border-b-0 hover:text-[#7c5a6e]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
