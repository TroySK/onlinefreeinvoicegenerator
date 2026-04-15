# Improvement Plan — Online Free Invoice Generator

---

## ALL ITEMS COMPLETED ✅

### P0 — Critical Bugs
- ✅ #1: Tax calculation fixed (tax-exclusive)
- ✅ #2: Dead code `setupEventListeners()` removed
- ✅ #3: Dead code `setDefaultCurrency()` removed
- ✅ #4: Delete row button added
- ✅ #5: `templateSelect` null reference removed
- ✅ #6: `applyTemplate()` reference removed

### P1 — High Impact
- ✅ #7: localStorage persistence for invoice data
- ✅ #8: Discount capped (can't make grand total negative)
- ✅ #9: Floating point precision fixed
- ✅ #10: SRI hashes on CDN scripts
- ✅ #11: Toast notifications instead of alert()
- ✅ #12: Loading/success state on download button
- ✅ #13: aria-describedby on inputs
- ✅ #14: aria-live on error divs
- ✅ #15: scope="col" on table headers
- ✅ #16: role="img" on template SVGs
- ✅ #17: doc.lastAutoTable null check
- ✅ #18: Negative discount clamped
- ✅ #19: Empty line items validation
- ✅ #20: Library availability check

### P2 — Product Features
- ✅ #21: Clear/reset button
- ✅ #22: Due date field
- ✅ #23: PO number field
- ✅ #24: Notes/payment terms section
- ✅ #25: Logo upload with preview and PDF embed
- ✅ #26: Duplicate invoice button
- ✅ #27: Share/email invoice (Web Share API + mailto fallback)
- ✅ #28: Intl.NumberFormat for currency
- ✅ #29: Keyboard shortcut Ctrl+S
- ✅ #30: Tab order management in line items
- ✅ #31: Confirmation before clearing
- ✅ #32: Zero-quantity visual hint
- ✅ #33: Auto-format currency inputs on blur/focus

### P3 — UI Polish
- ✅ #34: Templates visually distinct (Modern, Classic, Professional)
- ✅ #35: Improved template preview SVGs (120x168, detailed)
- ✅ #36: Hover states on inputs
- ✅ #37: Error state transition
- ✅ #38: Disabled state on buttons
- ✅ #39: Focus-visible for keyboard navigation
- ✅ #40: Mobile table alignment (45% padding)
- ✅ #41: Word-break for addresses
- ✅ #42: Template selector scroll on small screens
- ✅ #43: Hero padding tightened on mobile
- ✅ #44: Color contrast fixed for WCAG AA
- ✅ #45: prefers-reduced-motion
- ✅ #46: aria-hidden on template SVGs
- ✅ #47: Skip-to-content link

### Code Quality
- ✅ #48: IIFE wrapper
- ✅ #49: PDF layout constants
- ✅ #50: Extracted CSS to `styles.css` and JS to `app.js`
- ✅ #51: Decoupled data model from DOM (`syncFromDOM`/`syncToDOM`)
- ✅ #52: Debounced `calculateTotals()` (100ms)
- ✅ #53: Split `updateCurrencyDisplay()` into `updateTotalsDisplay()` + `updateLineItemCurrency()`
- ✅ #54: Moved GA script to end of body
- ✅ #55: Google Fonts preconnect (already configured)
- ✅ #56: Removed deprecated `navigator.userLanguage`
- ✅ #57: Stale row index fixed (re-render on delete)
- ✅ #58: Floating point in PDF totals (handled by toFixed at source)
- ✅ #59: Removed redundant minus sign from discount in PDF
- ✅ #60: Template validation in `updateTemplate()`
- ✅ #61: Error boundary for PDF generation (specific error messages)

### SEO & Meta
- ✅ #62: Favicon link
- ✅ #63: theme-color meta
- ✅ #64: robots meta
- ✅ #65: Sitemap link
- ✅ #66: OG image verified (exists, 98KB)
- ✅ #67: Enhanced schema.org (added `featureList`, `applicationSubCategory`)

---

## Newly Discovered Issues (Browser Testing — Apr 2026)

### P0 — Critical Bugs
- ✅ #68: **Duplicate invoice doesn't recalculate line item amounts** — Fixed by resetting `lineItems` to single empty row in duplicate handler.
- ✅ #69: **Duplicate invoice doesn't clear line item descriptions** — Fixed by resetting `lineItems` array to single empty item in duplicate handler.

### P1 — High Impact
- ✅ #70: **Discount input doesn't trigger recalculation** — Fixed by adding `calculateTotals()` call on discount `input` event, plus `_calculateTotals()` sync call at start of `downloadPDF()`.
- ✅ #71: **Tax amount display shows `(0.00)` even when no tax** — Fixed by hiding tax amount element when `taxAmount === 0`.
- ✅ #72: **PDF logo embedding assumes PNG format** — Fixed by detecting image format from data URL prefix (`data:image/jpeg`, `data:image/gif`, `data:image/webp`).
- ✅ #73/#98: **Invoice number collision risk** — Fixed with localStorage-based incrementing counter (`INV-000001`, `INV-000002`, etc.).

### P2 — Product Features
- ✅ #74: **No "Paid/Unpaid/Overdue" status indicator** — Added status dropdown (Paid, Unpaid, Overdue) that renders as a stamp/watermark on the PDF.
- ✅ #75: **No invoice preview before download** — Added modal preview with PDF iframe and download button.
- ✅ #76: **No way to set payment method details** — Added "Payment Details" section with fields for bank, PayPal, and payment link.
- ✅ #77: **No multi-language support** — Added language selector for EN, ES, FR, DE with full UI and PDF translation.
- ✅ #78: **Share button doesn't include PDF attachment** — Updated share to generate PDF and attach via Web Share API (if supported).

### P3 — UI Polish
- ✅ #79/#99: **Classic template dark mode** — Verified working.
- ✅ #80: **Empty line items with 0.00 amounts look cluttered** — Fixed with `.empty-row` class.
- ✅ #81/#100: **No visual feedback when localStorage saves** — Fixed with "✓ Saved" indicator in navbar.
- ✅ #82: **Currency selector is very long (30+ options)** — Grouped currencies by region (Americas, Europe, Asia, Oceania, Africa).

### Code Quality
- ✅ #84: **`calculateLineItemAmount` directly accesses DOM** — Fixed by splitting into `calculateLineItemAmount()` (data only) and `updateLineItemUI()` (DOM update).
- ✅ #85: **Magic numbers in PDF generation** — Fixed by extracting to `PDF` constants object.
- ✅ #86: **`syncToDOM` rebuilds all line items from scratch** — Fixed with diff-and-update approach.
- ✅ #87/#97: **No error handling for `localStorage` quota exceeded** — Fixed by catching `QuotaExceededError` and showing toast.

### UX Enhancements
- ✅ #88: **Auto-set due date based on common terms** — Added quick-select dropdown.
- ✅ #89: **Bulk actions for line items** — Added "Delete Empty Rows" button.
- ✅ #90: **Invoice history** — Added history dropdown to store and switch between multiple invoices in localStorage.
- ✅ #91: **Print-friendly CSS** — Fixed with print-specific styles.

### Additional Issues from Browser Testing
- ✅ #92: **Duplicate invoice doesn't clear line items** — Fixed by resetting `lineItems` to single empty row.
- ✅ #94: **Discount not recalculated before PDF download** — Fixed by adding `_calculateTotals()` at start of `downloadPDF()` and `calculateTotals()` on discount input event.
- ✅ #95: **PDF logo format hardcoded to PNG** — Fixed by detecting format from data URL prefix.
- ✅ #101: ~~**Second line item amount shows 0.00 after entry**~~ — Verified working. Amount was 0.00 because quantity was empty. Once filled, calculated correctly.
- ✅ #102: **Empty rows persist after duplicate** — Fixed by resetting `lineItems` to single empty row.
- ✅ #103: **Discount input shows raw value after clamp** — Already fixed by adding `calculateTotals()` to discount input event.

---

## File Structure

```
index.html     (487 lines — HTML only)
styles.css     (1271 lines — all styles)
app.js         (1299 lines — all JavaScript)
plan.md        (this file)
```
