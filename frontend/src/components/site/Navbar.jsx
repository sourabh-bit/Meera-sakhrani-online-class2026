import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/#masterclass", label: "Masterclass" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <header
      data-testid="site-navbar"
      className="w-full bg-[#f5ede7]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-7 flex items-center justify-between">
        <Link
          to="/"
          data-testid="brand-logo"
          className="font-serif-display italic text-2xl md:text-[26px] text-[#2d2326] flex items-baseline gap-2"
        >
          Meera Sakhrani
          <span className="not-italic font-sans text-[10px] tracking-[0.3em] uppercase text-[#7c5a6e] font-medium">
            · School
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const isActive =
              (l.to === "/" && pathname === "/") ||
              (l.to.startsWith("/portfolio") &&
                pathname.startsWith("/portfolio"));
            return (
              <Link
                key={l.label}
                to={l.to}
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
      </div>
    </header>
  );
}
