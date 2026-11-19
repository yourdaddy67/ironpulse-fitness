# IronPulse Fitness — GitHub Pages rebuild

Multi-file static site. Plain HTML/CSS/JS, no build step, no npm — deploy as-is.

## Deploy (GitHub Pages, project site)
1. Create repo `ironpulse-fitness` under the `yourdaddy67` account.
2. Push this folder's contents to the repo root (or `main` branch).
3. Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`.
4. Live at `https://yourdaddy67.github.io/ironpulse-fitness/`.

All internal paths are relative (`assets/...`, `index.html`) because project sites live under a subpath.

## Pages
- `index.html` — hero video, marquee, count-up stats, programs preview, floor zones, BMI calculator, today's classes, Rohit before/after slider, plans, trainers, FAQ
- `programs.html` — 6 programs in full detail + free assessment CTA
- `timetable.html` — full week timetable, day filter, live spot booking (IP-CLS-XXXX)
- `membership.html` — Monthly ₹2,500 / Quarterly ₹6,500 / Annual ₹18,000 + comparison table, add-ons, plan reservation (IP-MEM-XXXX)
- `trainers.html` — 4 coaches with bios, certs and best results
- `results.html` — before/after slider + 4 transformation stories
- `trial.html` — free trial booking form (IP-TRIAL-XXXX)
- `contact.html` — address, hours, map, contact form

## Assets
- `assets/video/` — our hero video (hero.mp4, 1280×720, 10s), autoplay muted loop, no play/pause icons
- `assets/img/` — 17 photos extracted from the v1 export (our own images only), including the split Rohit before/after pair
- `assets/css/style.css`, `assets/js/main.js` — shared by all pages

## Rules kept
Native scrolling only (no Lenis/pins/scrub). No play/pause overlay icons. No cursor-follow photo preview. Dark-first with Light/Dark/Auto theme toggle. Fictional demo brand disclosed in the footer. Nothing copied from any other gym website — own content, programs, prices, coaches, images and video only.
