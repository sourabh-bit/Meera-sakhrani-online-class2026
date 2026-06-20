import { Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const EMAIL = "meerasakhranibeauty@gmail.com";
const INSTAGRAM = "https://www.instagram.com/meerasakhrani/";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#f1e6df] border-t border-[#e3d2c8]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        <div>
          <h3 className="font-serif-display italic text-3xl text-[#2d2326]">
            Meera Sakhrani
          </h3>
          <p className="mt-2 text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium">
            The Meera Sakhrani School
          </p>
          <p className="mt-6 text-[15px] leading-relaxed text-[#5a4750] max-w-xs">
            A modern school celebrating the art of luxury bridal makeup —
            specialising in luminous, skin-like finishes on every skin tone.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium mb-5">
            Explore
          </p>
          <ul className="space-y-3 text-[15px] text-[#2d2326]">
            <li>
              <Link to="/" className="hover:text-[#7c5a6e]">
                The Masterclass
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-[#7c5a6e]">
                Portfolio
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.32em] uppercase text-[#7c5a6e] font-medium mb-5">
            Connect
          </p>
          <div className="flex items-center gap-4">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="social-instagram"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-[#d6c0b4] flex items-center justify-center text-[#7c5a6e] hover:bg-[#7c5a6e] hover:text-white transition-all"
            >
              <Instagram size={16} />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              data-testid="social-email"
              aria-label="Email"
              className="w-10 h-10 rounded-full border border-[#d6c0b4] flex items-center justify-center text-[#7c5a6e] hover:bg-[#7c5a6e] hover:text-white transition-all"
            >
              <Mail size={16} />
            </a>
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-6 inline-block text-[14px] md:text-[15px] text-[#5a4750] hover:text-[#7c5a6e] break-all"
          >
            {EMAIL}
          </a>
        </div>
      </div>

      <div className="border-t border-[#e3d2c8]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-[#8a7480] text-center">
            © 2026 The Meera Sakhrani School
          </p>
          <p className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-[#8a7480] text-center">
            Crafted with intention · New Delhi, India
          </p>
        </div>
      </div>
    </footer>
  );
}
