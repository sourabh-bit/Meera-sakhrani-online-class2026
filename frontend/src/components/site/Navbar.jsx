import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Instagram, Mail } from "lucide-react";

const links = [
  { to: "/", label: "Home", scrollTop: true },
  { to: "/", hash: "curriculum-section", label: "Masterclass" },
  { to: "/portfolio", label: "Portfolio" },
];

const EMAIL = "meerasakhranibeauty@gmail.com";
const INSTAGRAM = "https://www.instagram.com/meerasakhrani/";

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
        document.getElementById(l.hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(l.to);
        setTimeout(() => document.getElementById(l.hash)?.scrollIntoView({ behavior: "smooth" }), 120);
      }
    } else if (l.scrollTop) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  };

  return (
    <header
      data-testid="site-navbar"
      className="w-full bg-[#f7f1ea] relative z-30 border-b border-[#e6d7cb]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-5 md:py-6 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link
          to="/"
          data-testid="brand-logo"
          onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50)}
          className="font-serif-display italic text-[20px] md:text-[26px] text-[#2d2326] flex items-baseline gap-2 shrink-0"
        >
          Meera Sakhrani
          <span className="not-italic font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#7a6455] font-medium">
            Masterclass
          </span>
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-10 justify-self-center">
          {links.map((l) => {
            const isActive =
              (l.to === "/" && pathname === "/" && !l.hash) ||
              (l.to.startsWith("/portfolio") && pathname.startsWith("/portfolio"));
            return (
              <Link
                key={l.label}
                to={l.to}
                onClick={handleClick(l)}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className={`text-[11px] tracking-[0.32em] uppercase font-medium transition-colors ${
                  isActive ? "text-[#7a6455]" : "text-[#2d2326] hover:text-[#7a6455]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 text-[#7a6455] justify-self-end">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#d9c8bc] flex items-center justify-center hover:bg-[#7a6455] hover:text-[#f7f1ea] transition-all"
          >
            <Instagram size={15} />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#d9c8bc] flex items-center justify-center hover:bg-[#7a6455] hover:text-[#f7f1ea] transition-all"
          >
            <Mail size={15} />
          </a>
          <button
            data-testid="mobile-menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#2d2326]/20 text-[#2d2326] hover:bg-[#2d2326] hover:text-[#f7f1ea] transition-all"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute inset-x-0 top-full bg-[#f7f1ea] border-t border-[#e3d2c8] overflow-hidden transition-[max-height,opacity] duration-300 ${
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
              className="py-3 text-[12px] tracking-[0.32em] uppercase text-[#2d2326] font-medium border-b border-[#e3d2c8] last:border-b-0 hover:text-[#7a6455]"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 text-[12px] tracking-[0.32em] uppercase text-[#7a6455] font-medium border-b border-[#e3d2c8] last:border-b-0"
          >
            Instagram
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="py-3 text-[12px] tracking-[0.32em] uppercase text-[#7a6455] font-medium border-b border-[#e3d2c8] last:border-b-0"
          >
            Email
          </a>
        </nav>
      </div>
    </header>
  );
}
