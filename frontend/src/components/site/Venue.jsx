import { MapPin, Building2, TrainFront, UtensilsCrossed } from "lucide-react";
import { venueImage } from "../../data/content";

const details = [
  { icon: Building2, label: "Venue", value: "The Maidens Oberoi" },
  {
    icon: MapPin,
    label: "Address",
    value: "7, Sham Nath Marg, Prema Kunj, Civil Lines, New Delhi, Delhi 110054",
  },
  { icon: TrainFront, label: "Nearest Metro", value: "Civil Lines (Yellow Line)" },
  {
    icon: UtensilsCrossed,
    label: "Dining",
    value: "Lunch & Hi-tea at The Curzon Room & The Garden Terrace",
  },
];

export default function Venue() {
  return (
    <section
      data-testid="venue-section"
      className="w-full bg-[#f5ede7] py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
            A Royal Setting
          </p>
          <h2
            data-testid="venue-title"
            className="mt-5 font-serif-display uppercase text-[42px] md:text-[64px] tracking-[0.18em] text-[#3b2f33] font-normal"
          >
            The Venue
          </h2>
          <p className="mt-6 text-[16px] md:text-[17px] text-[#5a4750] max-w-xl mx-auto leading-relaxed">
            Experience luxury at The Maidens Oberoi, one of Delhi&apos;s most iconic
            heritage hotels.
          </p>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-sm magazine-shadow">
              <img
                src={venueImage}
                alt="The Maidens Oberoi"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              data-testid="venue-banquet-tag"
              className="absolute -bottom-4 left-6 md:left-10 bg-[#7c5a6e] text-[#f5ede7] px-6 py-3 shadow-[0_10px_30px_-12px_rgba(124,90,110,0.6)]"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase opacity-90">
                Sessions at
              </p>
              <p className="font-serif-display italic text-[18px] mt-0.5">
                The Banquet Hall
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-serif-display italic text-[36px] md:text-[42px] text-[#3b2f33]">
              The Maidens Oberoi
            </h3>

            <ul className="mt-10 space-y-7">
              {details.map((d) => {
                const Icon = d.icon;
                return (
                  <li key={d.label} className="flex items-start gap-5">
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-[#f1dde3] rounded-sm">
                      <Icon size={18} className="text-[#7c5a6e]" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#c08aa0] font-medium">
                        {d.label}
                      </p>
                      <p className="mt-1.5 font-serif-body text-[20px] md:text-[22px] text-[#3b2f33] leading-snug">
                        {d.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-10 text-[13px] italic text-[#8a7480]">
              * A heritage property known for its colonial charm and impeccable
              hospitality
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
