# KNOWLEDGE

## Research Notes

- `unseen.co` currently ships a custom WordPress theme with preloaded custom fonts, a visible loader sequence, a DOM-driven custom cursor, heavy use of `data-cursor` hooks, and an interactive project layer that mixes image/video planes. The useful takeaway for this project is the atmosphere stack: a branded loader, a dedicated cursor layer, and intentional typography rather than generic UI polish.
- `stripe.com` currently preloads image fallbacks for its animated wave hero, uses a React/Next stack on their marketing site, and still leans on the animated gradient as environmental context rather than decoration. A lighter adaptation for Iron & Oak is a fixed atmospheric background with iron and oak color transitions, not a one-to-one clone.
- `virgingalactic.com` currently serves a Nuxt app and prefetches a `ScrollTrigger` chunk plus animation-specific CSS. The relevant lesson is cinematic framing: oversized typography, disciplined media staging, and clear section pacing.
- `airbnb.com` currently serves a large client bundle with dense design-token usage and a strongly modular search experience. The useful reference is structural: filters should feel calm and obvious even when the visual layer is rich.

## Open-Source Gradient Evaluation

- `thelevicole/stripe-gradient` is a reverse-engineered canvas implementation of Stripe-style gradients. It is useful as a reference for color movement and atmospheric pacing, but it is older and less attractive as the production choice here than a lighter custom background layer.
- `wave-gradient` is a WebGL 2 implementation explicitly inspired by Stripe's landing page. It is more technically capable but introduces a WebGL dependency and a stricter browser baseline than this site needs at launch.
- Decision: use a custom layered background system first, and leave room to swap in a heavier canvas/WebGL treatment later if performance budgets still hold.

## Library Notes

- Lenis is now published as `lenis`, not `@studio-freight/lenis`. The current React package is provided via `lenis/react`, and the documented GSAP integration still syncs Lenis scroll events into `ScrollTrigger.update` and drives Lenis via the GSAP ticker.
- Motion's current docs still position `AnimatePresence` as the route-level exit/enter primitive, which maps cleanly to a keyed wrapper in the App Router.
- GSAP 3.14 ships `SplitText` in the main package, which makes the scripture/text reveal work simpler than older GSAP-era assumptions.

## Implementation Decisions

- Built the oak-tree requirement as an animated timeline fallback on `/series/[slug]` to keep the route shippable while preserving the branch-growth concept.
- Kept newsletter capture UI-only for now because the brief explicitly allows no backend yet.
- Used placeholder video/resource wiring everywhere media is not yet available, while keeping the route/data architecture ready for launch-day population.
