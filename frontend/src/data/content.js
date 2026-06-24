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
  "https://res.cloudinary.com/dqdx30pbj/image/upload/v1782213349/IMG_3204.JPG.jpg_hl8jkn.jpg";

export const venueImage =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&q=80&auto=format&fit=crop";

export const glamLooks = [
  makePortfolioItem(
    1,
    "Bridal Radiance",
    "Bridal",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1782213349/IMG_6375_r3wk13.heic"
  ),
  makePortfolioItem(
    2,
    "Soft Editorial",
    "Editorial",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1782213349/IMG_3204.JPG.jpg_hl8jkn.jpg"
  ),
  makePortfolioItem(
    3,
    "Smoke & Rose",
    "Party",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1782213348/IMG_3227.JPG.jpg_t10ptf.jpg"
  ),
  makePortfolioItem(
    4,
    "Luminous Skin",
    "Soft Glam",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1782213348/IMG_6377.JPG_zja4ii.jpg"
  ),
  makePortfolioItem(
    5,
    "Festive Glow",
    "Bridal",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1782213347/IMG_6380.JPG_ba8a9u.jpg"
  ),
  makePortfolioItem(
    6,
    "Garden Romantic",
    "Editorial",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1782213349/IMG_6374_j6odvx.heic"
  ),
  makePortfolioItem(
    7,
    "Rose Glow",
    "Soft Glam",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1782213348/IMG_3222.JPG.jpg_k7secy.jpg"
  ),
  makePortfolioItem(
    8,
    "Velvet Lip",
    "Party",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013329/port7_fu9wly.jpg"
  ),
  makePortfolioItem(
    9,
    "Mehendi Muse",
    "Bridal",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013327/port4_cdcolz.jpg"
  ),
  makePortfolioItem(
    10,
    "Champagne Hour",
    "Party",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1763013329/port12_qxuq0z.heic"
  ),
  makePortfolioItem(
    11,
    "Champagne Hour",
    "Party",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1782213347/IMG_6378.JPG_pu6wxc.jpg"
  ),
  makePortfolioItem(
    12,
    "Champagne Hour",
    "Party",
    "https://res.cloudinary.com/dqdx30pbj/image/upload/v1782213347/IMG_6380.JPG_ba8a9u.jpg"
  ),
];
