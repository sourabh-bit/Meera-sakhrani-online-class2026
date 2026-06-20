# Meera Sakhrani School — PRD

## Problem Statement
Build a landing page for a bridal makeup masterclass + portfolio page showcasing glam looks. Match the reference screenshots (Meera Sakhrani style — beige/cream tone, dusty pink/mauve accents, serif Playfair Display typography, editorial spacing).

## Brand
- Name: **Meera Sakhrani** (school subtitle)
- Aesthetic: editorial luxury · beige/cream (#f5ede7) · mauve plum (#7c5a6e) · dusty pink (#c08aa0)
- Fonts: Playfair Display (display), Cormorant Garamond (serif body italics), Inter (UI/body)

## Implemented (2026-12)
- Beige theme tokens + global fonts set in `index.css`
- Top navbar with brand wordmark + nav (Home / Masterclass / Portfolio / Contact)
- **Hero**: "The Future of MAKEUP" headline, Offline Masterclass description, Pay Now + View Details buttons, magazine-cover style image with overlay text and "7 Days" badge
- **Venue**: "A ROYAL SETTING / THE VENUE", The Maidens Oberoi card with Venue / Address / Metro / Dining icons + Banquet Hall tag
- **Glam Looks (Home)**: 4-card preview with "Signature glam looks of Meera Sakhrani" + "View Portfolio" CTA
- **Portfolio page** (`/portfolio`): hero title, category filter (All / Bridal / Editorial / Party / Soft Glam), 12-image gallery with hover overlay & captions
- **Footer**: brand block, explore links, social icons (Instagram/YouTube/Mail)
- Fixed legacy webpack-dev-server v4 keys (`onAfterSetupMiddleware`, `https`, etc.) in `craco.config.js` so frontend starts

## Architecture
- React 19 + react-router-dom 7
- Pages: `HomePage.jsx`, `PortfolioPage.jsx`
- Components: `Navbar`, `Hero`, `Venue`, `GlamLooks`, `Footer` (under `components/site/`)
- Image data: `src/data/content.js` (Unsplash URLs)
- No backend changes needed for this iteration

## Backlog (next iterations)
- P1: Replace placeholder Unsplash images with real Meera Sakhrani photography
- P1: Wire Pay Now to Razorpay / Stripe checkout
- P2: Dedicated Masterclass details page (curriculum, schedule, mentors)
- P2: Contact form (name, email, message) with backend persistence
- P2: Testimonials carousel + alumni section
- P3: Instagram feed grid pulling latest posts
