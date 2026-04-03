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
- [ ] #73: **Duplicate invoice number collision risk** — Uses `Date.now().toString().slice(-6)` which could collide. Should use incrementing counter or full timestamp.

### P2 — Product Features
- [ ] #74: **No "Paid/Unpaid/Overdue" status indicator** — Professional invoices typically show a payment status badge. Could add a status dropdown (Paid, Unpaid, Overdue) that renders as a stamp/watermark on the PDF.
- [ ] #75: **No invoice preview before download** — Users can't see what the PDF will look like before downloading. Could add a modal preview or expandable preview section.
- [ ] #76: **No way to set payment method details** — Bank account, PayPal, Stripe payment links are common on invoices. Could add an optional "Payment Details" section.
- [ ] #77: **No multi-language support** — The UI is English-only. Could add language selector for labels, PDF output (e.g., "Invoice" → "Factura", "Rechnung", etc.).
- [ ] #78: **Share button doesn't include PDF attachment** — The share/email only sends text summary. Could generate PDF as blob and attach via Web Share API (if supported) or provide a download link.

### P3 — UI Polish
- [ ] #79: **Classic template doesn't switch to dark mode properly** — The `.template-classic .totals` forces `background: #ffffff` even in dark mode (only overridden for dark via `[data-theme="dark"]` selector, but the selector targets `.template-classic` on the container, not on `.totals` directly in dark mode).
- [ ] #80: **Empty line items with 0.00 amounts look cluttered** — After adding multiple line items, empty rows with `0.00` amounts take up space. Could collapse or visually de-emphasize empty rows.
- [ ] #81: **No visual feedback when localStorage saves** — Users have no indication their work is being auto-saved. Could add a subtle "Saved" indicator near the title or in the status bar.
- [ ] #82: **Currency selector is very long (30+ options)** — On mobile, the dropdown is unwieldy. Could group by region or add a search/filter within the dropdown.
- [ ] #83: **Tax amount `(0.00)` overlaps with input on narrow screens** — In mobile view, the tax amount display below the tax input can overlap or cause layout shift.

### Code Quality
- [ ] #84: **`calculateLineItemAmount` directly accesses DOM** — Should use the data model and let `syncToDOM` handle updates, rather than directly manipulating `lineItemsTable.rows[index].cells[4]`.
- [ ] #85: **Magic numbers in PDF generation** — Values like `20`, `190`, `35`, `45`, `110`, `140`, `190` are scattered throughout `downloadPDF()`. Should be extracted to named constants (e.g., `PDF_MARGIN_LEFT`, `PDF_PAGE_WIDTH`).
- [ ] #86: **`syncToDOM` rebuilds all line items from scratch** — This is inefficient and loses focus state. If a user is editing a field and `syncToDOM` is called (e.g., after loading saved data), they lose their cursor position. Should diff and update rather than rebuild.
- [ ] #87: **No error handling for `localStorage` quota exceeded** — If logo is large (near 2MB), base64 encoding could exceed localStorage quota (typically 5-10MB). The `saveInvoiceData` try/catch silently fails, but user has no indication their data wasn't saved.

### UX Enhancements
- [ ] #88: **Auto-set due date based on common terms** — Could add a quick-select dropdown for due date (Net 15, Net 30, Net 60, Upon Receipt) that auto-calculates from invoice date.
- [ ] #89: **Bulk actions for line items** — No way to delete all empty line items at once, or duplicate a line item.
- [ ] #90: **Invoice history** — Could store multiple invoices in localStorage and allow switching between them.
- [ ] #91: **Print-friendly CSS** — The `@media print` styles hide navbar and action bar, but the form inputs still look like inputs when printed. Could add print-specific styling to make the form look like a rendered invoice.

### Additional Issues from Browser Testing
- ✅ #92: **Duplicate invoice doesn't clear line items** — Fixed by resetting `lineItems` to single empty row.
- ✅ #93: **Tax amount `(0.00)` always visible** — Fixed by hiding element when tax amount is 0.
- ✅ #94: **Discount not recalculated before PDF download** — Fixed by adding `_calculateTotals()` at start of `downloadPDF()` and `calculateTotals()` on discount input event.
- ✅ #95: **PDF logo format hardcoded to PNG** — Fixed by detecting format from data URL prefix.
- [ ] #96: **Mobile: tax amount text overlaps on narrow screens** — At 375px width, the `(0.00)` tax amount text renders below the tax input but can cause layout shift or overlap in the responsive card layout. (Mitigated by #93 fix — tax amount is now hidden when 0.)
- ✅ #97: **No localStorage quota error handling** — Fixed by catching `QuotaExceededError` and showing toast notification.
- [ ] #98: **Duplicate invoice number collision risk** — `Date.now().toString().slice(-6)` can produce same last 6 digits if duplicated within same millisecond or by coincidence. Should use incrementing counter or full timestamp.
- [ ] #99: **Classic template dark mode incomplete** — `.template-classic .totals` sets `background: #ffffff` but dark mode override only applies when `.template-classic` is on body, not when it's on `#invoice-container`. Need to verify selector specificity.
- [ ] #100: **No "saved" indicator** — Users have no visual feedback that auto-save is working. A subtle "✓ Saved" near the header would improve confidence.
- [ ] #101: ~~**Second line item amount shows 0.00 after entry**~~ — Verified working in browser test. The amount was 0.00 because quantity was empty (defaults to 0). Once quantity was filled (2), amount correctly calculated as 151.00 (2 × 75.50). Subtotal also updated correctly to $651.00. Issue resolved — was user input sequence, not a bug.
- ✅ #102: **Empty rows persist after duplicate** — Fixed by resetting `lineItems` to single empty row in duplicate handler.
- ✅ #103: **Discount input shows raw value after clamp** — Already fixed by adding `calculateTotals()` to discount input event. Browser test confirmed: entering `99999` clamped to `500.00` and displayed correctly.

---

## File Structure

```
index.html     (473 lines — HTML only)
styles.css     (1165 lines — all styles)
app.js         (1155 lines — all JavaScript)
plan.md        (this file)
```
