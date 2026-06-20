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
      className="w-full bg-[#efe2da] py-20 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 md:w-10 bg-[#c08aa0]" />
            <p className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#c08aa0] font-medium">
              A Royal Setting
            </p>
            <span className="h-px w-8 md:w-10 bg-[#c08aa0]" />
          </div>
          <h2
            data-testid="venue-title"
            className="mt-5 font-serif-display uppercase text-[34px] sm:text-[44px] md:text-[60px] tracking-[0.18em] text-[#3b2f33] font-normal"
          >
            The Venue
          </h2>
          <p className="mt-5 text-[15px] md:text-[16.5px] text-[#5a4750] max-w-xl mx-auto leading-[1.7]">
            Experience luxury at The Maidens Oberoi — one of Delhi&apos;s most
            iconic heritage hotels.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-14 lg:gap-20 items-center">
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
              className="absolute -bottom-4 left-4 sm:left-6 md:left-10 bg-[#7c5a6e] text-[#f5ede7] px-5 md:px-6 py-3 shadow-[0_10px_30px_-12px_rgba(124,90,110,0.6)]"
            >
              <p className="text-[9.5px] md:text-[10px] tracking-[0.3em] uppercase opacity-90">
                Sessions at
              </p>
              <p className="font-serif-display italic text-[16px] md:text-[18px] mt-0.5">
                The Banquet Hall
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-serif-display italic text-[28px] sm:text-[34px] md:text-[42px] text-[#3b2f33] leading-tight">
              The Maidens Oberoi
            </h3>

            <ul className="mt-8 md:mt-10 space-y-6 md:space-y-7">
              {details.map((d) => {
                const Icon = d.icon;
                return (
                  <li key={d.label} className="flex items-start gap-4 md:gap-5">
                    <div className="shrink-0 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-[#f1dde3] rounded-sm">
                      <Icon size={17} className="text-[#7c5a6e]" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#c08aa0] font-semibold">
                        {d.label}
                      </p>
                      <p className="mt-1.5 font-serif-body text-[18px] md:text-[21px] text-[#3b2f33] leading-snug">
                        {d.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 md:mt-10 text-[12.5px] md:text-[13px] italic text-[#8a7480]">
              * A heritage property known for its colonial charm and impeccable
              hospitality
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
