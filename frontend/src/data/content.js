// Centralised image URLs for the site
const CLOUDINARY_THUMB = "w_800,h_1000,c_fill,g_face,f_auto,q_auto";
const CLOUDINARY_FULL = "w_1600,c_limit,f_auto,q_auto";

function cloudinaryVariant(url, transform) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

function makePortfolioItem(id, title, category, source) {
  return {
    id,
    title,
    category,
    image: cloudinaryVariant(source, CLOUDINARY_THUMB),
    fullImage: cloudinaryVariant(source, CLOUDINARY_FULL),
  };
}

export const heroImage =
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&q=80&auto=format&fit=crop";

export const venueImage =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&q=80&auto=format&fit=crop";

export const glamLooks = [
  makePortfolioItem(
    1,
    "Bridal Radiance",
    "Bridal",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013327/port4_cdcolz.jpg"
  ),
  makePortfolioItem(
    2,
    "Soft Editorial",
    "Editorial",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763026909/IMG_8861_twjapp.jpg"
  ),
  makePortfolioItem(
    3,
    "Smoke & Rose",
    "Party",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763026887/A4923A68-F307-4B3A-907E-2E84FD97D8A1_orpxew.jpg"
  ),
  makePortfolioItem(
    4,
    "Luminous Skin",
    "Soft Glam",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013588/port2_qelcif.heic"
  ),
  makePortfolioItem(
    5,
    "Festive Glow",
    "Bridal",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013398/port1_gmr9jg.jpg"
  ),
  makePortfolioItem(
    6,
    "Garden Romantic",
    "Editorial",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013328/port9_rlg7oa.jpg"
  ),
  makePortfolioItem(
    7,
    "Rose Glow",
    "Soft Glam",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013329/port7_fu9wly.jpg"
  ),
  makePortfolioItem(
    8,
    "Velvet Lip",
    "Party",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013329/port13_uvlo5k.jpg"
  ),
  makePortfolioItem(
    9,
    "Mehendi Muse",
    "Bridal",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013328/port5_cfp8sg.heic"
  ),
  makePortfolioItem(
    10,
    "Champagne Hour",
    "Party",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013329/port12_qxuq0z.heic"
  ),
];
