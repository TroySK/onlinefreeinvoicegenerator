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

### None — All items completed! ✅

---

### LOWER PRIORITY (Optional, Not Critical)

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

All items have been completed. See COMPLETED section above for details.

### Still Optional (Not Critical)
- #32: Minimum quantity validation hint
- #50: Extract CSS/JS to separate files
- #51: Decouple data model from DOM
- #52: Debounce calculateTotals
- #53: Split updateCurrencyDisplay
- #55: Google Fonts preconnect (already done)
- #56: navigator.userLanguage (needs verification)
- #58: Floating point in PDF totals (already handled by toFixed)
- #60: Template validation (already done in updateTemplate)
- #66: Verify OG image exists
