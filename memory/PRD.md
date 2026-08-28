# Cake World Bakery Website PRD

## Problem statement
Build a premium, warm, conversion-focused website for Cake World Bakery in Muddanahalli, Bengaluru using the supplied local listing details: bakery and cake shop, 3.7 rating from 75 reviews, takeaway, address 416 Singanayakanahalli, Sree Sai Layout, Bengaluru, Muddanahalli, Karnataka 560119, listed closing time 10:30 pm, price range ₹1–200 per person, phone 063627 93729, and menu highlights Chicken Burger with French Fries and Veg Sandwiches.

## Architecture
- React 19 + TypeScript + Vite single-page site with a single Home route.
- CSS-first editorial design using five color roles, Playfair Display for display type, Outfit for UI/body type, native keyframes, IntersectionObserver reveals, and a small scroll parallax variable on the hero image.
- Real external action links for WhatsApp, phone calls, and Google Maps directions. No order data is persisted and no authentication is used.
- Generated bakery photography is hosted from Emergent image storage and used in the hero, menu, and visit sections.

## Personas
- Celebration buyer: wants a birthday or custom cake quickly and needs a direct way to ask about size and availability.
- Neighbourhood regular: wants to scan the menu highlights, see reviews, confirm hours, and choose takeaway.
- Group/snack buyer: wants savoury items and a low-friction WhatsApp enquiry without creating an account.

## Core requirements
- One complete landing page with a distinctive warm cream, ganache, and cherry visual direction.
- Sticky single navigation bar with section links and a primary WhatsApp ordering action.
- Kinetic hero with line-by-line headline reveal, generated cake photography, call action, and subtle image parallax.
- Editorial scrolling strip, numbered bakehouse principles, menu cards, savoury menu highlights, reviews, store details, and footer actions.
- Interactive cake enquiry brief that builds a prefilled WhatsApp message with item, size, eggless preference, note/date, and takeaway preference.
- Responsive layouts at desktop and mobile sizes, with a mobile action bar shown after scrolling.
- Unique data-testid attributes on interactive elements and critical information.

## Implemented 2026-08-28
- Delivered the full one-page bakery experience with responsive editorial sections and the supplied shop information.
- Connected all WhatsApp actions to the supplied number +91 63627 93729 and phone actions to the same number.
- Added Google Maps directions link built from the supplied store address.
- Added generated food/craft imagery for the hero, menu cards, and visit section.
- Added CSS motion, responsive mobile navigation, scroll reveals, hero parallax, and order-message generation.

## Prioritised backlog
### P0
- Replace generated photography with approved real Cake World Bakery photos before public launch.
- Confirm the current menu, prices, eggless availability, pickup timing, and exact business hours with the owner.

### P1
- Add a simple editable menu source so daily availability and prices can be updated without code changes.
- Add lightweight enquiry analytics so the bakery can understand popular cake and snack requests.
- Add a confirmation/status reply flow if the bakery later wants to automate WhatsApp responses.

### P2
- Add a real photo gallery and birthday-cake collection.
- Add Kannada and English content toggle for a more local visitor experience.
- Add optional delivery areas and an embedded map once the bakery confirms service coverage.

## Next tasks
1. Gather approved bakery photos and replace the generated image URLs.
2. Validate the menu and pricing copy with the bakery owner.
3. Decide whether the WhatsApp enquiry is enough or needs a connected ordering system.

## Feature addition 2026-08-28
- Added a protected owner menu editor at `/owner/login` and `/owner/menu` with JWT email/password authentication, live menu item management, visibility toggles, prices, ordering, English/Kannada fields, and idempotent MongoDB seeding.
- Public menu cards now load from `/api/menu`, expose owner-managed prices, and use a typographic live-counter rail and counter callout to make the spacious editorial layout feel intentional.
- Added a full English/Kannada visitor toggle persisted in the browser, including navigation, headings, menu labels, order form, review copy, store details and footer.
- Added an embedded Google Maps view for the supplied Cake World Bakery address alongside the existing directions link.
- Verification completed: authenticated login/me/admin menu CRUD/hide/logout flow, public menu response, frontend build, language toggle, owner editor render, and desktop/mobile layout assertions.

## Updated backlog
### P0
- Replace generated menu imagery with approved real bakery photos.
- Set the current per-item prices and availability in the owner editor.

### P1
- Add password reset and owner audit history if more staff accounts are introduced.
- Confirm whether Google Maps usage should move from the no-key embedded view to a restricted Maps API key.

### P2
- Add editable review content and a Kannada review management workflow.
- Owner handoff uses the test credentials documented in `/app/memory/test_credentials.md`.
