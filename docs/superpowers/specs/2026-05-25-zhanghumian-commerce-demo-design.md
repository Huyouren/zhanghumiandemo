# Zhanghumian Commerce Demo Design

## Goal

Build a browser-runnable mobile commerce demo for Zhanghumian, shaped like a WeChat mini program but delivered as a local web app. The demo should help consumers understand the brand, trust the silk quilt products, browse products, use a traceability experience, simulate cart checkout, and view member services.

## Product Positioning

Zhanghumian is presented as a Chinese intangible-cultural-heritage silk lifestyle brand. The demo focuses on the consumer path from interest to trust to purchase:

1. See craft and lifestyle value.
2. Verify product quality through traceability and proof.
3. Choose a product or gift scene.
4. Add to cart or book an in-store experience.
5. Return through membership, care service, and referral incentives.

The first version is a front-end demo only. It does not connect to real payment, user accounts, logistics, or backend services.

## Reference Logic

The planning document describes Zhanghumian's core pain points as weak digital expression, fragmented online/offline conversion, and insufficient visible trust evidence. It recommends story-based content, ritualized product scenes, user co-creation, O2O service, "one quilt one code" traceability, craft videos, private member operation, and old-customer referral.

Current home-textile and silk brands commonly use online flagship stores, short video, livestreaming, membership systems, and official commerce channels. For this demo, the useful pattern is not a generic catalog mall, but a trust-led commerce experience: product cards must be supported by craft proof, traceability, in-store experience, reviews, and care service.

## Target Users

The demo serves three consumer groups identified in the planning document:

- Price-and-security buyers: compare price, quality proof, after-sales service, and authenticity.
- Culture-focused buyers: care about non-heritage craft, gift scenes, local culture, and ceremonial value.
- Content-driven buyers: discover through short video, notes, live explanations, and authentic user stories.

## App Structure

The demo uses five bottom tabs:

- Home
- Category
- Trace
- Cart
- Mine

The UI should be mobile-first, with a maximum phone-like width on desktop and full width on mobile. It should feel like a polished mini program rather than a marketing landing page.

## Home Tab

Purpose: introduce the brand and route users into scene-based purchase paths.

Required sections:

- Hero area with the brand name Zhanghumian, slogan "一生一被，一丝传家", and a high-quality silk lifestyle image.
- Three scene cards: wedding gift, parent health, and quality self-use.
- Recommended products carousel or horizontal list.
- Trust strip with short items such as non-heritage craft, traceability code, local silk, and in-store experience.
- Craft teaser linking to the Trace tab.
- In-store appointment call-to-action.

Expected behavior:

- Scene cards filter or highlight relevant products in the Category tab.
- Product cards open product detail.
- Craft teaser switches to Trace tab.
- Appointment opens a simulated appointment sheet.

## Category Tab

Purpose: support shopping and product comparison.

Required categories:

- Golden silk quilt
- Mulberry silk quilt
- Four-season child-parent quilt
- Gift set

Required product card fields:

- Product image
- Name
- Short value phrase
- Price
- Tags such as "非遗手作", "一被一码", "礼赠推荐", or "门店可体验"
- Add-to-cart button

Product detail should open as a detail panel or full in-app view. It must include:

- Large product image
- Price and selected specification
- Scene fit
- Quality proof block
- Craft proof block
- After-sales promise
- User comments
- Add to cart and book experience actions

## Trace Tab

Purpose: make the demo distinctive by turning non-heritage value into visible trust.

Required content:

- Example trace code: `ZHM-2026-0518`
- A scan/input-like area. Since this is a demo, clicking the sample code directly reveals the result.
- Trace result card with origin, material, craft batch, artisan, inspection, and care advice.
- Eighteen-step craft timeline. It should show representative steps such as selecting cocoons, boiling cocoons, peeling, stretching silk, layering, shaping, quilting, inspection, and packaging.
- Each timeline step should have a short consumer-facing explanation, not only technical wording.

Expected behavior:

- Empty or unknown code shows a friendly simulated error and suggests using the sample code.
- Valid sample code reveals trace information and craft timeline.

## Cart Tab

Purpose: simulate a lightweight commerce flow.

Required behavior:

- Cart stores products added during the session in front-end state.
- Users can increase quantity, decrease quantity, remove products, and view subtotal.
- Coupon display is simulated.
- Checkout opens a confirmation sheet showing product count, subtotal, coupon discount, appointment option, and a final "submit simulated order" button.
- Submitting shows a success state and keeps the demo local.

No real payment, personal information storage, or network checkout is included.

## Mine Tab

Purpose: show private-domain and after-sales operation.

Required sections:

- Member card with level, points, and next benefit.
- Appointment card with in-store experience action.
- Care service entries: quilt care, cleaning guidance, warranty service.
- Referral card: old customer recommendation reward.
- Store information card with example address and demo phone number `0870-000-2026`.

Expected behavior:

- Appointment opens the same simulated appointment sheet used by Home and Detail.
- Referral opens a simulated share/reward sheet.

## Visual Direction

The visual style should be warm, premium, and restrained. It should avoid a single-color beige or brown theme. Use a balanced palette:

- Silk ivory as background
- Deep ink green for brand weight
- Warm red accent for gift scenes
- Soft gold only as a small highlight
- Muted blue-gray for secondary text and proof cards

Cards should use modest radius, dense but readable spacing, and clear mobile ergonomics. The design should feel like a usable mini program, not a large landing page.

## Image Generation Requirements

The user requested gpt-image-2 for higher-quality generated visual assets. The preferred image generation path is CLI fallback with gpt-image-2 once `OPENAI_API_KEY` is available locally. If the API key is unavailable, the implementation should create CSS-based fallback image panels with the same file references documented in code comments, so generated assets can replace them without changing component logic.

Target assets:

1. `public/assets/hero-silk-bedroom.png`
   - Use case: product-mockup
   - Asset type: mini program home hero
   - Prompt: photorealistic Chinese premium silk quilt in a bright natural-light bedroom, subtle Yunnan mountain and craft atmosphere, soft white silk texture, refined but not luxurious, no logo, no text, no watermark, mobile hero composition.

2. `public/assets/product-golden-silk.png`
   - Use case: product-mockup
   - Asset type: product listing and detail image
   - Prompt: catalog-quality golden silk quilt product photo, folded quilt with visible soft silk filling detail, clean ivory background, natural texture, premium home textile, no text, no watermark.

3. `public/assets/gift-set-scene.png`
   - Use case: ads-marketing
   - Asset type: wedding and parent gift scene
   - Prompt: elegant Chinese silk quilt gift box on a warm home table, subtle wedding and family gift atmosphere, refined packaging, red accent ribbon, no brand text, no watermark, realistic product photography.

4. `public/assets/craft-hands-silk.png`
   - Use case: photorealistic-natural
   - Asset type: craft and traceability page image
   - Prompt: close-up of artisan hands stretching white silk floss by hand in a real workshop, authentic craft texture, natural light, calm documentary style, no text, no watermark.

## Data Model

Use static front-end data. Minimum entities:

- Product: id, name, category, price, originalPrice, image, tags, scene, specs, proofItems, comments.
- CartItem: productId, spec, quantity.
- TraceRecord: code, origin, material, artisan, batch, inspection, careTips, timeline.
- Appointment: store, serviceType, selectedDate, selectedTime, contactName, phone.
- MemberProfile: name, level, points, benefits.

All data can live in a local JavaScript module for the first version.

## Technical Scope

The app should be a local web project. React with Vite is acceptable if no existing framework is present. Styling can use plain CSS modules or a single app stylesheet. The project should run locally with `npm run dev` and build with `npm run build`.

Icons should use lucide-react if available or installable. If dependencies cannot be installed because network access is blocked, use text labels and CSS symbols as a fallback, but keep button sizing stable.

## Error Handling

- Invalid trace code: show a friendly message and expose the sample code.
- Empty cart checkout: show a prompt to add products first.
- Appointment missing contact or phone: mark fields and keep the sheet open.
- Add-to-cart repeated product: increase quantity instead of duplicating rows when same product and spec match.

## Verification

Minimum checks before completion:

- The app starts locally and renders Home.
- All five tabs are reachable.
- At least one product can be added to cart.
- Cart quantity and subtotal update correctly.
- Checkout success state appears.
- Trace sample code reveals record details.
- Invalid trace code shows an error.
- Appointment validation works.
- Desktop and mobile screenshots show no text overlap or broken layout.
- If generated assets are available, they are stored under `public/assets/` and render in the app.

## Out of Scope

- Real WeChat mini program packaging.
- Real payment or order submission.
- Real authentication, SMS, logistics, or backend database.
- Real QR scanning through camera.
- Admin product management.
