# Invoice Generator — Full Review & Improvement Plan

## 🚨 Critical UX/Product Gaps

- [x] **Draft auto-save indicator** — Data saves silently to localStorage on every blur event. Users get no visible feedback that their work is persisted. Add a subtle "Saved" / "Saving..." indicator in the navbar (like Google Docs).
- [x] **`beforeunload` warning for unsaved changes** — If user has edited data since last explicit "Save Invoice", warn on tab close/refresh to prevent accidental data loss.
- [x] **Discount unit ambiguity** — Discount input has `placeholder="0.00"` with no label indicating whether it's a flat amount or percentage. Users will enter `10` expecting 10% off but get $10. Add a visible label/toggle or clearly state the unit.
- [x] **Blocking `confirm()` dialogs** — Clear and Delete use `confirm()`. Replace with the custom toast/modal pattern already used elsewhere for a consistent, non-blocking experience.
- [x] **No undo for destructive actions** — Deleted invoices and cleared forms are gone forever. Consider a soft-delete with an "undo" toast (auto-dismiss after 5s with undo button).
- [x] **No empty/sample state on first visit** — New users see a blank form with no guidance, sample data, or quick-start onboarding. Add a "Load Sample Invoice" button or first-visit tutorial overlay.
- [x] **Share button has no feedback** — Clicking Share silently succeeds or fails. Show a success toast ("Invoice shared!") or error toast ("Sharing not supported on this browser").

## 🎨 UI / Visual Design

- [ ] **`prefers-color-scheme` fallback for dark mode** — If user has system-level dark mode, honor it on first visit instead of defaulting to light. Use `@media (prefers-color-scheme: dark)` as a fallback in CSS.
- [ ] **Sidebar backdrop overlay is broken** — `styles.css:405-421`: `.sidebar::before` has `z-index: -1` which places it *behind* the sidebar itself. The page-dimming overlay never renders. Fix z-index so the overlay sits between sidebar and page content.
- [ ] **Template selector missing `<fieldset>` / `<legend>`** — `index.html:179-199`: Radio buttons are not grouped semantically. Screen readers won't announce them as a set. Wrap in `<fieldset>` with `<legend>`.
- [ ] **Modal missing focus trap** — `index.html:541-560`: Preview modal's close button is focusable, but Tab can escape to elements behind the modal. Trap focus within modal while open.
- [ ] **Section titles are `<div>` not headings** — "Billing Details", "Invoice Details", "Line Items", etc. use `.card-section-title` (a `<div>`). Use `<h2>` / `<h3>` for proper document outline (screen readers + SEO).
- [ ] **Hardcoded colors in dark mode** — Many `rgba(99,102,241,...)` and `rgba(239,68,68,...)` values in `styles.css` are not theme-aware. In dark mode they appear wrong. Replace with CSS custom properties or add dark-mode overrides.
- [ ] **Navbar brand `href="#"` scrolls to top** — `index.html:126`: Clicking the brand logo forces page scroll to top. Change to `href="/"` or `javascript:void(0)`.
- [ ] **Print CSS forces sans-serif** — `styles.css:2177`: `font-family: var(--font-sans) !important` overrides template fonts (e.g., Classic uses Times New Roman). Respect template font choice in print.
- [ ] **Toast close button inherits browser default font** — `styles.css:1649-1658`: `.toast-close` lacks `font-family` inheritance, so `×` renders in browser serif. Add `font-family: inherit`.
- [ ] **No `@page` margin in print styles** — Missing `@page { margin: ... }` means browser defaults apply (usually 0.5in), but no way to tweak for optimal PDF printing.

## 🧭 Navigation & Workflow

- [ ] **Mobile sidebar has no close affordance** — Sidebar opens on hamburger click but there's no visible "X", no backdrop-tap-to-close, and no swipe-to-dismiss on mobile. Users may not know how to close it.
- [ ] **No section anchor navigation** — The form is very long (billing → details → items → totals → notes → logo → payment) with no "jump to section" links. Add a sticky table of contents or section quick-nav.
- [ ] **Tax input silently clamps displayed value** — If user types `150`, the model clamps to `100` but the input still shows `150`. Update the displayed value to match the clamped value so there's no confusion.
- [ ] **Due date preset DST bug** — `app.js:838`: Due date calculation uses `86400000` (24h in ms) which breaks on DST transition days (off by 1 hour). Use `Date` setter methods instead.
- [ ] **Delete-empty-rows has no confirmation** — Bulk deleting empty rows is non-destructive (no data lost), but could surprise users who have rows they consider "in progress." Add a count or confirmation.
- [ ] **Date format always ISO (YYYY-MM-DD)** — `app.js:4,680`: Dates are always in ISO format. Consider displaying dates in the user's locale (e.g., "Apr 27, 2026") for readability while keeping ISO in the input value.
- [ ] **No loading state for PDF preview/generation** — Generating a PDF with many line items and a large logo can take 1–3 seconds with no visual feedback. Add a spinner or "Generating PDF..." overlay.
- [ ] **Logo upload error is silent** — `app.js:2065-2073`: If logo fails to render in the PDF, the error is silently swallowed. Show a toast: "Logo could not be embedded in the PDF."

## 🧩 Product Feature Gaps

- [ ] **Export/Import all invoices as JSON** — Already listed as planned in original `plan.md` but not implemented. Critical for data portability.
- [ ] **Default sender profile** — Users who send many invoices want to save their own company details as a default that prepopulates on new invoices.
- [ ] **Client management** — Save recipient details and quickly select from a dropdown rather than retyping every time.
- [ ] **Multi-page PDF support** — Currently all content is forced onto one PDF page. Long invoices with many line items get clipped.
- [ ] **CSV import of line items** — Users with many line items (e.g., freelancers with timesheets) want to paste/upload from a spreadsheet.
- [ ] **Invoice status auto-update** — If due date is in the past and status is not "Paid", automatically suggest "Overdue" status with a confirmation prompt.
- [ ] **Late fee calculator** — Optionally add a late payment fee line based on days overdue and a configurable rate.
- [ ] **More professional templates** — Only 3 templates. Competitors offer 10+. Even 5–6 would be a significant upgrade.
- [ ] **Email invoice directly from app** — Integrate mailto with a pre-filled body containing invoice summary, or use a service like EmailJS for actual sending.
- [ ] **Invoice numbering customization** — Currently fixed prefix "INV-". Allow users to customize prefix, separator, starting number, and padding width.
- [ ] **Partial payments** — Allow recording partial payments against an invoice and showing balance due.
- [ ] **Recurring invoices** — Template with configurable frequency (weekly, monthly) for subscription-style billing.

## ♿ Accessibility

- [ ] **Focus management in modal** — `index.html:541`: No focus trap. Tab cycles through background content. Add `focus-trap` logic and restore focus to trigger button on close.
- [ ] **`role="alert"` / `aria-live` on error divs** — `index.html:215-244`: Empty error divs exist but have no `role="alert"` or `aria-live` attribute. Screen readers won't announce dynamically populated errors.
- [ ] **`data-label` causes double-announcement** — `index.html:375-383`: Responsive table uses `data-label` attributes rendered via CSS `::before`. Screen readers read both the `td` content and the `::before` pseudo-content — double reading.
- [ ] **Skip link always visible** — `index.html:63`: Skip-to-content link should be visually hidden until focused (standard "skip link" pattern) to avoid cluttering the visual interface for sighted users.
- [ ] **Modal missing `aria-hidden` on background** — When preview modal is open, background content should have `aria-hidden="true"` and `inert` attribute to prevent screen reader access to hidden content.
- [ ] **Line items delete button tooltip broken on disabled state** — `styles.css:1356`: `pointer-events: none` on disabled delete buttons prevents tooltip/title from appearing. Use a wrapper or `aria-disabled` instead.
- [ ] **Color contrast in dark mode** — Verify all text meets WCAG AA 4.5:1 ratio in dark mode, especially on primary-colored elements (status badges, action buttons, template previews).
- [ ] **`prefers-reduced-motion` coverage gaps** — Theme toggle hover rotation (15deg) and template option hover translateY should be suppressed when reduced motion is preferred.

## ⚡ Performance

- [ ] **jsPDF & jspdf-autotable loaded unconditionally** — Both libraries (~200KB combined) load on every page visit even if user never generates a PDF. Consider lazy-loading when the user first clicks Download/Preview.
- [ ] **Google Fonts render-blocking** — `index.html:58`: Font CSS is render-blocking. Add `rel="preload"` or `display=swap` to prevent FOIT/blank text.
- [ ] **localStorage write on every keystroke** — `app.js:1750`: Line items fire `saveInvoiceData()` on every input event. Debounce saves (already partially done) but also consider using a `MutationObserver` or interval-based save.
- [ ] **No resource hints for third-party CDNs** — jsPDF hosted on Cloudflare CDN but no `dns-prefetch` or `preconnect` link tag.
- [ ] **CSS/JS are monolithic files** — Single `styles.css` (2217 lines) and `app.js` (2284 lines). No code splitting, no critical CSS inlining. First Contentful Paint could be improved.

## 📊 Analytics & SEO

- [ ] **No hreflang tags** — 4 languages offered but no `<link rel="alternate" hreflang="es">` tags. Spanish/French/German users searching in their language may not find the localized version.
- [ ] **`<meta name="keywords">` is dead weight** — `index.html:8`: Ignored by Google for a decade. Remove to reduce page weight.
- [ ] **Sitemap link in `<head>` is invalid** — `index.html:11`: Sitemaps don't belong in `<head>`. Submit via robots.txt or Google Search Console.
- [ ] **OG image missing dimensions** — `index.html:17`: `onlinefreeinvoicegenerator.jpg` has no `width`/`height` in meta tags. Add for proper social card rendering.
- [ ] **Duplicate `</head>` closing tag** — `index.html:60-61`: Two `</head>` tags. Validates incorrectly.

## 💾 Database Migration (localStorage → IndexedDB)

### Phase 1: Database layer

- [ ] **Create `db.js` service module** — Raw IndexedDB wrapper with Promise API. DB `InvoiceDB` with object stores: `invoices` (keyed by `invoiceNumber`) and `meta` (key-value). Exports: `openDB()`, `getInvoice()`, `putInvoice()`, `deleteInvoice()`, `getAllInvoices()`, `getMeta()`, `setMeta()`, `getHistory()`, `putHistory()`, `clearInvoices()`.
- [ ] **Add `db.js` to index.html** — Script tag before `app.js`.
- [ ] **Bootstrap DB on app init** — Call `openDB()` in `DOMContentLoaded` before `init()`. Store db reference globally.

### Phase 2: Replace all localStorage calls

- [ ] **`getNextInvoiceNumber()`** — Make async, replace `localStorage.getItem/setItem(COUNTER_KEY)` with `getMeta/setMeta('invoice_counter')`.
- [ ] **`saveInvoiceData()`** — Make async, replace `localStorage.setItem(STORAGE_KEY)`, `setItem(getInvoiceStorageKey(...))`, `setItem(HISTORY_KEY)` with `putInvoice()` + `putHistory()`.
- [ ] **`loadInvoiceData()`** — Make async, replace `localStorage.getItem(STORAGE_KEY)`/`getItem(getInvoiceStorageKey(...))` with `getInvoice()`.
- [ ] **`deleteFromHistory()`** — Make async, replace with `deleteInvoice()` + `putHistory()`. Keep undo restore logic.
- [ ] **`exportBackup()`** — Make async, replace localStorage loop with `getAllInvoices()`.
- [ ] **`importBackup()`** — Make async, replace localStorage writes with `putInvoice()`.
- [ ] **`updateHistoryDropdown()` & `updateSidebarList()`** — Make async, replace localStorage loops with `getAllInvoices()`.
- [ ] **`loadFromHistory()` & `loadFromHistorySidebar()`** — Make async, replace with `getInvoice()`.
- [ ] **Theme & language persistence** — Replace localStorage with `getMeta/setMeta()`.
- [ ] **Clear form / Clear history** — Replace `localStorage.removeItem()` with `clearInvoices()`.
- [ ] **Refactor event handlers** — Update `init()` event listeners to `await` async DB calls. Update `attachRowListeners()` callbacks.
- [ ] **Remove all localStorage references** — Delete `STORAGE_KEY`, `COUNTER_KEY`, `HISTORY_KEY`, `getInvoiceStorageKey()`. Strip all `localStorage.X` calls.
- [ ] **Add error handling & migrate existing data** — On first load, try to read data from old localStorage keys and write to IndexedDB. Show migration toast if data was moved.