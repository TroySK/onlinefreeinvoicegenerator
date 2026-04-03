# Improvement Plan — Online Free Invoice Generator

---

## COMPLETED ✅

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

### P2 — Product Features (Partial)
- ✅ #21: Clear/reset button
- ✅ #22: Due date field
- ✅ #23: PO number field
- ✅ #24: Notes/payment terms section
- ✅ #28: Intl.NumberFormat for currency
- ✅ #29: Keyboard shortcut Ctrl+S
- ✅ #31: Confirmation before clearing

### P3 — UI Polish (Partial)
- ✅ #36: Hover states on inputs
- ✅ #37: Error state transition
- ✅ #38: Disabled state on buttons
- ✅ #39: Focus-visible for keyboard navigation
- ✅ #40: Mobile table alignment (45% padding)
- ✅ #41: Word-break for addresses
- ✅ #42: Template selector scroll on small screens
- ✅ #44: Color contrast fixed for WCAG AA
- ✅ #45: prefers-reduced-motion
- ✅ #46: aria-hidden on template SVGs
- ✅ #47: Skip-to-content link

### SEO
- ✅ #62: Favicon link
- ✅ #63: theme-color meta
- ✅ #64: robots meta

---

## REMAINING — NOT YET IMPLEMENTED

### P2 — Product Features

### #25: Logo Upload
- **File:** `index.html` — sender info section
- **Problem:** Professional invoices include a company logo.
- **Fix:** Add an optional file upload input for logo (image, max 2MB). Convert to base64 data URL. Store in `invoiceData`. Embed in PDF using `doc.addImage()`. Show small preview thumbnail in the form.

### #26: Duplicate/Clone Invoice
- **File:** `index.html` — action bar
- **Problem:** Users creating recurring invoices must re-enter everything.
- **Fix:** Add a "Duplicate" button that keeps all line items and sender info but clears recipient info, generates a new invoice number, and resets the date.

### #27: Share/Email Invoice Feature
- **File:** `index.html` — action bar
- **Problem:** Only download is available. No way to send directly.
- **Fix:** Add a "Send via Email" button. Use Web Share API if available (`navigator.share`), fallback to `mailto:` link with invoice number and amount in body.

### #30: Tab Order Management in Line Items Table
- **File:** `index.html` — line items table
- **Problem:** Tabbing between rows is not intuitive. After filling the last field in a row, Tab should move to the next row's first field (or create a new row).
- **Fix:** Add custom tab handling: on Tab from the last field in a row, focus the first field of the next row. If no next row exists, call `addItem()` and focus the new row's first field.

### #33: Auto-Formatting for Currency Inputs
- **File:** `index.html` — rate, discount, and amount inputs
- **Problem:** Users type raw numbers. No visual formatting.
- **Fix:** On blur, auto-format currency inputs (e.g., `1000` → `1,000.00`). On focus, revert to raw number for easy editing. Use `Intl.NumberFormat` for formatting.

---

### P3 — UI Polish

### #34: Template Switching Barely Changes the UI
- **File:** `index.html` — CSS template classes
- **Problem:** The three templates only change table header colors and font families. The visual difference is minimal — users won't perceive value.
- **Fix:** Make templates more distinct:
  - **Modern:** Minimal, lots of whitespace, accent color bars, rounded corners
  - **Classic:** Serif font, bordered sections, traditional layout, sharp corners
  - **Professional:** Bold header block, colored sidebar, structured grid, blue accents

### #35: Template Preview SVGs Are Tiny and Low-Fidelity
- **File:** `index.html` — template option SVGs
- **Problem:** SVGs are 100x140px and don't accurately represent the actual PDF output.
- **Fix:** Increase size to 120x168px. Add more detail to accurately reflect each template's actual layout (header placement, color blocks, typography areas).

### #43: Hero Section Padding Could Be Tighter on Mobile
- **File:** `index.html` — `.hero` media query
- **Problem:** At 32px top padding, it's fine but could be 24px for better space utilization on small screens.
- **Fix:** Reduce `.hero` padding to `24px 0 20px` on screens < 480px.

---

### Code Quality

### #54: Google Analytics Inline Config Blocks Parsing
- **File:** `index.html` — lines ~1037-1044
- **Problem:** The gtag script is async, but the inline config script blocks parsing.
- **Fix:** Move the inline gtag config script to the end of `<body>` or add `defer` to the external script and inline config.

### #57: `lineItemsTable.rows[index]` Can Be Stale
- **File:** `index.html` — `calculateLineItemAmount()`, `attachRowListeners()`
- **Problem:** After adding/removing rows, the `index` may not match the actual DOM row index if rows are ever removed.
- **Fix:** When delete functionality is added, re-index all rows after removal. Or use `querySelector` to find the specific row by a data attribute instead of relying on index position. Currently `deleteRow()` re-renders all rows which fixes this, but `calculateLineItemAmount()` still uses `lineItemsTable.rows[index]` which could be stale if called before re-render.

### #59: Discount Displayed With Minus Sign in PDF but Not in UI
- **File:** `index.html` — `downloadPDF()` function
- **Problem:** `-${currencyDisplay}${invoiceData.discount.toFixed(2)}` shows a minus in the PDF, but the UI input shows a positive number. Inconsistent.
- **Fix:** Either show the minus in the UI too, or remove it from the PDF and label it clearly as "Discount" (the subtraction is implied by the label).

### #61: No Error Boundary for PDF Generation
- **File:** `index.html` — `downloadPDF()` try/catch
- **Problem:** The try/catch catches all errors but shows a generic toast. Different errors need different handling.
- **Fix:** Add specific error handling: check for missing jsPDF, check for empty data, check for autoTable availability. Show specific error messages for each case.

---

### SEO & Meta

### #65: No `<link rel="sitemap">`
- **File:** `index.html` — `<head>`
- **Problem:** If a sitemap exists, it's not referenced.
- **Fix:** Add `<link rel="sitemap" href="/sitemap.xml" type="application/xml">` if a sitemap is created.

### #67: Schema.org Markup Could Be Enhanced
- **File:** `index.html` — lines ~32-46
- **Problem:** Schema.org `SoftwareApplication` markup is good but could include more properties.
- **Fix:** Consider adding `aggregateRating`, `review`, `screenshot`, `featureList`, and `applicationSubCategory` for richer search results.

---

## LOWER PRIORITY (Optional)

### #32: Minimum Quantity Validation Hint
- **File:** `index.html` — line items
- **Problem:** `value < 0` check exists, but quantity of `0` is allowed, which creates meaningless line items.
- **Fix:** Show a subtle warning when quantity is 0 but don't block (user might be drafting).

### #50: Separate CSS and JS into External Files
- **File:** `index.html`
- **Problem:** All code in single file — hard to maintain, no caching.
- **Fix:** Extract `<style>` to `styles.css` and `<script>` to `app.js`.

### #51: Tight Coupling Between Data Model and DOM
- **File:** `index.html` — all event listeners
- **Problem:** `invoiceData` is manually synced with DOM on every input event.
- **Fix:** Implement a lightweight reactive pattern: `syncFromDOM()` / `syncToDOM()`.

### #52: `calculateTotals()` Debounce
- **File:** `index.html` — input event listeners
- **Problem:** Every input triggers recalculation.
- **Fix:** Add debounce (~100ms) to `calculateTotals()`.

### #53: Split `updateCurrencyDisplay()`
- **File:** `index.html` — `updateCurrencyDisplay()`
- **Problem:** Iterates all line items on every call, even when only discount changes.
- **Fix:** Split into `updateTotalsDisplay()` and `updateLineItemCurrency()`.

### #55: Google Fonts Preconnect
- **File:** `index.html` — lines ~49-51
- **Status:** Already well-configured with `display=swap`.

### #56: `navigator.userLanguage` Deprecated
- **File:** `index.html` — `init()` function
- **Status:** Needs verification — check if still present.

### #58: Floating Point in PDF Totals
- **File:** `index.html` — `downloadPDF()`
- **Problem:** PDF totals use `.toFixed(2)` but underlying values may have floating point errors.
- **Fix:** Ensure all values in `invoiceData` are rounded at the source.

### #60: `invoiceData.template` Never Validated
- **File:** `index.html` — `updateTemplate()`
- **Problem:** Template could become out of sync if HTML radio buttons change unexpectedly.
- **Fix:** Add validation in `updateTemplate()`.

### #66: OG Image URL May Not Exist
- **File:** `index.html` — line ~19
- **Problem:** `onlinefreeinvoicegenerator.jpg` — verify this file exists and is properly sized.

---

## Priority Execution Order (Remaining Items)

1. #25: Logo upload
2. #26: Duplicate invoice
3. #27: Share/email invoice
4. #30: Tab order management
5. #33: Auto-format currency inputs
6. #34: Make templates visually distinct
7. #35: Improve template preview SVGs
8. #43: Tighten hero padding on mobile
9. #54: Move GA script
10. #57: Fix stale row index
11. #59: Fix discount minus sign consistency
12. #61: Add error boundary for PDF
13. #65: Add sitemap link
14. #67: Enhance schema.org markup
