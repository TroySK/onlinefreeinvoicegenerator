# Improvement Plan — Online Free Invoice Generator

---

## P0 — Critical Bugs (Fix Immediately)

### 1. Tax Calculation Logic Is Incorrect (Tax-Inclusive vs Tax-Exclusive)
- **File:** `index.html` — `calculateLineItemAmount()` function, line ~1762
- **Problem:** Line amount is calculated as `qty * rate * (1 + tax/100)` (tax-inclusive), but subtotal is calculated as `qty * rate` (tax-exclusive). This means line item amounts don't sum to the subtotal. Critical business logic bug.
- **Fix:** Change line amount to `qty * rate` (tax-exclusive). Tax should be calculated separately per line and summed in the totals. Update PDF generation to match.

### 2. Dead Code — `setupEventListeners()` Never Called
- **File:** `index.html` — ~lines 1498-1606
- **Problem:** Entire function is defined but never called. References `templateSelect` which is `null` (no `#template-select` element exists). Also calls `applyTemplate()` which is never defined.
- **Fix:** Delete the entire `setupEventListeners()` function.

### 3. Dead Code — `setDefaultCurrency()` Never Called
- **File:** `index.html` — ~lines 1479-1496
- **Problem:** Function is defined but never called. Duplicates logic already in `init()`.
- **Fix:** Delete the entire `setDefaultCurrency()` function.

### 4. No Delete/Remove Line Item Button
- **File:** `index.html` — line items table
- **Problem:** Once a row is added it cannot be removed.
- **Fix:** Add a delete button (trash icon) to each row. Keep the first row non-deletable (or allow delete but always maintain at least one row). Update `invoiceData.lineItems` array, re-render DOM, and recalculate totals on removal.

### 5. `templateSelect` Is Null Reference
- **File:** `index.html` — line ~1277
- **Problem:** `document.getElementById('template-select')` returns `null` because the HTML uses radio buttons, not a select element. Only used in dead `setupEventListeners()`, but still a bug.
- **Fix:** Remove the variable declaration entirely when deleting dead code.

### 6. `applyTemplate()` Called But Never Defined
- **File:** `index.html` — line ~1502 inside dead `setupEventListeners()`
- **Problem:** References a function that doesn't exist. The actual function is `updateTemplate()`.
- **Fix:** Delete when removing dead code.

---

## P1 — High Impact

### 7. No Data Persistence (localStorage for Invoice Data)
- **File:** `index.html` — `init()` function, all event listeners
- **Problem:** All form data is lost on page refresh. `localStorage` is only used for theme preference.
- **Fix:** On every input change, save `invoiceData` to `localStorage`. On `init()`, check for saved data and restore all fields. Add a "Clear & Start Fresh" button that clears localStorage and resets the form.

### 8. Discount Can Make Grand Total Negative
- **File:** `index.html` — `calculateTotals()` function, line ~1792
- **Problem:** `grandTotal = subtotal + totalTax - discount` has no cap. Discount can exceed subtotal + tax, resulting in negative grand total.
- **Fix:** Clamp discount: `const effectiveDiscount = Math.min(discount, subtotal + totalTax)`. Use effectiveDiscount in grand total calculation. Show a warning UI if discount is capped.

### 9. Floating Point Precision Issues
- **File:** `index.html` — `calculateTotals()`, `calculateLineItemAmount()`
- **Problem:** `reduce` with floating point arithmetic produces results like `100.00000000000001`.
- **Fix:** Use `parseFloat((sum + ...).toFixed(2))` on all intermediate sum results in `reduce` callbacks.

### 10. CDN Scripts Missing SRI Hashes
- **File:** `index.html` — lines 26-27
- **Problem:** jsPDF and autoTable loaded from CDN without `integrity` or `crossorigin` attributes. Security risk — if CDN is compromised, malicious code executes.
- **Fix:** Add `integrity` and `crossorigin="anonymous"` attributes. Look up current SRI hashes for:
  - `jspdf/2.5.1/jspdf.umd.min.js`
  - `jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js`

### 11. Replace `alert()` for Validation Errors
- **File:** `index.html` — `downloadPDF()` function, line ~1829
- **Problem:** `alert("Please fix validation errors before downloading the PDF.")` is jarring, unprofessional, and blocks the UI.
- **Fix:** Add an inline toast/banner at the top of the form that appears when validation fails on download. Auto-dismiss after 5 seconds. Style with danger color and close button.

### 12. No Loading/Success State on Download Button
- **File:** `index.html` — `downloadPDF()` function
- **Problem:** No visual feedback during or after PDF generation. User doesn't know if anything happened.
- **Fix:** On click: disable button, show spinner text ("Generating..."). On success: show "Downloaded!" confirmation for 2 seconds, then revert. On error: show error state with message.

### 13. Missing Accessibility — `aria-describedby` on Inputs
- **File:** `index.html` — all form inputs with error divs
- **Problem:** Error divs exist but are not linked to inputs via `aria-describedby`. Screen readers won't announce errors.
- **Fix:** Add `aria-describedby="sender-name-error"` (etc.) to all inputs that have corresponding error divs.

### 14. Missing Accessibility — `aria-live` Region for Dynamic Errors
- **File:** `index.html` — error message containers
- **Problem:** Error messages appear/disappear without screen reader notification.
- **Fix:** Wrap the error message area in `aria-live="polite"` or add `aria-live="polite"` to each error div.

### 15. Missing Accessibility — `scope="col"` on Table Headers
- **File:** `index.html` — line items table `<th>` elements, lines ~1049-1055
- **Problem:** Table headers have no `scope` attribute.
- **Fix:** Add `scope="col"` to all `<th>` elements in the line items table.

### 16. Missing Accessibility — Template Preview SVGs Need `role="img"`
- **File:** `index.html` — template option SVGs, lines ~1111, 1126, 1141
- **Problem:** SVGs have `aria-label` but missing `role="img"` for better screen reader support.
- **Fix:** Add `role="img"` to all template preview SVGs.

### 17. `doc.lastAutoTable` May Be Undefined
- **File:** `index.html` — `downloadPDF()` function, line ~1942
- **Problem:** `doc.lastAutoTable.finalY` accessed without null check. If autoTable plugin fails or returns undefined, this throws a TypeError.
- **Fix:** Add optional chaining and fallback: `const finalY = doc.lastAutoTable?.finalY || adjustedTableStartY + 40;`

### 18. Negative Discount via Programmatic Input
- **File:** `index.html` — discount input event listener, line ~1407
- **Problem:** `min="0"` is only enforced by browser's native number input UI. `parseFloat(e.target.value)` allows negative values if set programmatically or pasted.
- **Fix:** Clamp: `invoiceData.discount = Math.max(0, parseFloat(e.target.value) || 0);`

### 19. No Validation on Empty Line Items Before Download
- **File:** `index.html` — `downloadPDF()` function
- **Problem:** If all line items have quantity 0 and rate 0, the PDF still generates with an empty table.
- **Fix:** Add validation: check that at least one line item has a non-zero amount before generating PDF. Show error if none do.

### 20. Silent Failure on PDF Generation Error
- **File:** `index.html` — `downloadPDF()` function, lines ~1981-1983
- **Problem:** If jsPDF fails to load (CDN down), the error is cryptic. No check for library availability before attempting download.
- **Fix:** Add check at start of `downloadPDF()`: `if (!window.jspdf) { show error "PDF library not loaded. Please refresh the page."; return; }`

---

## P2 — Product Features

### 21. No "Clear/Reset" Button
- **File:** `index.html` — action bar
- **Problem:** Users cannot quickly start over without manually clearing every field.
- **Fix:** Add a "Clear Form" button next to the download button. Show a confirmation dialog before clearing. Clear localStorage and reset all fields to defaults.

### 22. No Due Date Field
- **File:** `index.html` — invoice metadata section, lines ~988-991
- **Problem:** Only invoice date exists. Professional invoices need a due date.
- **Fix:** Add a "Due Date" date input next to the "Date" field in the meta row. Add to `invoiceData` model. Include in PDF output. Default to 30 days from invoice date.

### 23. No PO Number Field
- **File:** `index.html` — invoice metadata section
- **Problem:** Common business requirement missing.
- **Fix:** Add an optional "PO Number" text input in the meta row. Add to `invoiceData` model. Include in PDF output if filled.

### 24. No Notes / Payment Terms Section
- **File:** `index.html` — bottom of invoice card
- **Problem:** Invoices typically have payment terms, bank details, or notes at the bottom.
- **Fix:** Add a textarea labeled "Notes / Payment Terms" below the totals section. Add to `invoiceData` model. Include in PDF output.

### 25. No Logo Upload
- **File:** `index.html` — sender info section
- **Problem:** Professional invoices include a company logo.
- **Fix:** Add an optional file upload input for logo (image, max 2MB). Convert to base64 data URL. Store in `invoiceData`. Embed in PDF using `doc.addImage()`. Show small preview thumbnail in the form.

### 26. No Duplicate/Clone Invoice
- **File:** `index.html` — action bar
- **Problem:** Users creating recurring invoices must re-enter everything.
- **Fix:** Add a "Duplicate" button that keeps all line items and sender info but clears recipient info, generates a new invoice number, and resets the date.

### 27. No Share/Email Invoice Feature
- **File:** `index.html` — action bar
- **Problem:** Only download is available. No way to send directly.
- **Fix:** Add a "Send via Email" button. Use Web Share API if available (`navigator.share`), fallback to `mailto:` link with invoice number and amount in body.

### 28. Currency Symbols Are Inconsistent
- **File:** `index.html` — `currencySymbols` object, lines ~1218-1249
- **Problem:** Some currencies use symbols (`$`, `€`, `£`), others use codes (`CAD `, `AUD `). This is inconsistent and unprofessional.
- **Fix:** Use `Intl.NumberFormat` for proper locale-aware currency formatting. Replace the `currencySymbols` object with a function that uses `new Intl.NumberFormat('en', { style: 'currency', currency: code }).format(0)` to get the correct prefix.

### 29. No Keyboard Shortcut for Download
- **File:** `index.html` — event listeners
- **Problem:** Power users would benefit from `Ctrl/Cmd+S` or `Ctrl/Cmd+Enter` to download.
- **Fix:** Add a `keydown` listener on `document` for `Ctrl+S` / `Cmd+S`. Call `downloadPDF()` and `e.preventDefault()` to block browser save dialog.

### 30. No Tab Order Management in Line Items Table
- **File:** `index.html` — line items table
- **Problem:** Tabbing between rows is not intuitive. After filling the last field in a row, Tab should move to the next row's first field (or create a new row).
- **Fix:** Add custom tab handling: on Tab from the last field in a row, focus the first field of the next row. If no next row exists, call `addItem()` and focus the new row's first field.

### 31. No Confirmation Before Clearing
- **File:** `index.html` — reset/clear button (when added)
- **Problem:** Accidental clicks could wipe all data.
- **Fix:** Show a confirmation modal or use `confirm()` before clearing. If localStorage persistence is implemented, offer "Save as draft first?" option.

### 32. No Minimum Quantity Validation
- **File:** `index.html` — line ~1442
- **Problem:** `value < 0` check exists, but quantity of `0` is allowed, which creates meaningless line items.
- **Fix:** Consider requiring quantity >= 1 for valid line items. Show a subtle warning when quantity is 0 but don't block (user might be drafting).

### 33. No Auto-Formatting for Currency Inputs
- **File:** `index.html` — rate, discount, and amount inputs
- **Problem:** Users type raw numbers. No visual formatting.
- **Fix:** On blur, auto-format currency inputs (e.g., `1000` → `1,000.00`). On focus, revert to raw number for easy editing. Use `Intl.NumberFormat` for formatting.

---

## P3 — UI Polish

### 34. Template Switching Barely Changes the UI
- **File:** `index.html` — CSS template classes, lines ~688-706
- **Problem:** The three templates only change table header colors and font families. The visual difference is minimal — users won't perceive value.
- **Fix:** Make templates more distinct:
  - **Modern:** Minimal, lots of whitespace, accent color bars, rounded corners
  - **Classic:** Serif font, bordered sections, traditional layout, sharp corners
  - **Professional:** Bold header block, colored sidebar, structured grid, blue accents

### 35. Template Preview SVGs Are Tiny and Low-Fidelity
- **File:** `index.html` — template option SVGs, lines ~1111-1152
- **Problem:** SVGs are 100x140px and don't accurately represent the actual PDF output.
- **Fix:** Increase size to 120x168px. Add more detail to accurately reflect each template's actual layout (header placement, color blocks, typography areas).

### 36. No Hover/Active States on Form Inputs
- **File:** `index.html` — `.form-group input`, `.form-group textarea`, `.form-group select`, lines ~297-322
- **Problem:** Only `:focus` states are defined. No visual feedback on hover.
- **Fix:** Add `:hover` state with subtle border color change: `border-color: var(--text-muted)`. Add `:active` state with slight scale or shadow change.

### 37. No Transition on Error State
- **File:** `index.html` — `.invalid` class, lines ~326-332
- **Problem:** The `.invalid` class has no transition, causing jarring color changes.
- **Fix:** Add `transition: border-color 0.15s ease, box-shadow 0.15s ease` to inputs. Add smooth transition on `.invalid` state.

### 38. Download Button Has No Disabled State Styling
- **File:** `index.html` — `#download-btn`
- **Problem:** Should visually indicate when form is incomplete or during processing.
- **Fix:** Add `.btn:disabled` styles: `opacity: 0.6; cursor: not-allowed; transform: none;`. Consider dynamically enabling/disabling based on required field completion.

### 39. No Focus-Visible Outline for Keyboard Navigation
- **File:** `index.html` — CSS `:focus` rules throughout
- **Problem:** `outline: none` with box-shadow is applied on all `:focus`, including mouse clicks. Focus rings show on mouse clicks which looks messy.
- **Fix:** Change `:focus` to `:focus-visible` for buttons, links, and interactive elements. Keep `:focus` for inputs only (since users always type into them).

### 40. Mobile Table Card Layout Has Alignment Issues
- **File:** `index.html` — responsive table CSS, lines ~772-825
- **Problem:** The `td:before` pseudo-element uses `content: attr(data-label)` but the 40% left padding may not be enough for longer labels like "Description" on narrow screens.
- **Fix:** Increase left padding to 45% on screens < 600px. Or switch to a stacked label-above-input layout for mobile.

### 41. No Responsive Handling for Very Long Addresses
- **File:** `index.html` — form grid
- **Problem:** Long sender/recipient addresses can overflow the form grid on mobile.
- **Fix:** Add `word-break: break-word` and `overflow-wrap: break-word` to textarea and input elements.

### 42. Template Selector Doesn't Scroll on Small Screens
- **File:** `index.html` — `.template-options`, lines ~586-630
- **Problem:** Three template options side-by-side may overflow on screens between 480-768px.
- **Fix:** Add `overflow-x: auto` with `scroll-snap-type: x mandatory` for horizontal scrolling. Or stack them vertically on screens < 600px with `flex-direction: column`.

### 43. Hero Section Padding Could Be Tighter on Mobile
- **File:** `index.html` — `.hero` media query, line ~717
- **Problem:** At 32px top padding, it's fine but could be 24px for better space utilization on small screens.
- **Fix:** Reduce `.hero` padding to `24px 0 20px` on screens < 480px.

### 44. Color Contrast May Fail WCAG AA
- **File:** `index.html` — dark theme CSS variables
- **Problem:** Dark theme uses `--text-muted: #64748b` on `--bg-page: #0f172a`. This is approximately 4.6:1, which passes for large text but is borderline for small text (needs 4.5:1 minimum).
- **Fix:** Adjust `--text-muted` in dark theme to `#7c8ba1` (~5.2:1) to safely pass WCAG AA for all text sizes. Verify all color combinations with a contrast checker.

### 45. No `prefers-reduced-motion` Support
- **File:** `index.html` — CSS transitions throughout (lines ~195, 308, 488, etc.)
- **Problem:** Transitions and transforms are used throughout but there's no `@media (prefers-reduced-motion: reduce)` to disable animations for users who prefer it.
- **Fix:** Add at the end of CSS:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

### 46. Missing `for` Attribute Association on Template Labels
- **File:** `index.html` — template option labels, lines ~595-628
- **Problem:** Template option labels wrap SVGs without `aria-hidden="true"` on the SVGs inside labels. Screen readers may read SVG content redundantly.
- **Fix:** Add `aria-hidden="true"` to all SVGs inside template option labels (they already have `aria-label` on the parent or input).

### 47. No Skip-to-Content Link
- **File:** `index.html` — top of `<body>`
- **Problem:** Keyboard users must tab through the navbar to reach the form.
- **Fix:** Add a "Skip to main content" link as the first element in `<body>` that links to `#main-content`. Style it to be visible only on focus.

---

## Code Quality

### 48. No Module Pattern or IIFE
- **File:** `index.html` — `<script>` block
- **Problem:** All variables and functions are in the global scope. Can conflict with other scripts.
- **Fix:** Wrap everything in an IIFE: `(function() { ... })()` or use ES modules.

### 49. Magic Numbers in PDF Generation
- **File:** `index.html` — `downloadPDF()` function, lines ~1864, 1871, 1876, 1885, etc.
- **Problem:** PDF layout uses hardcoded pixel values (20, 35, 70, 80, 120, 140, 190). Hard to maintain and adjust.
- **Fix:** Extract into a `PDF_LAYOUT` config object:
  ```js
  const PDF_LAYOUT = {
    margin: 20,
    titleY: 20,
    infoY: 35,
    senderX: 20,
    recipientX: 120,
    labelX: 140,
    valueX: 190,
    lineHeight: 10
  };
  ```

### 50. No Separation of Concerns
- **File:** `index.html`
- **Problem:** All JS (~800 lines), CSS (~800 lines), and HTML are in a single file. No caching, hard to maintain.
- **Fix:** Extract `<style>` to `styles.css` and `<script>` to `app.js`. Link them in `<head>` and before `</body>`. Improves caching, readability, and enables tooling.

### 51. Tight Coupling Between Data Model and DOM
- **File:** `index.html` — all event listeners
- **Problem:** `invoiceData` is manually synced with DOM on every input event. Error-prone and hard to maintain.
- **Fix:** Implement a lightweight reactive pattern: `syncFromDOM()` to read all fields into model, `syncToDOM()` to write model to all fields. Call on input/change events.

### 52. `calculateTotals()` Called on Every Keystroke
- **File:** `index.html` — input event listeners, lines ~1406-1409, ~1778
- **Problem:** Every input in discount and line items triggers a full recalculation and DOM update. For many line items, this could cause jank.
- **Fix:** Add a simple debounce (~100ms) to `calculateTotals()` calls. Or use `requestAnimationFrame` to batch updates.

### 53. `updateCurrencyDisplay()` Iterates All Line Items Unnecessarily
- **File:** `index.html` — `updateCurrencyDisplay()`, lines ~1812-1817
- **Problem:** This runs on every calculation. The loop to update line item amounts is redundant when only the discount changes.
- **Fix:** Split into two functions: `updateTotalsDisplay()` (subtotal, tax, grand total) and `updateLineItemCurrency()`. Only call the latter when currency changes.

### 54. Google Analytics Inline Config Blocks Parsing
- **File:** `index.html` — lines ~873-880
- **Problem:** The gtag script is async, but the inline config script blocks parsing.
- **Fix:** Move the inline gtag config script to the end of `<body>` or add `defer` to the external script and inline config.

### 55. Google Fonts Loaded Without Preconnect Optimization
- **File:** `index.html` — lines ~46-48
- **Problem:** `preconnect` and `preconnect` to `fonts.gstatic.com` are present, which is good. But consider adding `&display=swap` to the font URL (already present).
- **Fix:** Already well-configured. Consider adding `font-display: swap` in CSS `@font-face` as a fallback.

### 56. `navigator.userLanguage` Is Deprecated
- **File:** `index.html` — `init()` function, line ~1295
- **Problem:** `navigator.userLanguage` is IE-only and deprecated.
- **Fix:** Remove it. Use only `navigator.language`.

### 57. `lineItemsTable.rows[index]` Can Be Stale
- **File:** `index.html` — `calculateLineItemAmount()`, line ~1769
- **Problem:** After adding/removing rows, the `index` may not match the actual DOM row index if rows are ever removed.
- **Fix:** When delete functionality is added, re-index all rows after removal. Or use `querySelector` to find the specific row by a data attribute instead of relying on index position.

### 58. Floating Point in PDF Totals
- **File:** `index.html` — `downloadPDF()`, lines ~1953-1973
- **Problem:** PDF totals use `invoiceData.subtotal.toFixed(2)` etc., but the underlying values may have floating point errors if not properly rounded in `calculateTotals()`.
- **Fix:** Ensure all values in `invoiceData` are rounded to 2 decimal places at the source (in `calculateTotals()` and `calculateLineItemAmount()`).

### 59. Discount Displayed With Minus Sign in PDF but Not in UI
- **File:** `index.html` — `downloadPDF()`, line ~1964
- **Problem:** `-${currencyDisplay}${invoiceData.discount.toFixed(2)}` shows a minus in the PDF, but the UI input shows a positive number. Inconsistent.
- **Fix:** Either show the minus in the UI too, or remove it from the PDF and label it clearly as "Discount" (the subtraction is implied by the label).

### 60. `invoiceData.template` Is Set But Never Validated
- **File:** `index.html` — line ~1292
- **Problem:** `invoiceData.template = 'modern1'` is set, but if the HTML radio buttons change unexpectedly, the data model could become out of sync.
- **Fix:** Add validation in `updateTemplate()`: check that `invoiceData.template` is one of the valid template IDs before applying.

### 61. No Error Boundary for PDF Generation
- **File:** `index.html` — `downloadPDF()` try/catch
- **Problem:** The try/catch catches all errors but shows a generic alert. Different errors need different handling.
- **Fix:** Add specific error handling: check for missing jsPDF, check for empty data, check for autoTable availability. Show specific error messages for each case.

---

## SEO & Meta

### 62. No `<link rel="icon">` or Favicon Reference
- **File:** `index.html` — `<head>`
- **Problem:** No explicit favicon link tag.
- **Fix:** Add `<link rel="icon" href="/favicon.ico" type="image/x-icon">`. The file exists at root but should be explicitly referenced.

### 63. No `<meta name="theme-color">`
- **File:** `index.html` — `<head>`
- **Problem:** Mobile browser chrome doesn't match the app's theme.
- **Fix:** Add `<meta name="theme-color" content="#0f172a">` for dark mode. Update dynamically via JS when theme toggles: `document.querySelector('meta[name="theme-color"]').content = isDark ? '#0f172a' : '#6366f1';`

### 64. No `<meta name="robots">` Tag
- **File:** `index.html` — `<head>`
- **Problem:** No explicit robots directive.
- **Fix:** Add `<meta name="robots" content="index, follow">` to explicitly allow indexing.

### 65. No `<link rel="sitemap">`
- **File:** `index.html` — `<head>`
- **Problem:** If a sitemap exists, it's not referenced.
- **Fix:** Add `<link rel="sitemap" href="/sitemap.xml" type="application/xml">` if a sitemap is created.

### 66. OG Image URL May Not Exist
- **File:** `index.html` — line ~16
- **Problem:** `onlinefreeinvoicegenerator.jpg` — verify this file exists at the root and is properly sized (1200x630 recommended for OG).
- **Fix:** Verify file exists. If not, create a proper OG image. Consider adding `og:image:width` and `og:image:height` meta tags.

### 67. Schema.org Markup Could Be Enhanced
- **File:** `index.html` — lines ~29-44
- **Problem:** Schema.org `SoftwareApplication` markup is good but could include more properties.
- **Fix:** Consider adding `aggregateRating`, `review`, `screenshot`, `featureList`, and `applicationSubCategory` for richer search results.

---

## Priority Execution Order

### Phase 1 — Critical Fixes (P0)
1. Fix tax calculation (#1)
2. Remove dead code (#2, #3, #5, #6)
3. Add delete row button (#4)

### Phase 2 — Core UX & Bugs (P1)
4. Add localStorage persistence (#7)
5. Fix discount cap (#8, #18)
6. Fix floating point precision (#9, #58)
7. Add SRI hashes to CDN (#10)
8. Replace alert() with toast (#11)
9. Add loading/success state (#12)
10. Fix accessibility (#13, #14, #15, #16, #47)
11. Fix lastAutoTable null check (#17)
12. Add empty line items validation (#19)
13. Add library availability check (#20)

### Phase 3 — Product Features (P2)
14. Add due date (#22)
15. Add notes/terms section (#24)
16. Add PO number (#23)
17. Add clear/reset button (#21, #31)
18. Add keyboard shortcut (#29)
19. Fix currency formatting with Intl (#28)
20. Add tab order management (#30)
21. Add minimum quantity hint (#32)
22. Add auto-formatting for currency (#33)
23. Add duplicate invoice (#26)
24. Add share/email (#27)
25. Add logo upload (#25)

### Phase 4 — UI Polish (P3)
26. Add prefers-reduced-motion (#45)
27. Add hover states on inputs (#36)
28. Add focus-visible (#39)
29. Fix template selector overflow (#42)
30. Add favicon and theme-color meta (#62, #63)
31. Fix mobile table alignment (#40)
32. Fix long address overflow (#41)
33. Improve templates (#34)
34. Improve SVG previews (#35)
35. Fix color contrast (#44)
36. Add disabled state to download button (#38)
37. Add error state transition (#37)
38. Tighten hero padding on mobile (#43)

### Phase 5 — Code Quality
39. Wrap in IIFE (#48)
40. Extract magic numbers (#49)
41. Debounce calculateTotals (#52)
42. Split updateCurrencyDisplay (#53)
43. Fix navigator.userLanguage (#56)
44. Fix stale row index (#57)
45. Add error boundary (#61)
46. Validate template (#60)
47. Decouple data model from DOM (#51)
48. Move GA script (#54)

### Phase 6 — SEO
49. Add robots meta (#64)
50. Add sitemap link (#65)
51. Verify OG image (#66)
52. Enhance schema.org (#67)

### Phase 7 — Optional (Lower Priority)
53. Extract CSS/JS to separate files (#50)
54. Add font-display fallback (#55)
