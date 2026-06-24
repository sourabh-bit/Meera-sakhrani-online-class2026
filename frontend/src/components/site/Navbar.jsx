import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Instagram, Mail } from "lucide-react";

const links = [
  { to: "/", label: "Home", scrollTop: true },
  { to: "/portfolio", label: "Portfolio" },
];

const EMAIL = "meerasakhranibeauty@gmail.com";
const INSTAGRAM = "https://www.instagram.com/meerasakhrani/";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // No mobile menu state to reset; this keeps the component simple on small screens.
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
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 py-4 md:py-6 grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-4">
        <Link
          to="/"
          data-testid="brand-logo"
          onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50)}
          className="font-serif-display italic text-[17px] sm:text-[19px] md:text-[26px] text-[#2d2326] whitespace-nowrap shrink-0"
        >
          Meera Sakhrani
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

        <div className="flex items-center gap-2 sm:gap-3 text-[#7a6455] justify-self-end">
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
        </div>
      </div>
    </header>
  );
}