        // Invoice data model
        const invoiceData = {
            invoiceNumber: "INV-0001",
            date: new Date().toISOString().split('T')[0],
            dueDate: "",
            currency: "USD",
            taxDetail: "",
            poNumber: "",
            notes: "",
            logo: "",
            sender: {
                name: "",
                address: "",
                email: ""
            },
            recipient: {
                name: "",
                address: "",
                email: ""
            },
            lineItems: [
                {
                    description: "",
                    quantity: 0,
                    rate: 0.0,
                    tax: 0.0,
                    amount: 0.0,
                    taxAmount: 0.0
                }
            ],
            subtotal: 0.0,
            totalTax: 0.0,
            discount: 0.0,
            grandTotal: 0.0
        };

        // Validation errors
        const validationErrors = {
            sender: {
                name: "",
                address: "",
                email: ""
            },
            recipient: {
                name: "",
                address: "",
                email: ""
            },
            invoiceNumber: "",
            date: ""
        };

        // Currency display using Intl.NumberFormat
        function getCurrencyDisplay(currencyCode) {
            try {
                var parts = new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).formatToParts(0);
                for (var i = 0; i < parts.length; i++) {
                    if (parts[i].type === 'currency') {
                        return parts[i].value + ' ';
                    }
                }
            } catch (e) {
                // Fallback to currency code
            }
            return currencyCode + ' ';
        }

        // LocalStorage persistence
        const STORAGE_KEY = "invoice_data";

        function saveInvoiceData() {
            try {
                const data = {
                    invoiceNumber: invoiceData.invoiceNumber,
                    date: invoiceData.date,
                    dueDate: invoiceData.dueDate,
                    currency: invoiceData.currency,
                    taxDetail: invoiceData.taxDetail,
                    poNumber: invoiceData.poNumber,
                    notes: invoiceData.notes,
                    logo: invoiceData.logo,
                    sender: { ...invoiceData.sender },
                    recipient: { ...invoiceData.recipient },
                    lineItems: invoiceData.lineItems.map(function(item) {
                        return { ...item };
                    }),
                    discount: invoiceData.discount,
                    template: invoiceData.template
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            } catch (e) {
                // Silently fail if localStorage is unavailable
            }
        }

        function loadInvoiceData() {
            try {
                var saved = localStorage.getItem(STORAGE_KEY);
                if (!saved) return false;

                var data = JSON.parse(saved);
                if (data.invoiceNumber) invoiceData.invoiceNumber = data.invoiceNumber;
                if (data.date) invoiceData.date = data.date;
                if (data.dueDate) invoiceData.dueDate = data.dueDate;
                if (data.currency) invoiceData.currency = data.currency;
                if (data.taxDetail) invoiceData.taxDetail = data.taxDetail;
                if (data.poNumber) invoiceData.poNumber = data.poNumber;
                if (data.notes) invoiceData.notes = data.notes;
                if (data.logo) invoiceData.logo = data.logo;
                if (data.sender) Object.assign(invoiceData.sender, data.sender);
                if (data.recipient) Object.assign(invoiceData.recipient, data.recipient);
                if (data.lineItems && data.lineItems.length > 0) {
                    invoiceData.lineItems = data.lineItems;
                }
                if (typeof data.discount === "number") invoiceData.discount = data.discount;
                if (data.template) invoiceData.template = data.template;
                return true;
            } catch (e) {
                return false;
            }
        }

        // Template configurations
        const templates = [
            {
                templateId: "modern1",
                name: "Modern Minimal",
                primaryColor: "#4f46e5",
                cssOverrides: "",
                layoutConfig: { showTaxColumn: true, discountPosition: "belowTotal" }
            },
            {
                templateId: "classic",
                name: "Classic Business",
                primaryColor: "#1f2937",
                cssOverrides: "",
                layoutConfig: { showTaxColumn: true, discountPosition: "belowTotal" }
            },
            {
                templateId: "business",
                name: "Professional",
                primaryColor: "#2563eb",
                cssOverrides: "",
                layoutConfig: { showTaxColumn: true, discountPosition: "belowTotal" }
            }
        ];

        // DOM Elements
        const currencySelect = document.getElementById('currency-select');
        const invoiceContainer = document.getElementById('invoice-container');
        const addItemBtn = document.getElementById('add-item-btn');
        const downloadBtn = document.getElementById('download-btn');
        const lineItemsTable = document.getElementById('line-items').getElementsByTagName('tbody')[0];

        // Sync data model from DOM (reads all form values into invoiceData)
        function syncFromDOM() {
            invoiceData.sender.name = document.getElementById('sender-name').value;
            invoiceData.sender.address = document.getElementById('sender-address').value;
            invoiceData.sender.email = document.getElementById('sender-email').value;
            invoiceData.recipient.name = document.getElementById('recipient-name').value;
            invoiceData.recipient.address = document.getElementById('recipient-address').value;
            invoiceData.recipient.email = document.getElementById('recipient-email').value;
            invoiceData.invoiceNumber = document.getElementById('invoice-number').value;
            invoiceData.date = document.getElementById('invoice-date').value;
            invoiceData.dueDate = document.getElementById('due-date').value;
            invoiceData.poNumber = document.getElementById('po-number').value;
            invoiceData.currency = document.getElementById('currency-select').value;
            invoiceData.taxDetail = document.getElementById('tax-detail').value;
            invoiceData.notes = document.getElementById('notes').value;
            invoiceData.discount = Math.max(0, parseFloat(document.getElementById('discount').value) || 0);

            // Read line items from DOM
            var rows = lineItemsTable.rows;
            invoiceData.lineItems = [];
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                invoiceData.lineItems.push({
                    description: row.querySelector('.item-description').value,
                    quantity: parseFloat(row.querySelector('.item-quantity').value) || 0,
                    rate: parseFloat(row.querySelector('.item-rate').value) || 0,
                    tax: parseFloat(row.querySelector('.item-tax').value) || 0,
                    amount: 0,
                    taxAmount: 0
                });
            }

            // Read template selection
            var checkedRadio = document.querySelector('input[name="template"]:checked');
            if (checkedRadio) {
                invoiceData.template = checkedRadio.value;
            }
        }

        // Sync DOM from data model (writes invoiceData to all form values)
        function syncToDOM() {
            document.getElementById('sender-name').value = invoiceData.sender.name || '';
            document.getElementById('sender-address').value = invoiceData.sender.address || '';
            document.getElementById('sender-email').value = invoiceData.sender.email || '';
            document.getElementById('recipient-name').value = invoiceData.recipient.name || '';
            document.getElementById('recipient-address').value = invoiceData.recipient.address || '';
            document.getElementById('recipient-email').value = invoiceData.recipient.email || '';
            document.getElementById('invoice-number').value = invoiceData.invoiceNumber || '';
            document.getElementById('invoice-date').value = invoiceData.date || '';
            document.getElementById('due-date').value = invoiceData.dueDate || '';
            document.getElementById('po-number').value = invoiceData.poNumber || '';
            document.getElementById('currency-select').value = invoiceData.currency || 'USD';
            document.getElementById('tax-detail').value = invoiceData.taxDetail || '';
            document.getElementById('notes').value = invoiceData.notes || '';
            document.getElementById('discount').value = invoiceData.discount || '';

            // Restore logo
            if (invoiceData.logo) {
                document.getElementById('logo-placeholder').style.display = 'none';
                document.getElementById('logo-preview').style.display = 'flex';
                document.getElementById('logo-preview-img').src = invoiceData.logo;
            }

            // Restore line items
            while (lineItemsTable.rows.length > 0) {
                lineItemsTable.deleteRow(0);
            }

            invoiceData.lineItems.forEach(function(item, i) {
                var row = lineItemsTable.insertRow();
                row.innerHTML =
                    '<td data-label="Description"><textarea class="item-description" placeholder="Item description">' + item.description + '</textarea></td>' +
                    '<td data-label="Quantity"><input type="number" class="item-quantity" placeholder="0" min="0" step="1" value="' + (item.quantity || '') + '"></td>' +
                    '<td data-label="Rate"><input type="number" class="item-rate" placeholder="0.00" min="0" step="0.01" value="' + (item.rate || '') + '"></td>' +
                    '<td data-label="Tax (%)" class="tax-cell">' +
                        '<input type="number" class="item-tax" placeholder="0" min="0" max="100" step="0.1" value="' + (item.tax || '') + '">' +
                        '<div class="tax-amount" id="tax-amount-' + i + '"></div>' +
                    '</td>' +
                    '<td data-label="Amount" class="item-amount">' + item.amount.toFixed(2) + '</td>' +
                    '<td data-label="Actions" class="actions-col">' +
                        '<button type="button" class="delete-row-btn" aria-label="Remove line item">' +
                            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                                '<polyline points="3 6 5 6 21 6"></polyline>' +
                                '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
                            '</svg>' +
                        '</button>' +
                    '</td>';
                attachRowListeners(row, i);
            });
            updateDeleteButtons();

            // Restore template selection
            var radios = document.querySelectorAll('input[name="template"]');
            radios.forEach(function(r) {
                r.checked = (r.value === invoiceData.template);
            });

            updateCurrencyDisplay();
        }

        // Initialize the app
        function init() {
            // Try to load saved data first
            var hasSavedData = loadInvoiceData();

            // Set today's date as default (only if no saved data)
            if (!hasSavedData) {
                var today = new Date().toISOString().split('T')[0];
                invoiceData.date = today;
            }

            // Set default template
            invoiceData.template = 'modern1';

            // Set default currency based on user's browser language
            var userLanguage = navigator.language || 'en-US';
            const languageToCurrencyMap = {
                'en-US': 'USD',
                'en-GB': 'GBP',
                'en-AU': 'AUD',
                'en-CA': 'CAD',
                'en-IN': 'INR',
                'en-SG': 'SGD',
                'en-NZ': 'NZD',
                'en-ZA': 'ZAR',
                'de': 'EUR',
                'de-DE': 'EUR',
                'de-CH': 'CHF',
                'fr': 'EUR',
                'fr-FR': 'EUR',
                'fr-CH': 'CHF',
                'es': 'EUR',
                'es-ES': 'EUR',
                'es-MX': 'MXN',
                'es-AR': 'ARS',
                'es-CL': 'CLP',
                'es-CO': 'COP',
                'es-PE': 'PEN',
                'es-UY': 'UYU',
                'it': 'EUR',
                'it-IT': 'EUR',
                'it-CH': 'CHF',
                'pt': 'EUR',
                'pt-PT': 'EUR',
                'pt-BR': 'BRL',
                'nl': 'EUR',
                'nl-NL': 'EUR',
                'ja': 'JPY',
                'ja-JP': 'JPY',
                'zh': 'CNY',
                'zh-CN': 'CNY',
                'zh-HK': 'HKD',
                'hi': 'INR',
                'hi-IN': 'INR',
                'sv': 'SEK',
                'sv-SE': 'SEK',
                'no': 'NOK',
                'nb': 'NOK',
                'nn': 'NOK',
                'da': 'DKK',
                'da-DK': 'DKK',
                'ru': 'RUB',
                'ru-RU': 'RUB',
                'ko': 'KRW',
                'ko-KR': 'KRW',
                'tr': 'TRY',
                'tr-TR': 'TRY',
                'ar': 'AED',
                'ar-AE': 'AED',
                'ar-SA': 'SAR',
                'he': 'ILS',
                'he-IL': 'ILS',
                'ar-EG': 'EGP'
            };
            
            // Try to get currency from language map, fallback to USD
            const defaultCurrency = languageToCurrencyMap[userLanguage] || languageToCurrencyMap[userLanguage.split('-')[0]] || 'USD';
            document.getElementById('currency-select').value = defaultCurrency;
            invoiceData.currency = defaultCurrency;

            // Restore saved data into DOM
            syncToDOM();

            // Use syncFromDOM on all form input changes, then save
            var formContainer = document.getElementById('invoice-container');
            formContainer.addEventListener('input', function(e) {
                syncFromDOM();
                // Run validation for relevant fields
                if (e.target.id === 'sender-name') validateField('sender', 'name', e.target.value);
                else if (e.target.id === 'sender-address') validateField('sender', 'address', e.target.value);
                else if (e.target.id === 'sender-email') validateField('sender', 'email', e.target.value);
                else if (e.target.id === 'recipient-name') validateField('recipient', 'name', e.target.value);
                else if (e.target.id === 'recipient-address') validateField('recipient', 'address', e.target.value);
                else if (e.target.id === 'recipient-email') validateField('recipient', 'email', e.target.value);
                else if (e.target.id === 'invoice-number') validateField('invoiceNumber', null, e.target.value);
                else if (e.target.id === 'invoice-date') validateField('date', null, e.target.value);
                saveInvoiceData();
            });

            formContainer.addEventListener('change', function(e) {
                if (e.target.id === 'currency-select') {
                    syncFromDOM();
                    updateLineItemCurrency();
                    saveInvoiceData();
                }
            });

            // Discount auto-format
            var discountInput = document.getElementById('discount');
            discountInput.addEventListener('blur', function(e) {
                var val = parseFloat(e.target.value);
                if (!isNaN(val) && val > 0) {
                    e.target.value = val.toFixed(2);
                }
            });
            discountInput.addEventListener('focus', function(e) {
                var val = parseFloat(e.target.value);
                if (!isNaN(val)) {
                    e.target.value = val;
                }
            });

            // Rate auto-format (delegated)
            formContainer.addEventListener('blur', function(e) {
                if (e.target.classList.contains('item-rate')) {
                    var val = parseFloat(e.target.value);
                    if (!isNaN(val) && val > 0) {
                        e.target.value = val.toFixed(2);
                    }
                }
            }, true);
            formContainer.addEventListener('focus', function(e) {
                if (e.target.classList.contains('item-rate')) {
                    var val = parseFloat(e.target.value);
                    if (!isNaN(val)) {
                        e.target.value = val;
                    }
                }
            }, true);

            // Logo upload
            var logoInput = document.getElementById('logo-input');
            var logoPlaceholder = document.getElementById('logo-placeholder');
            var logoPreview = document.getElementById('logo-preview');
            var logoPreviewImg = document.getElementById('logo-preview-img');
            var logoRemoveBtn = document.getElementById('logo-remove-btn');

            logoInput.addEventListener('change', function(e) {
                var file = e.target.files[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                    showToast('Logo must be under 2MB.', 'error');
                    return;
                }
                if (!file.type.match(/^image\/(png|jpeg|gif|webp)$/)) {
                    showToast('Only PNG, JPG, GIF, and WebP images are allowed.', 'error');
                    return;
                }
                var reader = new FileReader();
                reader.onload = function(event) {
                    invoiceData.logo = event.target.result;
                    logoPlaceholder.style.display = 'none';
                    logoPreview.style.display = 'flex';
                    logoPreviewImg.src = event.target.result;
                    saveInvoiceData();
                };
                reader.readAsDataURL(file);
            });

            logoRemoveBtn.addEventListener('click', function() {
                invoiceData.logo = '';
                logoInput.value = '';
                logoPlaceholder.style.display = 'flex';
                logoPreview.style.display = 'none';
                logoPreviewImg.src = '';
                saveInvoiceData();
            });

            document.getElementById('add-item-btn').addEventListener('click', addItem);
            document.getElementById('download-btn').addEventListener('click', downloadPDF);

            document.getElementById('clear-btn').addEventListener('click', function() {
                if (confirm('Clear all fields and start over? This cannot be undone.')) {
                    localStorage.removeItem(STORAGE_KEY);
                    location.reload();
                }
            });

            document.getElementById('duplicate-btn').addEventListener('click', function() {
                var today = new Date().toISOString().split('T')[0];
                invoiceData.invoiceNumber = 'INV-' + Date.now().toString().slice(-6);
                invoiceData.date = today;
                invoiceData.dueDate = '';
                invoiceData.poNumber = '';
                invoiceData.notes = '';
                invoiceData.recipient = { name: '', address: '', email: '' };
                invoiceData.subtotal = 0;
                invoiceData.totalTax = 0;
                invoiceData.discount = 0;
                invoiceData.grandTotal = 0;

                syncToDOM();

                ['recipient-name', 'recipient-email', 'invoice-number'].forEach(function(id) {
                    var el = document.getElementById(id);
                    el.classList.remove('invalid');
                    el.removeAttribute('aria-describedby');
                    el.removeAttribute('aria-invalid');
                });
                ['recipient-name-error', 'recipient-email-error', 'invoice-number-error'].forEach(function(id) {
                    var el = document.getElementById(id);
                    if (el) el.textContent = '';
                });

                saveInvoiceData();
                showToast('Invoice duplicated. Update recipient and download.', 'success');
            });

            document.getElementById('share-btn').addEventListener('click', function() {
                var subject = 'Invoice ' + invoiceData.invoiceNumber;
                var body = 'Please find invoice ' + invoiceData.invoiceNumber + ' dated ' + invoiceData.date + '.\n\n';
                body += 'Amount Due: ' + getCurrencyDisplay(invoiceData.currency) + invoiceData.grandTotal.toFixed(2) + '\n\n';
                if (invoiceData.sender.name) body += 'From: ' + invoiceData.sender.name + '\n';
                if (invoiceData.recipient.name) body += 'To: ' + invoiceData.recipient.name + '\n';

                if (navigator.share) {
                    navigator.share({
                        title: subject,
                        text: body
                    }).catch(function() {});
                } else {
                    var mailtoLink = 'mailto:' + encodeURIComponent(invoiceData.recipient.email || '') +
                        '?subject=' + encodeURIComponent(subject) +
                        '&body=' + encodeURIComponent(body);
                    window.location.href = mailtoLink;
                }
            });
            
            // Add template selection event listeners
            document.querySelectorAll('input[name="template"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        invoiceData.template = e.target.value;
                        updateTemplate();
                        saveInvoiceData();
                    }
                });
            });
            
            // Add event listeners to the first row
            attachRowListeners(lineItemsTable.rows[0], 0);
            
            // Initialize with one line item
            calculateLineItemAmount(0);
            
            // Apply initial template
            updateTemplate();
        }

        // Validate a field
        function validateField(section, field, value) {
            let isValid = true;
            let errorMessage = "";
            
            if (section === 'sender' || section === 'recipient') {
                if (field === 'name' && !value.trim()) {
                    isValid = false;
                    errorMessage = "Name is required.";
                } else if (field === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                    errorMessage = "Please enter a valid email address.";
                }
                validationErrors[section][field] = errorMessage;
                updateErrorDisplay(`${section}-${field}-error`, errorMessage, `${section}-${field}`);
            } else if (section === 'invoiceNumber') {
                if (!value.trim()) {
                    isValid = false;
                    errorMessage = "Invoice number is required.";
                }
                validationErrors.invoiceNumber = errorMessage;
                updateErrorDisplay('invoice-number-error', errorMessage, 'invoice-number');
            } else if (section === 'date') {
                if (!value) {
                    isValid = false;
                    errorMessage = "Date is required.";
                }
                validationErrors.date = errorMessage;
                updateErrorDisplay('invoice-date-error', errorMessage, 'invoice-date');
            }
            
            return isValid;
        }

        // Update error display
        function updateErrorDisplay(errorElementId, errorMessage, inputElementId) {
            var errorElement = document.getElementById(errorElementId);
            var inputElement = document.getElementById(inputElementId);

            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.setAttribute('aria-live', 'polite');
            }

            if (inputElement) {
                if (errorMessage) {
                    inputElement.classList.add('invalid');
                    inputElement.setAttribute('aria-describedby', errorElementId);
                    inputElement.setAttribute('aria-invalid', 'true');
                } else {
                    inputElement.classList.remove('invalid');
                    inputElement.removeAttribute('aria-describedby');
                    inputElement.removeAttribute('aria-invalid');
                }
            }
        }

        // Update template
        function updateTemplate() {
            var validTemplates = ['modern1', 'classic', 'business'];
            if (validTemplates.indexOf(invoiceData.template) === -1) {
                invoiceData.template = 'modern1';
            }

            // Remove all template classes
            invoiceContainer.classList.remove('template-modern1', 'template-classic', 'template-business');
            
            // Add the selected template class
            invoiceContainer.classList.add(`template-${invoiceData.template}`);
            
            // Update table header styles
            const tableHeaders = document.querySelectorAll('.line-items th');
            tableHeaders.forEach(th => {
                // Remove all template classes
                th.classList.remove('template-modern1', 'template-classic', 'template-business');
                // Add the selected template class
                th.classList.add(`template-${invoiceData.template}`);
            });
            
            // Update add item button styles
            const addItemBtn = document.getElementById('add-item-btn');
            // Remove all template classes
            addItemBtn.classList.remove('template-modern1', 'template-classic', 'template-business');
            // Add the selected template class
            addItemBtn.classList.add(`template-${invoiceData.template}`);
            
            // Update line items table styles
            const lineItemsTable = document.getElementById('line-items');
            // Remove all template classes
            lineItemsTable.classList.remove('template-modern1', 'template-classic', 'template-business');
            // Add the selected template class
            lineItemsTable.classList.add(`template-${invoiceData.template}`);
        }

        // Add a new line item
        function addItem() {
            const newRow = lineItemsTable.insertRow();
            
            const index = invoiceData.lineItems.length;
            
            newRow.innerHTML = `
                <td data-label="Description"><textarea class="item-description" placeholder="Item description"></textarea></td>
                <td data-label="Quantity"><input type="number" class="item-quantity" placeholder="0" min="0" step="1"></td>
                <td data-label="Rate"><input type="number" class="item-rate" placeholder="0.00" min="0" step="0.01"></td>
                <td data-label="Tax (%)" class="tax-cell">
                    <input type="number" class="item-tax" placeholder="0" min="0" max="100" step="0.1">
                    <div class="tax-amount" id="tax-amount-${index}"></div>
                </td>
                <td data-label="Amount" class="item-amount">0.00</td>
                <td data-label="Actions" class="actions-col">
                    <button type="button" class="delete-row-btn" aria-label="Remove line item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </td>
            `;
            
            // Add event listeners to the new row
            const descriptionInput = newRow.querySelector('.item-description');
            const quantityInput = newRow.querySelector('.item-quantity');
            const rateInput = newRow.querySelector('.item-rate');
            const taxInput = newRow.querySelector('.item-tax');
            const deleteBtn = newRow.querySelector('.delete-row-btn');
            
            // Add to invoice data
            invoiceData.lineItems.push({
                description: "",
                quantity: 0,
                rate: 0.0,
                tax: 0.0,
                amount: 0.0,
                taxAmount: 0.0
            });

            attachRowListeners(newRow, index);
            updateDeleteButtons();
            saveInvoiceData();
        }

        // Delete a line item row
        function deleteRow(index) {
            if (invoiceData.lineItems.length <= 1) return;

            invoiceData.lineItems.splice(index, 1);
            lineItemsTable.deleteRow(index);

            // Re-render all rows to fix indices
            while (lineItemsTable.rows.length > 0) {
                lineItemsTable.deleteRow(0);
            }

            invoiceData.lineItems.forEach((item, i) => {
                const row = lineItemsTable.insertRow();
                row.innerHTML = `
                    <td data-label="Description"><textarea class="item-description" placeholder="Item description">${item.description}</textarea></td>
                    <td data-label="Quantity"><input type="number" class="item-quantity" placeholder="0" min="0" step="1" value="${item.quantity || ''}"></td>
                    <td data-label="Rate"><input type="number" class="item-rate" placeholder="0.00" min="0" step="0.01" value="${item.rate || ''}"></td>
                    <td data-label="Tax (%)" class="tax-cell">
                        <input type="number" class="item-tax" placeholder="0" min="0" max="100" step="0.1" value="${item.tax || ''}">
                        <div class="tax-amount" id="tax-amount-${i}"></div>
                    </td>
                    <td data-label="Amount" class="item-amount">${item.amount.toFixed(2)}</td>
                    <td data-label="Actions" class="actions-col">
                        <button type="button" class="delete-row-btn" aria-label="Remove line item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </td>
                `;

                attachRowListeners(row, i);
            });

            updateDeleteButtons();
            calculateTotals();
        }

        // Attach event listeners to a row
        function attachRowListeners(row, index) {
            const descriptionInput = row.querySelector('.item-description');
            const quantityInput = row.querySelector('.item-quantity');
            const rateInput = row.querySelector('.item-rate');
            const taxInput = row.querySelector('.item-tax');
            const deleteBtn = row.querySelector('.delete-row-btn');

            descriptionInput.addEventListener('input', (e) => {
                invoiceData.lineItems[index].description = e.target.value;
                saveInvoiceData();
            });

            quantityInput.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value) || 0;
                invoiceData.lineItems[index].quantity = value;
                if (value < 0) {
                    e.target.classList.add('invalid');
                    e.target.classList.remove('zero-hint');
                } else if (value === 0) {
                    e.target.classList.remove('invalid');
                    e.target.classList.add('zero-hint');
                } else {
                    e.target.classList.remove('invalid');
                    e.target.classList.remove('zero-hint');
                }
                calculateLineItemAmount(index);
            });

            quantityInput.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && !e.shiftKey) {
                    e.preventDefault();
                    row.querySelector('.item-rate').focus();
                }
            });

            rateInput.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value) || 0;
                invoiceData.lineItems[index].rate = value;
                if (value < 0) {
                    e.target.classList.add('invalid');
                } else {
                    e.target.classList.remove('invalid');
                }
                calculateLineItemAmount(index);
            });

            rateInput.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && !e.shiftKey) {
                    e.preventDefault();
                    row.querySelector('.item-tax').focus();
                }
            });

            rateInput.addEventListener('blur', (e) => {
                var val = parseFloat(e.target.value);
                if (!isNaN(val) && val > 0) {
                    e.target.value = val.toFixed(2);
                }
            });

            rateInput.addEventListener('focus', (e) => {
                var val = parseFloat(e.target.value);
                if (!isNaN(val)) {
                    e.target.value = val;
                }
            });

            taxInput.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value) || 0;
                invoiceData.lineItems[index].tax = Math.max(0, Math.min(100, value));
                if (value < 0 || value > 100) {
                    e.target.classList.add('invalid');
                } else {
                    e.target.classList.remove('invalid');
                }
                calculateLineItemAmount(index);
            });

            // Tab order: from tax input, move to next row or create new row
            taxInput.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && !e.shiftKey) {
                    e.preventDefault();
                    if (index < lineItemsTable.rows.length - 1) {
                        var nextRow = lineItemsTable.rows[index + 1];
                        nextRow.querySelector('.item-description').focus();
                    } else {
                        addItem();
                        setTimeout(function() {
                            var newRow = lineItemsTable.rows[lineItemsTable.rows.length - 1];
                            newRow.querySelector('.item-description').focus();
                        }, 10);
                    }
                }
            });

            deleteBtn.addEventListener('click', () => {
                deleteRow(index);
                saveInvoiceData();
            });
        }

        // Update delete button disabled states
        function updateDeleteButtons() {
            const buttons = lineItemsTable.querySelectorAll('.delete-row-btn');
            buttons.forEach(btn => {
                btn.disabled = invoiceData.lineItems.length <= 1;
            });
        }

        // Calculate line item amount
        function calculateLineItemAmount(index) {
            const item = invoiceData.lineItems[index];
            const amount = item.quantity * item.rate;
            const taxAmount = item.quantity * item.rate * item.tax / 100;
            
            item.amount = parseFloat(amount.toFixed(2));
            item.taxAmount = parseFloat(taxAmount.toFixed(2));
            
            // Update UI
            const amountCell = lineItemsTable.rows[index].cells[4];
            amountCell.textContent = item.amount.toFixed(2);
            
            // Update tax amount display
            const taxAmountElement = document.getElementById(`tax-amount-${index}`);
            if (taxAmountElement) {
                taxAmountElement.textContent = `(${item.taxAmount.toFixed(2)})`;
            }
            
            calculateTotals();
        }

        // Calculate invoice totals (internal, non-debounced)
        function _calculateTotals() {
            // Calculate subtotal with proper rounding
            invoiceData.subtotal = parseFloat(
                invoiceData.lineItems.reduce(function(sum, item) {
                    return sum + parseFloat((item.quantity * item.rate).toFixed(2));
                }, 0).toFixed(2)
            );

            // Calculate total tax with proper rounding
            invoiceData.totalTax = parseFloat(
                invoiceData.lineItems.reduce(function(sum, item) {
                    return sum + parseFloat((item.quantity * item.rate * item.tax / 100).toFixed(2));
                }, 0).toFixed(2)
            );

            // Clamp discount to prevent negative grand total
            invoiceData.discount = Math.max(0, invoiceData.discount);
            var maxDiscount = invoiceData.subtotal + invoiceData.totalTax;
            if (invoiceData.discount > maxDiscount) {
                invoiceData.discount = maxDiscount;
                document.getElementById('discount').value = maxDiscount.toFixed(2);
            }

            // Calculate grand total (never negative)
            invoiceData.grandTotal = parseFloat(
                Math.max(0, invoiceData.subtotal + invoiceData.totalTax - invoiceData.discount).toFixed(2)
            );

            // Update UI
            updateCurrencyDisplay();
            saveInvoiceData();
        }

        // Debounced calculateTotals
        var calcTimeout;
        function calculateTotals() {
            clearTimeout(calcTimeout);
            calcTimeout = setTimeout(_calculateTotals, 100);
        }

        // Update totals display (called on every calculation)
        function updateTotalsDisplay() {
            var currencyDisplay = getCurrencyDisplay(invoiceData.currency);
            document.getElementById('subtotal').textContent = currencyDisplay + invoiceData.subtotal.toFixed(2);
            document.getElementById('total-tax').textContent = currencyDisplay + invoiceData.totalTax.toFixed(2);
            document.getElementById('grand-total').textContent = currencyDisplay + invoiceData.grandTotal.toFixed(2);
        }

        // Update line item currency display (only called when currency changes)
        function updateLineItemCurrency() {
            var currencyDisplay = getCurrencyDisplay(invoiceData.currency);
            for (var i = 0; i < invoiceData.lineItems.length; i++) {
                var amountCell = lineItemsTable.rows[i].cells[4];
                if (amountCell) {
                    amountCell.textContent = currencyDisplay + invoiceData.lineItems[i].amount.toFixed(2);
                }
            }
            updateTotalsDisplay();
        }

        // Update currency display (alias for totals — called by calculateTotals)
        function updateCurrencyDisplay() {
            updateTotalsDisplay();
        }

        // Toast notification
        function showToast(message, type) {
            var existing = document.getElementById('toast');
            if (existing) existing.remove();

            var toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast toast-' + type;
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'polite');
            toast.innerHTML = '<span>' + message + '</span><button class="toast-close" aria-label="Dismiss">&times;</button>';
            document.body.appendChild(toast);

            toast.querySelector('.toast-close').addEventListener('click', function() {
                toast.classList.remove('show');
                setTimeout(function() { toast.remove(); }, 300);
            });

            requestAnimationFrame(function() {
                toast.classList.add('show');
            });

            setTimeout(function() {
                toast.classList.remove('show');
                setTimeout(function() { toast.remove(); }, 300);
            }, 5000);
        }

        // Download PDF
        function downloadPDF() {
            // Check if PDF library is loaded
            if (!window.jspdf) {
                showToast("PDF library not loaded. Please refresh the page.", "error");
                return;
            }

            // Validate all required fields before generating PDF
            var isSenderValid = validateField('sender', 'name', invoiceData.sender.name);
            var isRecipientValid = validateField('recipient', 'name', invoiceData.recipient.name);
            var isInvoiceNumberValid = validateField('invoiceNumber', null, invoiceData.invoiceNumber);
            var isDateValid = validateField('date', null, invoiceData.date);

            // Check that at least one line item has a value
            var hasValidLineItem = invoiceData.lineItems.some(function(item) {
                return (item.quantity * item.rate) > 0;
            });

            if (!isSenderValid || !isRecipientValid || !isInvoiceNumberValid || !isDateValid) {
                showToast("Please fix validation errors before downloading.", "error");
                return;
            }

            if (!hasValidLineItem) {
                showToast("Please add at least one line item with a quantity and rate.", "error");
                return;
            }

            // Show loading state
            var originalBtnHTML = downloadBtn.innerHTML;
            downloadBtn.disabled = true;
            downloadBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Generating...';

            // Add spinner animation if not already present
            if (!document.getElementById('spinner-style')) {
                var style = document.createElement('style');
                style.id = 'spinner-style';
                style.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
                document.head.appendChild(style);
            }

            try {
                var jsPDF = window.jspdf.jsPDF;
                var doc = new jsPDF();

                var currentTemplate = invoiceData.template;
                var template = templates.find(function(t) { return t.templateId === currentTemplate; });
                var primaryColor = template ? template.primaryColor : "#4f46e5";

                var hexToRgb = function(hex) {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? [
                        parseInt(result[1], 16),
                        parseInt(result[2], 16),
                        parseInt(result[3], 16)
                    ] : [79, 70, 229];
                };

                var headerColor = hexToRgb(primaryColor);
                var currencyDisplay = getCurrencyDisplay(invoiceData.currency);

                doc.setFont("helvetica");
                doc.setFontSize(12);

                // Add logo if present
                var logoOffset = 0;
                if (invoiceData.logo) {
                    try {
                        doc.addImage(invoiceData.logo, 'PNG', 20, 15, 40, 20);
                        logoOffset = 25;
                    } catch (e) {
                        // If image format fails, skip logo
                    }
                }

                doc.setFontSize(22);
                doc.setTextColor.apply(doc, headerColor);
                doc.text("INVOICE", 20 + logoOffset, 20);

                doc.setTextColor(0, 0, 0);
                doc.setFontSize(12);
                doc.text("Invoice Number: " + invoiceData.invoiceNumber, 20, 35);

                var dateText = "Date: " + invoiceData.date;
                var dateWidth = doc.getTextWidth(dateText);
                doc.text(dateText, 190 - dateWidth, 35);

                var infoY = 45;
                if (invoiceData.dueDate) {
                    doc.text("Due Date: " + invoiceData.dueDate, 20, infoY);
                    infoY += 10;
                }

                if (invoiceData.poNumber.trim()) {
                    doc.text("PO Number: " + invoiceData.poNumber, 20, infoY);
                    infoY += 10;
                }

                if (invoiceData.taxDetail.trim()) {
                    doc.text("Tax Detail: " + invoiceData.taxDetail, 20, infoY);
                    infoY += 10;
                }

                doc.setFontSize(14);
                doc.setTextColor.apply(doc, headerColor);
                doc.text("From:", 20, infoY + 10);
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(12);
                doc.text(invoiceData.sender.name, 20, infoY + 20);
                var senderAddressLines = doc.splitTextToSize(invoiceData.sender.address, 80);
                doc.text(senderAddressLines, 20, infoY + 30);
                var senderAddressHeight = senderAddressLines.length * 5;
                doc.text(invoiceData.sender.email, 20, infoY + 30 + senderAddressHeight);

                doc.setFontSize(14);
                doc.setTextColor.apply(doc, headerColor);
                doc.text("To:", 120, infoY + 10);
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(12);
                doc.text(invoiceData.recipient.name, 120, infoY + 20);
                var recipientAddressLines = doc.splitTextToSize(invoiceData.recipient.address, 80);
                doc.text(recipientAddressLines, 120, infoY + 30);
                var recipientAddressHeight = recipientAddressLines.length * 5;
                doc.text(invoiceData.recipient.email, 120, infoY + 30 + recipientAddressHeight);

                var tableStartY = Math.max(110, infoY + 40 + Math.max(senderAddressHeight, recipientAddressHeight));
                var adjustedTableStartY = tableStartY + 10;

                var headers = [["Description", "Quantity", "Rate", "Tax %", "Amount"]];
                var rows = invoiceData.lineItems.map(function(item) {
                    return [
                        item.description,
                        item.quantity,
                        currencyDisplay + item.rate.toFixed(2),
                        item.tax,
                        currencyDisplay + item.amount.toFixed(2)
                    ];
                });

                doc.autoTable({
                    head: headers,
                    body: rows,
                    startY: adjustedTableStartY,
                    theme: 'grid',
                    headStyles: {
                        fillColor: headerColor,
                        textColor: [255, 255, 255]
                    },
                    styles: {
                        cellPadding: 3,
                        fontSize: 10
                    }
                });

                var finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) || adjustedTableStartY + 40;
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(12);

                var labelX = 140;
                var valueX = 190;
                var lineHeight = 10;

                doc.text('Subtotal:', labelX, finalY + lineHeight);
                var subtotalText = currencyDisplay + invoiceData.subtotal.toFixed(2);
                doc.text(subtotalText, valueX - doc.getTextWidth(subtotalText), finalY + lineHeight);

                doc.text('Total Tax:', labelX, finalY + (lineHeight * 2));
                var taxText = currencyDisplay + invoiceData.totalTax.toFixed(2);
                doc.text(taxText, valueX - doc.getTextWidth(taxText), finalY + (lineHeight * 2));

                doc.text('Discount:', labelX, finalY + (lineHeight * 3));
                var discountText = currencyDisplay + invoiceData.discount.toFixed(2);
                doc.text(discountText, valueX - doc.getTextWidth(discountText), finalY + (lineHeight * 3));

                doc.setFontSize(14);
                doc.setTextColor.apply(doc, headerColor);
                doc.text('Grand Total:', labelX, finalY + (lineHeight * 4));
                var grandTotalText = currencyDisplay + invoiceData.grandTotal.toFixed(2);
                doc.text(grandTotalText, valueX - doc.getTextWidth(grandTotalText), finalY + (lineHeight * 4));

                if (invoiceData.notes.trim()) {
                    var notesY = finalY + (lineHeight * 5) + 10;
                    doc.setFontSize(10);
                    doc.setTextColor(100, 100, 100);
                    doc.text("Notes / Terms:", 20, notesY);
                    doc.setFontSize(9);
                    var notesLines = doc.splitTextToSize(invoiceData.notes, 170);
                    doc.text(notesLines, 20, notesY + 6);
                }

                doc.save("invoice-" + invoiceData.invoiceNumber + ".pdf");

                // Show success state
                downloadBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="20 6 9 17 4 12"></polyline></svg> Downloaded!';
                showToast("Invoice downloaded successfully!", "success");

                setTimeout(function() {
                    downloadBtn.disabled = false;
                    downloadBtn.innerHTML = originalBtnHTML;
                }, 2000);
            } catch (error) {
                console.error("Error generating PDF:", error);
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = originalBtnHTML;

                var errorMsg = "Error generating PDF.";
                if (error.message && error.message.includes("autoTable")) {
                    errorMsg = "Table plugin not loaded. Please refresh and try again.";
                } else if (error.message && error.message.includes("jsPDF")) {
                    errorMsg = "PDF library error. Please refresh the page.";
                } else if (invoiceData.sender.name && invoiceData.recipient.name) {
                    errorMsg = "Error generating PDF. Please check your inputs and try again.";
                }
                showToast(errorMsg, "error");
            }
        }

        // Initialize the app when the DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);

            document.getElementById('theme-toggle').addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            });

            init();

            // Keyboard shortcut: Ctrl+S / Cmd+S to download
            document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    downloadPDF();
                }
            });
        });
