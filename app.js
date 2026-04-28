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
    discountType: "flat",
    grandTotal: 0.0,
    status: "",
    paymentDetails: {
        bank: "",
        paypal: "",
        link: ""
    }
};

// Multi-language translations
const translations = {
    en: {
        billingDetails: "Billing Details", senderName: "Your Name", senderAddress: "Your Address", senderEmail: "Your Email",
        clientName: "Client Name", clientAddress: "Client Address", clientEmail: "Client Email",
        invoiceDetails: "Invoice Details", invoiceNumber: "Invoice Number", date: "Date", dueDate: "Due Date",
        poNumber: "PO Number", currency: "Currency", taxDetail: "Tax Detail", status: "Status",
        unpaid: "Unpaid", paid: "Paid", overdue: "Overdue",
        lineItems: "Line Items", description: "Description", quantity: "Quantity", rate: "Rate", tax: "Tax (%)", amount: "Amount",
        addLineItem: "Add Line Item", subtotal: "Subtotal", totalTax: "Total Tax", discount: "Discount", grandTotal: "Grand Total",
        notesTerms: "Notes & Terms", notesPlaceholder: "Payment is due within 30 days. Thank you for your business!",
        companyLogo: "Company Logo (optional)", logoUpload: "Click to upload logo (PNG, JPG, GIF, WebP — max 2MB)",
        chooseTemplate: "Choose Template", modern: "Modern", classic: "Classic", professional: "Professional",
        downloadPdf: "Download PDF", clear: "Clear", duplicate: "Duplicate", share: "Share", saveInvoice: "Save Invoice",
        paymentDetails: "Payment Details (optional)", bankName: "Bank Name / Account", paypalLabel: "PayPal", paymentLink: "Payment Link (Stripe, etc.)",
        termsReceipt: "Upon Receipt", termsNet7: "Net 7", termsNet14: "Net 14", termsNet15: "Net 15", termsNet30: "Net 30",
        termsNet45: "Net 45", termsNet60: "Net 60", termsNet90: "Net 90",
        invoice: "INVOICE", from: "From:", to: "To:", notesLabel: "Notes / Terms:", paymentDetailsLabel: "Payment Details:",
        bank: "Bank:", paypal: "PayPal:", pay: "Pay:",
        invoiceNo: "Invoice Number:", dateLabel: "Date:", dueDateLabel: "Due Date:", poNumberLabel: "PO Number:", taxDetailLabel: "Tax Detail:",
        subtotalLabel: "Subtotal:", totalTaxLabel: "Total Tax:", discountLabel: "Discount:", grandTotalLabel: "Grand Total:",
        invoiceHistory: "Invoice History"
    },
    es: {
        billingDetails: "Datos de Facturación", senderName: "Tu Nombre", senderAddress: "Tu Dirección", senderEmail: "Tu Correo",
        clientName: "Nombre del Cliente", clientAddress: "Dirección del Cliente", clientEmail: "Correo del Cliente",
        invoiceDetails: "Detalles de Factura", invoiceNumber: "Número de Factura", date: "Fecha", dueDate: "Fecha de Vencimiento",
        poNumber: "Número de Orden", currency: "Moneda", taxDetail: "Detalle de Impuesto", status: "Estado",
        unpaid: "No Pagado", paid: "Pagado", overdue: "Vencido",
        lineItems: "Ítems", description: "Descripción", quantity: "Cantidad", rate: "Tarifa", tax: "Impuesto (%)", amount: "Monto",
        addLineItem: "Agregar Ítem", subtotal: "Subtotal", totalTax: "Impuesto Total", discount: "Descuento", grandTotal: "Total",
        notesTerms: "Notas y Términos", notesPlaceholder: "El pago vence en 30 días. ¡Gracias por su negocio!",
        companyLogo: "Logo de la Empresa (opcional)", logoUpload: "Haga clic para subir logo (PNG, JPG, GIF, WebP — máx 2MB)",
        chooseTemplate: "Elegir Plantilla", modern: "Moderno", classic: "Clásico", professional: "Profesional",
        downloadPdf: "Descargar PDF", clear: "Limpiar", duplicate: "Duplicar", share: "Compartir",
        paymentDetails: "Datos de Pago (opcional)", bankName: "Banco / Cuenta", paypalLabel: "PayPal", paymentLink: "Enlace de Pago (Stripe, etc.)",
        termsReceipt: "Al Recibir", termsNet7: "Neto 7", termsNet14: "Neto 14", termsNet15: "Neto 15", termsNet30: "Neto 30",
        termsNet45: "Neto 45", termsNet60: "Neto 60", termsNet90: "Neto 90",
        invoice: "FACTURA", from: "De:", to: "Para:", notesLabel: "Notas / Términos:", paymentDetailsLabel: "Datos de Pago:",
        bank: "Banco:", paypal: "PayPal:", pay: "Pagar:",
        invoiceNo: "Número de Factura:", dateLabel: "Fecha:", dueDateLabel: "Fecha de Vencimiento:", poNumberLabel: "Número de Orden:", taxDetailLabel: "Impuesto:",
        subtotalLabel: "Subtotal:", totalTaxLabel: "Impuesto Total:", discountLabel: "Descuento:", grandTotalLabel: "Total:",
        invoiceHistory: "Historial de Facturas"
    },
    fr: {
        billingDetails: "Détails de Facturation", senderName: "Votre Nom", senderAddress: "Votre Adresse", senderEmail: "Votre Email",
        clientName: "Nom du Client", clientAddress: "Adresse du Client", clientEmail: "Email du Client",
        invoiceDetails: "Détails de la Facture", invoiceNumber: "Numéro de Facture", date: "Date", dueDate: "Date d'Échéance",
        poNumber: "Numéro de Commande", currency: "Devise", taxDetail: "Détail Taxe", status: "Statut",
        unpaid: "Non Payé", paid: "Payé", overdue: "En Retard",
        lineItems: "Articles", description: "Description", quantity: "Quantité", rate: "Tarif", tax: "Taxe (%)", amount: "Montant",
        addLineItem: "Ajouter un Article", subtotal: "Sous-total", totalTax: "Taxe Totale", discount: "Remise", grandTotal: "Total",
        notesTerms: "Notes et Conditions", notesPlaceholder: "Paiement dû sous 30 jours. Merci pour votre affaire!",
        companyLogo: "Logo de l'Entreprise (optionnel)", logoUpload: "Cliquez pour télécharger le logo (PNG, JPG, GIF, WebP — max 2MB)",
        chooseTemplate: "Choisir le Modèle", modern: "Moderne", classic: "Classique", professional: "Professionnel",
        downloadPdf: "Télécharger PDF", clear: "Effacer", duplicate: "Dupliquer", share: "Partager",
        paymentDetails: "Détails de Paiement (optionnel)", bankName: "Banque / Compte", paypalLabel: "PayPal", paymentLink: "Lien de Paiement (Stripe, etc.)",
        termsReceipt: "À Réception", termsNet7: "Net 7", termsNet14: "Net 14", termsNet15: "Net 15", termsNet30: "Net 30",
        termsNet45: "Net 45", termsNet60: "Net 60", termsNet90: "Net 90",
        invoice: "FACTURE", from: "De:", to: "À:", notesLabel: "Notes / Conditions:", paymentDetailsLabel: "Détails de Paiement:",
        bank: "Banque:", paypal: "PayPal:", pay: "Payer:",
        invoiceNo: "Numéro de Facture:", dateLabel: "Date:", dueDateLabel: "Date d'Échéance:", poNumberLabel: "N° Commande:", taxDetailLabel: "Taxe:",
        subtotalLabel: "Sous-total:", totalTaxLabel: "Taxe Totale:", discountLabel: "Remise:", grandTotalLabel: "Total:",
        invoiceHistory: "Historique des Factures"
    },
    de: {
        billingDetails: "Abrechnungsdetails", senderName: "Ihr Name", senderAddress: "Ihre Adresse", senderEmail: "Ihre E-Mail",
        clientName: "Kundenname", clientAddress: "Kundenadresse", clientEmail: "Kunden-E-Mail",
        invoiceDetails: "Rechnungsdetails", invoiceNumber: "Rechnungsnummer", date: "Datum", dueDate: "Fälligkeitsdatum",
        poNumber: "Bestellnummer", currency: "Währung", taxDetail: "Steuerdetails", status: "Status",
        unpaid: "Unbezahlt", paid: "Bezahlt", overdue: "Überfällig",
        lineItems: "Positionen", description: "Beschreibung", quantity: "Menge", rate: "Preis", tax: "Steuer (%)", amount: "Betrag",
        addLineItem: "Position Hinzufügen", subtotal: "Zwischensumme", totalTax: "Gesamtsteuer", discount: "Rabatt", grandTotal: "Gesamt",
        notesTerms: "Anmerkungen & Bedingungen", notesPlaceholder: "Zahlung innerhalb von 30 Tagen fällig. Vielen Dank!",
        companyLogo: "Firmenlogo (optional)", logoUpload: "Klicken Sie, um Logo hochzuladen (PNG, JPG, GIF, WebP — max 2MB)",
        chooseTemplate: "Vorlage Wählen", modern: "Modern", classic: "Klassisch", professional: "Professionell",
        downloadPdf: "PDF Herunterladen", clear: "Löschen", duplicate: "Duplizieren", share: "Teilen",
        paymentDetails: "Zahlungsdetails (optional)", bankName: "Bank / Konto", paypalLabel: "PayPal", paymentLink: "Zahlungslink (Stripe, etc.)",
        termsReceipt: "Bei Erhalt", termsNet7: "Netto 7", termsNet14: "Netto 14", termsNet15: "Netto 15", termsNet30: "Netto 30",
        termsNet45: "Netto 45", termsNet60: "Netto 60", termsNet90: "Netto 90",
        invoice: "RECHNUNG", from: "Von:", to: "An:", notesLabel: "Anmerkungen:", paymentDetailsLabel: "Zahlungsdetails:",
        bank: "Bank:", paypal: "PayPal:", pay: "Zahlen:",
        invoiceNo: "Rechnungsnummer:", dateLabel: "Datum:", dueDateLabel: "Fälligkeitsdatum:", poNumberLabel: "Bestellnr.:", taxDetailLabel: "Steuer:",
        subtotalLabel: "Zwischensumme:", totalTaxLabel: "Gesamtsteuer:", discountLabel: "Rabatt:", grandTotalLabel: "Gesamt:",
        invoiceHistory: "Rechnungsverlauf"
    }
};

let currentLang = 'en';

// Validation errors
let isDirty = false;

// Track unsaved changes for beforeunload warning
function markDirty() {
    isDirty = true;
}

function markClean() {
    isDirty = false;
}

window.addEventListener('beforeunload', function(e) {
    if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
    }
});

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
    // Fallback for currencies with Unicode symbols that jsPDF's standard fonts don't support
    if (currencyCode === 'INR') {
        return 'Rs. ';
    }
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
// No localStorage constants needed — all persistence goes through db.js

function getNextInvoiceNumber() {
    return getMeta('invoice_counter').then(function(val) {
        var counter = parseInt(val) || 0;
        counter++;
        return setMeta('invoice_counter', counter).then(function() {
            return 'INV-' + counter.toString().padStart(6, '0');
        });
    }).catch(function() {
        return 'INV-' + Date.now().toString().slice(-6);
    });
}

function saveInvoiceData() {
    markClean();
    var data = {
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
        discountType: invoiceData.discountType,
        template: invoiceData.template,
        status: invoiceData.status,
        paymentDetails: invoiceData.paymentDetails,
        subtotal: invoiceData.subtotal,
        totalTax: invoiceData.totalTax,
        grandTotal: invoiceData.grandTotal,
        savedAt: Date.now()
    };
    return putInvoice(data).then(function() {
        var currentData = Object.assign({}, data, { invoiceNumber: 'current' });
        return putInvoice(currentData);
    }).then(function() {
        return putMetaHistoryEntry(data);
    }).then(function() {
        return updateHistoryDropdownAsync();
    }).then(function() {
        return updateSidebarListAsync();
    }).then(function() {
        showSaveIndicator();
    }).catch(function(e) {
        if (e.name === 'QuotaExceededError' || e.code === 22) {
            showToast('Storage full. Logo may not be saved. Consider using a smaller image.', 'error');
        }
    });
}

function putMetaHistoryEntry(data) {
    return getMeta('invoice_history').then(function(history) {
        if (!history) history = [];
        var existingIndex = history.findIndex(function(h) { return h.invoiceNumber === data.invoiceNumber; });
        var entry = {
            invoiceNumber: data.invoiceNumber,
            date: data.date,
            savedAt: data.savedAt,
            grandTotal: data.grandTotal || 0,
            currency: data.currency
        };
        if (existingIndex >= 0) {
            history[existingIndex] = entry;
        } else {
            history.push(entry);
        }
        if (history.length > 50) history = history.slice(-50);
        return setMeta('invoice_history', history);
    });
}

function exportBackup() {
    return getMeta('invoice_counter').then(function(counter) {
        return getAllInvoices().then(function(invoices) {
            invoices.sort(function(a, b) {
                return (a.savedAt || 0) - (b.savedAt || 0);
            });

            var backup = {
                version: '1.0',
                exportedAt: Date.now(),
                counter: counter || '0',
                invoices: invoices
            };

            var blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'invoice-backup-' + new Date().toISOString().slice(0, 10) + '.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showToast('Exported ' + invoices.length + ' invoices', 'success');
        });
    }).catch(function(e) {
        console.error('Export error:', e);
        showToast('Export failed', 'error');
    });
}

function importBackup(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        try {
            var backup = JSON.parse(e.target.result);
            if (!backup.version || !backup.invoices) {
                showToast('Invalid backup file', 'error');
                return;
            }

            var imported = 0;
            var skipped = 0;
            var promises = [];

            backup.invoices.forEach(function(invoice) {
                if (invoice.invoiceNumber) {
                    promises.push(
                        getInvoice(invoice.invoiceNumber).then(function(existing) {
                            if (existing) {
                                skipped++;
                            } else {
                                return putInvoice(invoice).then(function() {
                                    return putMetaHistoryEntry(invoice);
                                }).then(function() {
                                    imported++;
                                });
                            }
                        })
                    );
                }
            });

            Promise.all(promises).then(function() {
                if (backup.counter) {
                    return getMeta('invoice_counter').then(function(currentCounter) {
                        var newCounter = parseInt(backup.counter);
                        if (newCounter > (parseInt(currentCounter) || 0)) {
                            return setMeta('invoice_counter', backup.counter.toString());
                        }
                    });
                }
            }).then(function() {
                return updateHistoryDropdownAsync();
            }).then(function() {
                return updateSidebarListAsync();
            }).then(function() {
                showToast('Imported ' + imported + ' invoices' + (skipped > 0 ? ', ' + skipped + ' skipped' : ''), 'success');
            }).catch(function(err) {
                console.error('Import error:', err);
                showToast('Import failed', 'error');
            });

        } catch (err) {
            console.error('Import parse error:', err);
            showToast('Invalid backup format', 'error');
        }
    };
    reader.readAsText(file);
}

function updateHistoryDropdown() {
    updateHistoryDropdownAsync();
}

function updateHistoryDropdownAsync() {
    return getHistory().then(function(history) {
        var select = document.getElementById('invoice-history');
        select.innerHTML = '<option value="">-- Select saved invoice --</option>';
        history.forEach(function(item) {
            var opt = document.createElement('option');
            opt.value = item.invoiceNumber;
            opt.textContent = item.invoiceNumber + ' (' + item.date + ')';
            select.appendChild(opt);
        });
    }).catch(function() {});
}

function loadFromHistory(invoiceNumber) {
    syncFromDOM();
    saveInvoiceData().then(function() {
        return loadInvoiceData(invoiceNumber);
    }).then(function(loaded) {
        if (loaded) {
            syncToDOM();
            calculateTotals();
            showToast('Loaded invoice: ' + invoiceNumber, 'success');
        }
    });
}

var saveIndicatorTimeout;
function showSaveIndicator() {
    var el = document.getElementById('save-status');
    if (!el) return;
    clearTimeout(saveIndicatorTimeout);
    el.textContent = '\u2713 Saved';
    el.classList.add('visible', 'saved');
    saveIndicatorTimeout = setTimeout(function() {
        el.classList.remove('visible', 'saved');
    }, 2000);
}

function loadInvoiceData(invoiceNumber) {
    var key = invoiceNumber || 'current';
    return getInvoice(key).then(function(data) {
        if (!data) return false;
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
        if (data.discountType) invoiceData.discountType = data.discountType;
        if (data.template) invoiceData.template = data.template;
        if (data.status) invoiceData.status = data.status;
        if (data.paymentDetails) invoiceData.paymentDetails = data.paymentDetails;
        return true;
    }).catch(function() {
        return false;
    });
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
const deleteEmptyRowsBtn = document.getElementById('delete-empty-rows-btn');
const clearBtn = document.getElementById('clear-btn');
const duplicateBtn = document.getElementById('duplicate-btn');
const shareBtn = document.getElementById('share-btn');
const saveBtn = document.getElementById('save-btn');
const sampleBtn = document.getElementById('sample-btn');
const previewBtn = document.getElementById('preview-btn');
const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
const importFile = document.getElementById('import-file');
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
    invoiceData.discountType = document.getElementById('discount-type').value;
    invoiceData.status = document.getElementById('invoice-status').value;
    invoiceData.paymentDetails = {
        bank: document.getElementById('payment-bank').value,
        paypal: document.getElementById('payment-paypal').value,
        link: document.getElementById('payment-link').value
    };

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
    document.getElementById('discount-type').value = invoiceData.discountType || 'flat';
    document.getElementById('invoice-status').value = invoiceData.status || '';
    if (invoiceData.paymentDetails) {
        document.getElementById('payment-bank').value = invoiceData.paymentDetails.bank || '';
        document.getElementById('payment-paypal').value = invoiceData.paymentDetails.paypal || '';
        document.getElementById('payment-link').value = invoiceData.paymentDetails.link || '';
    }

    // Restore logo
    if (invoiceData.logo) {
        document.getElementById('logo-placeholder').style.display = 'none';
        document.getElementById('logo-preview').style.display = 'flex';
        document.getElementById('logo-preview-img').src = invoiceData.logo;
    }

    // Restore line items — diff and update to preserve focus
    var currentRowCount = lineItemsTable.rows.length;
    var desiredRowCount = invoiceData.lineItems.length;
    var activeEl = document.activeElement;
    var activeRow = -1;
    var activeField = null;

    // Track which element has focus
    if (activeEl && activeEl.closest && activeEl.closest('tbody') === lineItemsTable) {
        var parentRow = activeEl.closest('tr');
        if (parentRow) {
            activeRow = Array.prototype.indexOf.call(lineItemsTable.rows, parentRow);
            if (activeEl.classList.contains('item-description')) activeField = 'description';
            else if (activeEl.classList.contains('item-quantity')) activeField = 'quantity';
            else if (activeEl.classList.contains('item-rate')) activeField = 'rate';
            else if (activeEl.classList.contains('item-tax')) activeField = 'tax';
        }
    }

    // Remove extra rows
    while (lineItemsTable.rows.length > desiredRowCount) {
        lineItemsTable.deleteRow(lineItemsTable.rows.length - 1);
    }

    // Update existing rows or add new ones
    invoiceData.lineItems.forEach(function(item, i) {
        var row;
        if (i < lineItemsTable.rows.length) {
            row = lineItemsTable.rows[i];
        } else {
            row = lineItemsTable.insertRow();
            row.innerHTML =
                '<td data-label="Description"><textarea class="item-description" placeholder="Item description"></textarea></td>' +
                '<td data-label="Quantity"><input type="number" class="item-quantity" placeholder="0" min="0" step="1"></td>' +
                '<td data-label="Rate"><input type="number" class="item-rate" placeholder="0.00" min="0" step="0.01"></td>' +
                '<td data-label="Tax (%)" class="tax-cell">' +
                    '<input type="number" class="item-tax" placeholder="0" min="0" max="100" step="0.1">' +
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
        }

        // Update values only if they differ (avoid disrupting focus)
        var descEl = row.querySelector('.item-description');
        var qtyEl = row.querySelector('.item-quantity');
        var rateEl = row.querySelector('.item-rate');
        var taxEl = row.querySelector('.item-tax');
        var amountEl = row.cells[4];

        if (descEl.value !== item.description) descEl.value = item.description;
        if (qtyEl.value !== String(item.quantity || '')) qtyEl.value = item.quantity || '';
        if (rateEl.value !== String(item.rate || '')) rateEl.value = item.rate || '';
        if (taxEl.value !== String(item.tax || '')) taxEl.value = item.tax || '';
        if (amountEl.textContent !== item.amount.toFixed(2)) amountEl.textContent = item.amount.toFixed(2);

        // Update tax amount display
        var taxAmountElement = document.getElementById('tax-amount-' + i);
        if (taxAmountElement) {
            if (item.taxAmount > 0) {
                taxAmountElement.textContent = '(' + item.taxAmount.toFixed(2) + ')';
                taxAmountElement.style.display = '';
            } else {
                taxAmountElement.textContent = '';
                taxAmountElement.style.display = 'none';
            }
        }

        updateEmptyRowHint(i);
    });

    // Restore focus
    if (activeRow >= 0 && activeRow < lineItemsTable.rows.length && activeField) {
        var restoredRow = lineItemsTable.rows[activeRow];
        var fieldMap = {
            description: '.item-description',
            quantity: '.item-quantity',
            rate: '.item-rate',
            tax: '.item-tax'
        };
        var el = restoredRow.querySelector(fieldMap[activeField]);
        if (el) el.focus();
    }

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
    loadInvoiceData().then(function(hasSavedData) {
        if (!hasSavedData) {
            var today = new Date().toISOString().split('T')[0];
            invoiceData.date = today;
            return getNextInvoiceNumber().then(function(num) {
                invoiceData.invoiceNumber = num;
            });
        }
    }).then(function() {

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
    
    // Populate currency selector with grouped options
    const currencySelect = document.getElementById('currency-select');
    const currencyGroups = {
        'Americas': ['USD', 'CAD', 'MXN', 'BRL', 'ARS', 'CLP', 'COP', 'PEN', 'UYU'],
        'Europe': ['EUR', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'RUB', 'TRY', 'ILS', 'EGP'],
        'Asia': ['JPY', 'CNY', 'INR', 'SGD', 'HKD', 'KRW', 'AED', 'SAR'],
        'Oceania': ['AUD', 'NZD'],
        'Africa': ['ZAR']
    };
    const currencyLabels = {
        'USD': 'USD - US Dollar', 'EUR': 'EUR - Euro', 'GBP': 'GBP - British Pound', 'CAD': 'CAD - Canadian Dollar',
        'AUD': 'AUD - Australian Dollar', 'JPY': 'JPY - Japanese Yen', 'CNY': 'CNY - Chinese Yuan', 'INR': 'INR - Indian Rupee',
        'BRL': 'BRL - Brazilian Real', 'MXN': 'MXN - Mexican Peso', 'SGD': 'SGD - Singapore Dollar', 'NZD': 'NZD - New Zealand Dollar',
        'CHF': 'CHF - Swiss Franc', 'HKD': 'HKD - Hong Kong Dollar', 'SEK': 'SEK - Swedish Krona', 'NOK': 'NOK - Norwegian Krone',
        'DKK': 'DKK - Danish Krone', 'ZAR': 'ZAR - South African Rand', 'RUB': 'RUB - Russian Ruble', 'KRW': 'KRW - South Korean Won',
        'TRY': 'TRY - Turkish Lira', 'AED': 'AED - UAE Dirham', 'SAR': 'SAR - Saudi Riyal', 'ILS': 'ILS - Israeli Shekel',
        'ARS': 'ARS - Argentine Peso', 'CLP': 'CLP - Chilean Peso', 'COP': 'COP - Colombian Peso', 'PEN': 'PEN - Peruvian Sol',
        'UYU': 'UYU - Uruguayan Peso', 'EGP': 'EGP - Egyptian Pound'
    };
    for (var groupName in currencyGroups) {
        var optgroup = document.createElement('optgroup');
        optgroup.label = groupName;
        currencyGroups[groupName].forEach(function(code) {
            var option = document.createElement('option');
            option.value = code;
            option.textContent = currencyLabels[code] || code;
            optgroup.appendChild(option);
        });
        currencySelect.appendChild(optgroup);
    }
    currencySelect.value = defaultCurrency;
    invoiceData.currency = defaultCurrency;

    // Restore saved data into DOM
    syncToDOM();

    // Field behavior configuration
    var fieldConfig = {
        validationFields: ['sender-name', 'sender-address', 'sender-email', 'recipient-name', 'recipient-address', 'recipient-email'],
        invoiceMetaFields: ['invoice-number', 'invoice-date'],
        totalsFields: ['discount'],
        saveFields: ['po-number', 'tax-detail', 'notes', 'due-date', 'payment-bank', 'payment-paypal', 'payment-link']
    };

    // Input: sync and validate only (no save)
    invoiceContainer.addEventListener('input', function(e) {
        syncFromDOM();
        markDirty();
        if (fieldConfig.validationFields.includes(e.target.id)) {
            validateField(e.target.id.includes('sender') ? 'sender' : 'recipient',
                e.target.id.includes('name') ? 'name' : e.target.id.includes('email') ? 'email' : 'address',
                e.target.value);
        }
    });

    // Focus out: sync, validate, save based on field type
    invoiceContainer.addEventListener('focusout', function(e) {
        syncFromDOM();

        if (fieldConfig.invoiceMetaFields.includes(e.target.id)) {
            if (e.target.id === 'invoice-number') validateField('invoiceNumber', null, e.target.value);
            if (e.target.id === 'invoice-date') validateField('date', null, e.target.value);
            saveInvoiceData();
        } else if (fieldConfig.totalsFields.includes(e.target.id)) {
            _calculateTotals();
        } else if (fieldConfig.validationFields.includes(e.target.id) || fieldConfig.saveFields.includes(e.target.id)) {
            saveInvoiceData();
        }
    });

    // Direct listener for discount field
    document.getElementById('discount').addEventListener('blur', function() {
        syncFromDOM();
        _calculateTotals();
    });

    // Discount type change
    document.getElementById('discount-type').addEventListener('change', function() {
        syncFromDOM();
        _calculateTotals();
    });

    // Change events (dropdowns, selects)
    invoiceContainer.addEventListener('change', function(e) {
        if (e.target.id === 'currency-select') {
            syncFromDOM();
            updateLineItemCurrency();
            saveInvoiceData();
        } else if (e.target.id === 'due-date-preset') {
            var days = parseInt(e.target.value);
            if (!isNaN(days)) {
                var invoiceDate = document.getElementById('invoice-date').value;
                var baseDate = invoiceDate ? new Date(invoiceDate + 'T00:00:00') : new Date();
                var dueDate = new Date(baseDate.getTime() + days * 86400000);
                var dueDateStr = dueDate.toISOString().split('T')[0];
                document.getElementById('due-date').value = dueDateStr;
                syncFromDOM();
                saveInvoiceData();
            }
        } else if (e.target.id === 'invoice-status') {
            syncFromDOM();
            saveInvoiceData();
        } else if (e.target.id === 'invoice-history') {
            if (e.target.value) {
                loadFromHistory(e.target.value);
                e.target.value = '';
            }
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
    invoiceContainer.addEventListener('blur', function(e) {
        if (e.target.classList.contains('item-rate')) {
            var val = parseFloat(e.target.value);
            if (!isNaN(val) && val > 0) {
                e.target.value = val.toFixed(2);
            }
        }
    }, true);
    invoiceContainer.addEventListener('focus', function(e) {
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

    if (addItemBtn) addItemBtn.addEventListener('click', addItem);
    if (downloadBtn) downloadBtn.addEventListener('click', downloadPDF);

    // Bulk action: delete empty rows
    if (deleteEmptyRowsBtn) deleteEmptyRowsBtn.addEventListener('click', function() {
        var emptyIndices = [];
        invoiceData.lineItems.forEach(function(item, i) {
            if (!item.description && !item.quantity && !item.rate && !item.tax) {
                emptyIndices.push(i);
            }
        });

        if (emptyIndices.length === 0) {
            showToast("No empty rows to delete.", "success");
            return;
        }

        // Remove empty items from data model (starting from highest index)
        for (var i = emptyIndices.length - 1; i >= 0; i--) {
            invoiceData.lineItems.splice(emptyIndices[i], 1);
        }

        // Re-render table
        while (lineItemsTable.rows.length > 0) {
            lineItemsTable.deleteRow(0);
        }

        invoiceData.lineItems.forEach(function(item, i) {
            var row = lineItemsTable.insertRow();
            row.innerHTML = '<td data-label="Description"><textarea class="item-description" placeholder="Item description">' + (item.description || '') + '</textarea></td>' +
                '<td data-label="Quantity"><input type="number" class="item-quantity" placeholder="0" min="0" step="1" value="' + (item.quantity || '') + '"></td>' +
                '<td data-label="Rate"><input type="number" class="item-rate" placeholder="0.00" min="0" step="0.01" value="' + (item.rate || '') + '"></td>' +
                '<td data-label="Tax (%)" class="tax-cell"><input type="number" class="item-tax" placeholder="0" min="0" max="100" step="0.1" value="' + (item.tax || '') + '"><div class="tax-amount" id="tax-amount-' + i + '"></div></td>' +
                '<td data-label="Amount" class="item-amount">' + (item.amount ? item.amount.toFixed(2) : '0.00') + '</td>' +
                '<td data-label="Actions" class="actions-col"><button type="button" class="delete-row-btn" aria-label="Remove line item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></td>';
            attachRowListeners(row, i);
        });

        updateDeleteButtons();
        calculateTotals();
        saveInvoiceData();
        showToast("Empty rows removed.", "success");
    });

    if (clearBtn) clearBtn.addEventListener('click', function() {
        showConfirmDialog('Clear all fields and start over? This cannot be undone.', 'Clear All', 'Cancel').then(function(confirmed) {
            if (confirmed) {
                deleteInvoice('current').then(function() {
                    location.reload();
                });
            }
        });
    });

    if (duplicateBtn) duplicateBtn.addEventListener('click', function() {
        var today = new Date().toISOString().split('T')[0];
        getNextInvoiceNumber().then(function(num) {
            invoiceData.invoiceNumber = num;
            invoiceData.date = today;
            invoiceData.dueDate = '';
            invoiceData.poNumber = '';
            invoiceData.notes = '';
            invoiceData.recipient = { name: '', address: '', email: '' };
            invoiceData.lineItems = [
                {
                    description: "",
                    quantity: 0,
                    rate: 0.0,
                    tax: 0.0,
                    amount: 0.0,
                    taxAmount: 0.0
                }
            ];
            invoiceData.subtotal = 0;
            invoiceData.totalTax = 0;
            invoiceData.discount = 0;
            invoiceData.grandTotal = 0;
            invoiceData.status = '';

            syncToDOM();
            calculateTotals();

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
    });

    if (saveBtn) saveBtn.addEventListener('click', function() {
        syncFromDOM();
        _calculateTotals();
        saveInvoiceData();
        showToast('Invoice saved.', 'success');
    });

    if (sampleBtn) sampleBtn.addEventListener('click', function() {
        loadSampleInvoice();
    });

    if (shareBtn) shareBtn.addEventListener('click', function() {
        syncFromDOM();
        _calculateTotals();

        var t = translations[currentLang];
        var subject = (t.invoice || 'Invoice') + ' ' + invoiceData.invoiceNumber;
        var body = (t.invoiceNo || 'Invoice Number:') + ' ' + invoiceData.invoiceNumber + '\n';
        body += (t.dateLabel || 'Date:') + ' ' + invoiceData.date + '\n';
        body += (t.grandTotalLabel || 'Grand Total:') + ' ' + getCurrencyDisplay(invoiceData.currency) + invoiceData.grandTotal.toFixed(2) + '\n\n';
        if (invoiceData.sender.name) body += (t.from || 'From:') + ' ' + invoiceData.sender.name + '\n';
        if (invoiceData.recipient.name) body += (t.to || 'To:') + ' ' + invoiceData.recipient.name + '\n';
        body += '\n' + window.location.href;

        // Try to share with PDF using Web Share API with file support
        if (navigator.share && navigator.canShare) {
            try {
                var jsPDF = window.jspdf.jsPDF;
                var doc = new jsPDF();
                generatePDFContent(doc, t);
                var pdfBlob = doc.output('blob');
                var pdfFile = new File([pdfBlob], 'invoice-' + invoiceData.invoiceNumber + '.pdf', { type: 'application/pdf' });
                var shareData = { title: subject, text: body, files: [pdfFile] };
                if (navigator.canShare(shareData)) {
                    navigator.share(shareData).then(function() {
                        showToast('Invoice shared!', 'success');
                    }).catch(function(err) {
                        if (err.name !== 'AbortError') {
                            showToast('Sharing was cancelled or failed.', 'error');
                        }
                    });
                    return;
                }
            } catch (e) {
                showToast('Sharing not supported on this browser.', 'error');
            }
        }

        // Fallback: use regular share or mailto
        if (navigator.share) {
            navigator.share({
                title: subject,
                text: body
            }).then(function() {
                showToast('Invoice shared!', 'success');
            }).catch(function(err) {
                if (err.name !== 'AbortError') {
                    showToast('Sharing was cancelled or failed.', 'error');
                }
            });
        } else {
            if (invoiceData.recipient.email) {
                var mailtoLink = 'mailto:' + encodeURIComponent(invoiceData.recipient.email || '') +
                    '?subject=' + encodeURIComponent(subject) +
                    '&body=' + encodeURIComponent(body);
                window.location.href = mailtoLink;
                showToast('Share dialog opened in your email client.', 'success');
            } else {
                showToast('No recipient email set. Please add a client email to share via email.', 'error');
            }
        }
    });

    if (exportBtn) exportBtn.addEventListener('click', function() {
        syncFromDOM();
        _calculateTotals();
        exportBackup();
    });

    if (importBtn) importBtn.addEventListener('click', function() {
        importFile.click();
    });

    if (importFile) importFile.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            importBackup(e.target.files[0]);
            e.target.value = '';
        }
    });

    if (previewBtn) previewBtn.addEventListener('click', function() {
        syncFromDOM();
        _calculateTotals();

        if (!window.jspdf) {
            showToast("PDF library not loaded. Please refresh the page.", "error");
            return;
        }

        var modal = document.getElementById('preview-modal');
        var embed = document.getElementById('preview-embed');
        var t = translations[currentLang] || translations.en;

        try {
            var jsPDF = window.jspdf.jsPDF;
            var doc = new jsPDF();
            generatePDFContent(doc, t);
            var pdfBlob = doc.output('blob');
            var pdfBlobUrl = URL.createObjectURL(pdfBlob);
            embed.src = pdfBlobUrl;
            modal.classList.add('open');
        } catch (e) {
            console.error('Preview error:', e);
            showToast("Error generating preview: " + e.message, "error");
        }
    });

    // Close preview modal
    document.querySelector('.modal-close').addEventListener('click', function() {
        document.getElementById('preview-modal').classList.remove('open');
    });

    document.querySelector('.modal-backdrop').addEventListener('click', function() {
        document.getElementById('preview-modal').classList.remove('open');
    });

    // Download from preview modal
    document.getElementById('preview-download-btn').addEventListener('click', function() {
        document.getElementById('preview-modal').classList.remove('open');
        downloadPDF();
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

    // Language selector
    document.getElementById('language-select').addEventListener('change', function(e) {
        currentLang = e.target.value;
        applyTranslations();
        saveInvoiceData();
    });

    // Try to set language from IndexedDB or browser fallback
    getMeta('language').then(function(savedLang) {
        if (savedLang && translations[savedLang]) {
            currentLang = savedLang;
            document.getElementById('language-select').value = currentLang;
        }
        applyTranslations();

        // Initialize history dropdown
        updateHistoryDropdown();

        // Initialize sidebar
        initSidebar();

        // Add event listeners to the first row
        attachRowListeners(lineItemsTable.rows[0], 0);

        // Initialize with one line item
        calculateLineItemAmount(0);

        // Apply initial template
        updateTemplate();
        });
    });
}

function initSidebar() {
    var sidebar = document.getElementById('sidebar');
    var hamburgerToggle = document.getElementById('hamburger-toggle');
    var mainWrapper = document.querySelector('.main-wrapper');
    var sidebarSearch = document.getElementById('sidebar-search');
    var clearHistoryBtn = document.getElementById('clear-history-btn');


    // Desktop: sidebar open by default
    if (window.innerWidth >= 768) {
        sidebar.classList.add('open');
    }

    // Hamburger toggle click
    if (hamburgerToggle) {
        hamburgerToggle.addEventListener('click', function() {
            toggleSidebar(sidebar, hamburgerToggle, mainWrapper);
        });
    }

    // Sidebar close button click
    var sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', function() {
            toggleSidebar(sidebar, hamburgerToggle, mainWrapper);
        });
    }

    // Click on overlay to close sidebar (mobile)
    var overlay = sidebar.querySelector('::before');
    sidebar.addEventListener('click', function(e) {
        if (e.target === sidebar && sidebar.classList.contains('open')) {
            if (window.innerWidth < 768) {
                toggleSidebar(sidebar, hamburgerToggle, mainWrapper);
            }
        }
    });

    // Clear history button
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', function() {
            showConfirmDialog('Are you sure you want to clear all invoice history? This cannot be undone.', 'Clear All', 'Cancel').then(function(confirmed) {
                if (confirmed) {
                    clearInvoices().then(function() {
                        return setMeta('invoice_history', []);
                    }).then(function() {
                        return updateSidebarListAsync();
                    }).then(function() {
                        showToast('All history cleared', 'success');
                    });
                }
            });
        });
    }

    // Search functionality
    if (sidebarSearch) {
        sidebarSearch.addEventListener('input', function() {
            filterSidebarList(this.value);
        });
    }

}

function toggleSidebar(sidebar, toggleBtn, mainWrapper) {
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (mainWrapper) {
            mainWrapper.classList.add('sidebar-closed');
        }
    } else {
        sidebar.classList.add('open');
        if (mainWrapper) {
            mainWrapper.classList.remove('sidebar-closed');
        }
    }
}

function handleResize() {
    var sidebar = document.getElementById('sidebar');
    var mainWrapper = document.querySelector('.main-wrapper');

    if (window.innerWidth < 768) {
        // Mobile - sidebar hidden by default
        sidebar.classList.remove('open');
        if (mainWrapper) {
            mainWrapper.classList.add('sidebar-closed');
        }
    } else {
        // Desktop - sidebar open by default
        sidebar.classList.add('open');
        if (mainWrapper) {
            mainWrapper.classList.remove('sidebar-closed');
        }
    }
}

function toggleMobileSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainWrapper = document.querySelector('.main-wrapper');

    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (mainWrapper) {
            mainWrapper.classList.add('sidebar-closed');
        }
    } else {
        sidebar.classList.add('open');
        if (mainWrapper) {
            mainWrapper.classList.remove('sidebar-closed');
        }
    }
}

function updateSidebarList() {
    updateSidebarListAsync();
}

function updateSidebarListAsync() {
    var sidebarList = document.getElementById('sidebar-list');
    if (!sidebarList) return Promise.resolve();

    return getHistory().then(function(history) {
        if (history.length === 0) {
            sidebarList.innerHTML = '<div class="sidebar-empty">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>' +
                '<polyline points="14 2 14 8 20 8"></polyline>' +
                '<line x1="12" y1="18" x2="12" y2="12"></line>' +
                '<line x1="9" y1="15" x2="15" y2="15"></line>' +
                '</svg>' +
                '<p>No saved invoices yet.<br>Your invoice history will appear here.</p>' +
                '</div>';
            return;
        }

        history.sort(function(a, b) { return (a.date || '').localeCompare(b.date || ''); });
        history.reverse();

        var html = '';
        history.forEach(function(item) {
            var savedDate = item.savedAt ? new Date(item.savedAt) : new Date();
            var dateStr = savedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            var amount = item.grandTotal ? getCurrencyDisplay(item.currency || 'USD') + item.grandTotal.toFixed(2) : '';
            
            html += '<div class="sidebar-item" data-invoice="' + item.invoiceNumber + '" onclick="loadFromHistorySidebar(\'' + item.invoiceNumber + '\')">' +
                '<div class="sidebar-item-icon">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>' +
                '<polyline points="14 2 14 8 20 8"></polyline>' +
                '</svg>' +
                '</div>' +
                '<div class="sidebar-item-content">' +
                '<div class="sidebar-item-title">' + item.invoiceNumber + '</div>' +
                '<div class="sidebar-item-meta">' +
                '<span>' + (item.date || dateStr) + '</span>';
            
            if (amount) {
                html += '<span class="sidebar-item-amount">' + amount + '</span>';
            }
            
            html += '</div>' +
                '</div>' +
                '<button class="sidebar-item-delete" onclick="event.stopPropagation(); deleteFromHistory(\'' + item.invoiceNumber + '\')" aria-label="Delete invoice">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">' +
                '<polyline points="3 6 5 6 21 6"></polyline>' +
                '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
                '</svg>' +
                '</button>' +
                '</div>';
        });

        sidebarList.innerHTML = html;
    }).catch(function() {});
}

function loadFromHistorySidebar(invoiceNumber) {
    syncFromDOM();
    saveInvoiceData().then(function() {
        return loadInvoiceData(invoiceNumber);
    }).then(function(loaded) {
        if (loaded) {
            syncToDOM();
            calculateTotals();
            updateTemplate();

            document.querySelectorAll('.sidebar-item').forEach(function(item) {
                item.classList.remove('active');
            });
            var activeItem = document.querySelector('.sidebar-item[data-invoice="' + invoiceNumber + '"]');
            if (activeItem) {
                activeItem.classList.add('active');
            }

            showToast('Loaded: ' + invoiceNumber, 'success');

            if (window.innerWidth < 768) {
                toggleMobileSidebar();
            }
        } else {
            showToast('Invoice not found in storage', 'error');
        }
    });
}

function deleteFromHistory(invoiceNumber) {
    showConfirmDialog('Delete invoice ' + invoiceNumber + '? This cannot be undone.', 'Delete', 'Cancel').then(function(confirmed) {
        if (!confirmed) return;

        getInvoice(invoiceNumber).then(function(deletedData) {
            getHistory().then(function(allHistory) {
                var deletedHistory = allHistory.filter(function(h) { return h.invoiceNumber === invoiceNumber; });

                deleteInvoice(invoiceNumber).then(function() {
                    return updateDbHistory(function(history) {
                        return history.filter(function(h) { return h.invoiceNumber !== invoiceNumber; });
                    });
                }).then(function() {
                    return updateSidebarListAsync();
                }).then(function() {
                    showToast('Invoice deleted', 'success', 'Undo', function() {
                        if (deletedData) {
                            putInvoice(deletedData).then(function() {
                                if (deletedHistory.length > 0) {
                                    return updateDbHistory(function(history) {
                                        history.push(deletedHistory[0]);
                                        if (history.length > 50) history = history.slice(-50);
                                        return history;
                                    });
                                }
                            }).then(function() {
                                return updateSidebarListAsync();
                            });
                        }
                        showToast('Invoice restored', 'success');
                    });
                });
            });
        });
    });
}

function updateDbHistory(mutator) {
    return getMeta('invoice_history').then(function(history) {
        if (!history) history = [];
        history = mutator(history);
        return setMeta('invoice_history', history);
    });
}

function filterSidebarList(query) {
    var items = document.querySelectorAll('.sidebar-item');
    query = query.toLowerCase();

    items.forEach(function(item) {
        var title = item.querySelector('.sidebar-item-title').textContent.toLowerCase();
        var meta = item.querySelector('.sidebar-item-meta').textContent.toLowerCase();
        
        if (title.includes(query) || meta.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
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

// Apply translations to UI
function applyTranslations() {
    var t = translations[currentLang];
    if (!t) return;

    // Store current values before updating labels
    var paymentBankVal = document.getElementById('payment-bank').value;
    var paymentPaypalVal = document.getElementById('payment-paypal').value;
    var paymentLinkVal = document.getElementById('payment-link').value;
    var notesVal = document.getElementById('notes').value;

    // Update section titles
    var sections = document.querySelectorAll('.card-section-title');
    if (sections[0]) sections[0].innerHTML = getIcon('user') + ' ' + t.billingDetails;
    if (sections[1]) sections[1].innerHTML = getIcon('calendar') + ' ' + t.invoiceDetails;
    if (sections[2]) sections[2].innerHTML = getIcon('list') + ' ' + t.lineItems;
    if (sections[3]) sections[3].innerHTML = getIcon('file') + ' ' + t.notesTerms;

    // Update labels - iterate all label elements and match by for attribute
    var labelMap = {
        'sender-name': t.senderName, 'sender-address': t.senderAddress, 'sender-email': t.senderEmail,
        'recipient-name': t.clientName, 'recipient-address': t.clientAddress, 'recipient-email': t.clientEmail,
        'invoice-number': t.invoiceNumber, 'invoice-date': t.date, 'due-date': t.dueDate,
        'po-number': t.poNumber, 'currency-select': t.currency, 'invoice-history': t.invoiceHistory || 'Invoice History', 'tax-detail': t.taxDetail,
        'invoice-status': t.status, 'notes': t.notesTerms,
        'payment-bank': t.bankName, 'payment-paypal': t.paypalLabel, 'payment-link': t.paymentLink,
        'payment-details-label': t.paymentDetails, 'logo-upload-label': t.companyLogo
    };

    for (var id in labelMap) {
        var label = document.querySelector('label[for="' + id + '"]');
        if (label) label.textContent = labelMap[id];
    }

    // Update placeholder text
    var notesEl = document.getElementById('notes');
    if (notesEl && !notesEl.value) notesEl.placeholder = t.notesPlaceholder;

    // Update buttons
    var addItemBtn = document.getElementById('add-item-btn');
    if (addItemBtn) addItemBtn.innerHTML = getIcon('plus') + ' ' + t.addLineItem;

    var downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) downloadBtn.innerHTML = getIcon('download') + ' ' + t.downloadPdf;

    var clearBtn = document.getElementById('clear-btn');
    if (clearBtn) clearBtn.innerHTML = getIcon('trash') + ' ' + t.clear;

    var duplicateBtn = document.getElementById('duplicate-btn');
    if (duplicateBtn) duplicateBtn.innerHTML = getIcon('copy') + ' ' + t.duplicate;

    var shareBtn = document.getElementById('share-btn');
    if (shareBtn) shareBtn.innerHTML = getIcon('share') + ' ' + t.share;

    var saveBtn = document.getElementById('save-btn');
    if (saveBtn) saveBtn.innerHTML = getIcon('save') + ' ' + t.saveInvoice;

    // Update template labels
    var templateLabels = document.querySelectorAll('.template-option span');
    if (templateLabels[0]) templateLabels[0].textContent = t.modern;
    if (templateLabels[1]) templateLabels[1].textContent = t.classic;
    if (templateLabels[2]) templateLabels[2].textContent = t.professional;

    var templateSelectorLabel = document.querySelector('.template-selector-label');
    if (templateSelectorLabel) templateSelectorLabel.textContent = t.chooseTemplate;

    // Update status options
    var statusSel = document.getElementById('invoice-status');
    if (statusSel) {
        statusSel.options[0].textContent = t.unpaid;
        statusSel.options[1].textContent = t.paid;
        statusSel.options[2].textContent = t.overdue;
    }

    // Update due date preset
    var dueDatePreset = document.getElementById('due-date-preset');
    if (dueDatePreset) {
        dueDatePreset.options[0].textContent = 'Terms...';
        dueDatePreset.options[1].textContent = t.termsReceipt;
        dueDatePreset.options[2].textContent = t.termsNet7;
        dueDatePreset.options[3].textContent = t.termsNet14;
        dueDatePreset.options[4].textContent = t.termsNet15;
        dueDatePreset.options[5].textContent = t.termsNet30;
        dueDatePreset.options[6].textContent = t.termsNet45;
        dueDatePreset.options[7].textContent = t.termsNet60;
        dueDatePreset.options[8].textContent = t.termsNet90;
    }

    // Update logo upload label
    var logoUploadLabel = document.getElementById('logo-upload-label');
    if (logoUploadLabel) logoUploadLabel.textContent = t.companyLogo;

    var logoPlaceholderText = document.querySelector('.logo-upload-placeholder span');
    if (logoPlaceholderText) logoPlaceholderText.textContent = t.logoUpload;

    // Restore values that might have been cleared
    document.getElementById('payment-bank').value = paymentBankVal;
    document.getElementById('payment-paypal').value = paymentPaypalVal;
    document.getElementById('payment-link').value = paymentLinkVal;
    document.getElementById('notes').value = notesVal;

    // Save language preference
    setMeta('language', currentLang).catch(function() {});
}

// Helper function to get SVG icons
function getIcon(type) {
    var icons = {
        'user': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
        'calendar': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
        'list': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
        'file': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
        'plus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
        'download': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
        'trash': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
        'copy': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
        'share': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>',
        'save': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>'
    };
    return icons[type] || '';
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
    updateEmptyRowHint(index);
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
        markDirty();
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

    updateLineItemUI(index);
    _calculateTotals();
}

function updateLineItemUI(index) {
    const item = invoiceData.lineItems[index];

    const amountCell = lineItemsTable.rows[index].cells[4];
    amountCell.textContent = item.amount.toFixed(2);

    var taxAmountElement = document.getElementById(`tax-amount-${index}`);
    if (taxAmountElement) {
        if (item.taxAmount > 0) {
            taxAmountElement.textContent = `(${item.taxAmount.toFixed(2)})`;
            taxAmountElement.style.display = '';
        } else {
            taxAmountElement.textContent = '';
            taxAmountElement.style.display = 'none';
        }
    }

    updateEmptyRowHint(index);
}

// Add/remove empty-row class based on whether row has content
function updateEmptyRowHint(index) {
    var row = lineItemsTable.rows[index];
    if (!row) return;
    var item = invoiceData.lineItems[index];
    var isEmpty = !item.description && !item.quantity && !item.rate && !item.tax;
    if (isEmpty) {
        row.classList.add('empty-row');
    } else {
        row.classList.remove('empty-row');
    }
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

    // Convert percentage discount to flat amount for calculation
    var effectiveDiscount = invoiceData.discount;
    var baseForDiscount = invoiceData.subtotal + invoiceData.totalTax;
    if (invoiceData.discountType === 'percent') {
        effectiveDiscount = baseForDiscount * (invoiceData.discount / 100);
    }

    var maxDiscount = invoiceData.subtotal + invoiceData.totalTax;
    if (effectiveDiscount > maxDiscount) {
        effectiveDiscount = maxDiscount;
    }

    // Calculate grand total (never negative)
    invoiceData.grandTotal = parseFloat(
        Math.max(0, invoiceData.subtotal + invoiceData.totalTax - effectiveDiscount).toFixed(2)
    );

    // Update UI directly
    var currencyDisplay = getCurrencyDisplay(invoiceData.currency);
    document.getElementById('subtotal').textContent = currencyDisplay + invoiceData.subtotal.toFixed(2);
    document.getElementById('total-tax').textContent = currencyDisplay + invoiceData.totalTax.toFixed(2);
    document.getElementById('grand-total').textContent = currencyDisplay + invoiceData.grandTotal.toFixed(2);
    document.getElementById('discount').value = invoiceData.discount; // show raw input value, not converted

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
    document.getElementById('discount').value = invoiceData.discount.toFixed(2);
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

// Load sample invoice data
function loadSampleInvoice() {
    invoiceData.sender.name = 'Acme Corporation';
    invoiceData.sender.address = '123 Business Ave, Suite 100\nSan Francisco, CA 94105';
    invoiceData.sender.email = 'billing@acmecorp.com';
    invoiceData.recipient.name = 'TechStart Inc.';
    invoiceData.recipient.address = '456 Innovation Drive\nNew York, NY 10001';
    invoiceData.recipient.email = 'accounts@techstart.io';
    invoiceData.invoiceNumber = getNextInvoiceNumber();
    invoiceData.date = new Date().toISOString().split('T')[0];
    var dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    invoiceData.dueDate = dueDate.toISOString().split('T')[0];
    invoiceData.poNumber = 'PO-2026-0042';
    invoiceData.notes = 'Payment is due within 30 days. Thank you for your business!';
    invoiceData.discount = 0;
    invoiceData.discountType = 'flat';
    invoiceData.status = '';
    invoiceData.taxDetail = 'GST: 27AABCA1234D1ZV';

    invoiceData.lineItems = [
        { description: 'Web Development - Frontend React Implementation', quantity: 40, rate: 150, tax: 0, amount: 6000, taxAmount: 0 },
        { description: 'UI/UX Design Consultation', quantity: 10, rate: 200, tax: 0, amount: 2000, taxAmount: 0 },
        { description: 'Database Migration Services', quantity: 1, rate: 3500, tax: 18, amount: 3500, taxAmount: 630 },
        { description: 'Monthly Server Hosting (Q2)', quantity: 3, rate: 299, tax: 0, amount: 897, taxAmount: 0 },
        { description: 'SSL Certificate Renewal (Yearly)', quantity: 2, rate: 199, tax: 10, amount: 398, taxAmount: 39.80 }
    ];

    syncToDOM();
    calculateTotals();
    saveInvoiceData();
    showToast('Sample invoice loaded', 'success');
}

// Custom confirm dialog (non-blocking)
function showConfirmDialog(message, confirmLabel, cancelLabel) {
    return new Promise(function(resolve) {
        var existing = document.getElementById('confirm-dialog');
        if (existing) existing.remove();

        var backdrop = document.createElement('div');
        backdrop.className = 'confirm-backdrop';

        var dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.setAttribute('role', 'alertdialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.innerHTML =
            '<div class="confirm-dialog-content">' +
                '<div class="confirm-dialog-icon">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">' +
                        '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>' +
                        '<line x1="12" y1="9" x2="12" y2="13"></line>' +
                        '<line x1="12" y1="17" x2="12.01" y2="17"></line>' +
                    '</svg>' +
                '</div>' +
                '<p class="confirm-dialog-message">' + message + '</p>' +
                '<div class="confirm-dialog-actions">' +
                    '<button class="confirm-dialog-cancel btn">' + (cancelLabel || 'Cancel') + '</button>' +
                    '<button class="confirm-dialog-confirm btn btn-danger">' + (confirmLabel || 'Confirm') + '</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(backdrop);
        document.body.appendChild(dialog);

        requestAnimationFrame(function() {
            backdrop.classList.add('show');
            dialog.classList.add('show');
            dialog.querySelector('.confirm-dialog-cancel').focus();
        });

        function close() {
            backdrop.classList.remove('show');
            dialog.classList.remove('show');
            setTimeout(function() {
                backdrop.remove();
                dialog.remove();
            }, 200);
        }

        dialog.querySelector('.confirm-dialog-cancel').addEventListener('click', function() {
            close();
            resolve(false);
        });

        dialog.querySelector('.confirm-dialog-confirm').addEventListener('click', function() {
            close();
            resolve(true);
        });

        backdrop.addEventListener('click', function() {
            close();
            resolve(false);
        });

        // Keyboard: Escape to cancel
        function onKeydown(e) {
            if (e.key === 'Escape') {
                close();
                resolve(false);
                document.removeEventListener('keydown', onKeydown);
            }
        }
        document.addEventListener('keydown', onKeydown);
    });
}
function showToast(message, type, actionLabel, actionCallback, duration) {
    var existing = document.getElementById('toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.className = 'toast toast-' + type;
    if (actionLabel) toast.classList.add('toast-has-action');

    var icon = type === 'success'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
        : type === 'error'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

    var actionHtml = actionLabel ? '<button class="toast-action">' + actionLabel + '</button>' : '';
    toast.innerHTML = '<div class="toast-icon">' + icon + '</div><div class="toast-content">' + message + '</div>' + actionHtml + '<button class="toast-close" aria-label="Dismiss notification">\u00d7</button>';
    document.body.appendChild(toast);

    requestAnimationFrame(function() {
        toast.classList.add('show');
    });

    toast.querySelector('.toast-close').addEventListener('click', function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    });

    if (actionLabel && actionCallback) {
        toast.querySelector('.toast-action').addEventListener('click', function() {
            actionCallback();
            toast.classList.remove('show');
            setTimeout(function() { toast.remove(); }, 300);
        });
    }

    var timeout = duration || 5000;
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, timeout);
}

// PDF layout constants
var PDF = {
    PAGE_WIDTH: 210, // A4 width in mm
    MARGIN_LEFT: 20,
    MARGIN_RIGHT: 20,
    CONTENT_WIDTH: 170, // PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT
    TOP_TITLE_Y: 20,
    INVOICE_NO_Y: 35,
    INFO_START_Y: 45,
    INFO_LINE_HEIGHT: 10,
    FROM_X: 20,
    TO_X: 120,
    FROM_TO_LABEL_Y_OFFSET: 10,
    FROM_TO_NAME_Y_OFFSET: 20,
    FROM_TO_ADDR_Y_OFFSET: 30,
    ADDR_LINE_HEIGHT: 5,
    ADDR_WIDTH: 80,
    TABLE_MIN_Y: 110,
    TABLE_Y_OFFSET: 10,
    TABLE_CELL_PADDING: 3,
    TABLE_FONT_SIZE: 10,
    TOTALS_LABEL_X: 140,
    TOTALS_VALUE_X: 190,
    TOTALS_LINE_HEIGHT: 10,
    GRAND_TOTAL_FONT_SIZE: 14,
    NOTES_Y_OFFSET: 10,
    NOTES_LINE_HEIGHT: 6,
    NOTES_FONT_SIZE: 9,
    NOTES_LABEL_FONT_SIZE: 10,
    NOTES_TEXT_COLOR: [100, 100, 100],
    NOTES_MAX_WIDTH: 170,
    LOGO_X: 20,
    LOGO_Y: 15,
    LOGO_WIDTH: 40,
    LOGO_HEIGHT: 20,
    LOGO_OFFSET_Y: 25,
    INVOICE_TITLE_FONT_SIZE: 22,
    INVOICE_NO_FONT_SIZE: 12,
    FROM_TO_LABEL_FONT_SIZE: 14,
    FROM_TO_TEXT_FONT_SIZE: 12,
    DATE_FONT_SIZE: 12,
    DATE_X_RIGHT: 190
};

// Generate PDF content (used by both download and share)
function generatePDFContent(doc, t) {
    var currentTemplate = invoiceData.template;
    var template = templates.find(function(tmpl) { return tmpl.templateId === currentTemplate; });
    var primaryColor = template ? template.primaryColor : "#4f46e5";

    var hexToRgb = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [79, 70, 229];
    };

var headerColor = hexToRgb(primaryColor);
    var currencyDisplay = getCurrencyDisplay(invoiceData.currency);
    t = t || translations[currentLang] || translations.en;

    doc.setFont("helvetica");
    doc.setFontSize(PDF.INVOICE_NO_FONT_SIZE);

    var logoRightEdge = 0;
    if (invoiceData.logo) {
        try {
            var logoFormat = 'PNG';
            if (invoiceData.logo.indexOf('data:image/jpeg') !== -1 || invoiceData.logo.indexOf('data:image/jpg') !== -1) logoFormat = 'JPEG';
            else if (invoiceData.logo.indexOf('data:image/gif') !== -1) logoFormat = 'GIF';
            else if (invoiceData.logo.indexOf('data:image/webp') !== -1) logoFormat = 'WEBP';
            doc.addImage(invoiceData.logo, logoFormat, PDF.LOGO_X, PDF.LOGO_Y, PDF.LOGO_WIDTH, PDF.LOGO_HEIGHT);
            logoRightEdge = PDF.LOGO_X + PDF.LOGO_WIDTH;
        } catch (e) {}
    }

    doc.setFontSize(PDF.INVOICE_TITLE_FONT_SIZE);
    doc.setTextColor.apply(doc, headerColor);
    var invoiceTitle = t.invoice || "INVOICE";
    var titleWidth = doc.getTextWidth(invoiceTitle);
    var titleX = logoRightEdge > 0 ? Math.max(logoRightEdge + 10, PDF.PAGE_WIDTH - PDF.MARGIN_RIGHT - titleWidth) : PDF.MARGIN_LEFT;
    doc.text(invoiceTitle, titleX, PDF.TOP_TITLE_Y);

    if (invoiceData.status && invoiceData.status !== "") {
        var statusText = invoiceData.status.toUpperCase();
        var statusColor = invoiceData.status === "paid" ? [16, 185, 129] : invoiceData.status === "overdue" ? [239, 68, 68] : [245, 158, 11];
        doc.setFontSize(14);
        doc.setTextColor.apply(doc, statusColor);
        doc.text(statusText, PDF.PAGE_WIDTH - PDF.MARGIN_RIGHT, PDF.TOP_TITLE_Y, { align: 'right' });
    }

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(PDF.INVOICE_NO_FONT_SIZE);
    var invoiceNoY = logoRightEdge > 0 ? PDF.LOGO_Y + PDF.LOGO_HEIGHT + 10 : PDF.INVOICE_NO_Y;
    doc.text((t.invoiceNo || "Invoice Number:") + " " + invoiceData.invoiceNumber, PDF.MARGIN_LEFT, invoiceNoY);

    var dateText = (t.dateLabel || "Date:") + " " + invoiceData.date;
    var dateWidth = doc.getTextWidth(dateText);
    doc.text(dateText, PDF.DATE_X_RIGHT - dateWidth, invoiceNoY);

    var infoY = invoiceNoY + PDF.INFO_LINE_HEIGHT;
    if (invoiceData.dueDate) { doc.text((t.dueDateLabel || "Due Date:") + " " + invoiceData.dueDate, PDF.MARGIN_LEFT, infoY); infoY += PDF.INFO_LINE_HEIGHT; }
    if (invoiceData.poNumber.trim()) { doc.text((t.poNumberLabel || "PO Number:") + " " + invoiceData.poNumber, PDF.MARGIN_LEFT, infoY); infoY += PDF.INFO_LINE_HEIGHT; }
    if (invoiceData.taxDetail.trim()) { doc.text((t.taxDetailLabel || "Tax Detail:") + " " + invoiceData.taxDetail, PDF.MARGIN_LEFT, infoY); infoY += PDF.INFO_LINE_HEIGHT; }

    doc.setFontSize(PDF.FROM_TO_LABEL_FONT_SIZE);
    doc.setTextColor.apply(doc, headerColor);
    doc.text((t.from || "From:") + " ", PDF.FROM_X, infoY + PDF.FROM_TO_LABEL_Y_OFFSET);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(PDF.FROM_TO_TEXT_FONT_SIZE);
    doc.text(invoiceData.sender.name, PDF.FROM_X, infoY + PDF.FROM_TO_NAME_Y_OFFSET);
    var senderAddressLines = doc.splitTextToSize(invoiceData.sender.address, PDF.ADDR_WIDTH);
    doc.text(senderAddressLines, PDF.FROM_X, infoY + PDF.FROM_TO_ADDR_Y_OFFSET);
    var senderAddressHeight = senderAddressLines.length * PDF.ADDR_LINE_HEIGHT;
    doc.text(invoiceData.sender.email, PDF.FROM_X, infoY + PDF.FROM_TO_ADDR_Y_OFFSET + senderAddressHeight);

    doc.setFontSize(PDF.FROM_TO_LABEL_FONT_SIZE);
    doc.setTextColor.apply(doc, headerColor);
    doc.text((t.to || "To:") + " ", PDF.TO_X, infoY + PDF.FROM_TO_LABEL_Y_OFFSET);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(PDF.FROM_TO_TEXT_FONT_SIZE);
    doc.text(invoiceData.recipient.name, PDF.TO_X, infoY + PDF.FROM_TO_NAME_Y_OFFSET);
    var recipientAddressLines = doc.splitTextToSize(invoiceData.recipient.address, PDF.ADDR_WIDTH);
    doc.text(recipientAddressLines, PDF.TO_X, infoY + PDF.FROM_TO_ADDR_Y_OFFSET);
    var recipientAddressHeight = recipientAddressLines.length * PDF.ADDR_LINE_HEIGHT;
    doc.text(invoiceData.recipient.email, PDF.TO_X, infoY + PDF.FROM_TO_ADDR_Y_OFFSET + recipientAddressHeight);

    var tableStartY = Math.max(PDF.TABLE_MIN_Y, infoY + PDF.TABLE_Y_OFFSET + Math.max(senderAddressHeight, recipientAddressHeight));
    var adjustedTableStartY = tableStartY + PDF.TABLE_Y_OFFSET;

    var headers = [[t.description || "Description", t.quantity || "Quantity", t.rate || "Rate", t.tax || "Tax %", t.amount || "Amount"]];
    var rows = invoiceData.lineItems.map(function(item) {
        return [item.description, item.quantity, currencyDisplay + item.rate.toFixed(2), item.tax, currencyDisplay + item.amount.toFixed(2)];
    });

    doc.autoTable({ head: headers, body: rows, startY: adjustedTableStartY, theme: 'grid',
        headStyles: { fillColor: headerColor, textColor: [255, 255, 255] },
        styles: { cellPadding: PDF.TABLE_CELL_PADDING, fontSize: PDF.TABLE_FONT_SIZE }
    });

    var finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) || adjustedTableStartY + 40;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(PDF.FROM_TO_TEXT_FONT_SIZE);
    var labelX = PDF.TOTALS_LABEL_X, valueX = PDF.TOTALS_VALUE_X, lineHeight = PDF.TOTALS_LINE_HEIGHT;

    doc.text((t.subtotalLabel || 'Subtotal:') + ' ', labelX, finalY + lineHeight);
    doc.text(currencyDisplay + invoiceData.subtotal.toFixed(2), valueX - doc.getTextWidth(currencyDisplay + invoiceData.subtotal.toFixed(2)), finalY + lineHeight);

    doc.text((t.totalTaxLabel || 'Total Tax:') + ' ', labelX, finalY + (lineHeight * 2));
    doc.text(currencyDisplay + invoiceData.totalTax.toFixed(2), valueX - doc.getTextWidth(currencyDisplay + invoiceData.totalTax.toFixed(2)), finalY + (lineHeight * 2));

    doc.text((t.discountLabel || 'Discount:') + ' ', labelX, finalY + (lineHeight * 3));
    doc.text(currencyDisplay + invoiceData.discount.toFixed(2), valueX - doc.getTextWidth(currencyDisplay + invoiceData.discount.toFixed(2)), finalY + (lineHeight * 3));

    doc.setFontSize(PDF.GRAND_TOTAL_FONT_SIZE);
    doc.setTextColor.apply(doc, headerColor);
    doc.text((t.grandTotalLabel || 'Grand Total:') + ' ', labelX, finalY + (lineHeight * 4));
    doc.text(currencyDisplay + invoiceData.grandTotal.toFixed(2), valueX - doc.getTextWidth(currencyDisplay + invoiceData.grandTotal.toFixed(2)), finalY + (lineHeight * 4));

    var currentY = finalY + (lineHeight * 5) + PDF.NOTES_Y_OFFSET;
    if (invoiceData.notes.trim()) {
        var notesY = finalY + (lineHeight * 5) + PDF.NOTES_Y_OFFSET;
        doc.setFontSize(PDF.NOTES_LABEL_FONT_SIZE);
        doc.setTextColor.apply(doc, PDF.NOTES_TEXT_COLOR);
        doc.text(t.notesLabel || "Notes / Terms:", PDF.MARGIN_LEFT, notesY);
        doc.setFontSize(PDF.NOTES_FONT_SIZE);
        var notesLines = doc.splitTextToSize(invoiceData.notes, PDF.NOTES_MAX_WIDTH);
        doc.text(notesLines, PDF.MARGIN_LEFT, notesY + PDF.NOTES_LINE_HEIGHT);
        currentY = notesY + PDF.NOTES_LINE_HEIGHT + (notesLines.length * PDF.NOTES_LINE_HEIGHT);
    }

    if (invoiceData.paymentDetails && (invoiceData.paymentDetails.bank || invoiceData.paymentDetails.paypal || invoiceData.paymentDetails.link)) {
        doc.setFontSize(PDF.NOTES_LABEL_FONT_SIZE);
        doc.setTextColor.apply(doc, PDF.NOTES_TEXT_COLOR);
        doc.text(t.paymentDetailsLabel || "Payment Details:", PDF.MARGIN_LEFT, currentY + 5);
        doc.setFontSize(PDF.NOTES_FONT_SIZE);
        doc.setTextColor(0, 0, 0);
        var paymentLines = [];
        if (invoiceData.paymentDetails.bank) paymentLines.push((t.bank || "Bank:") + " " + invoiceData.paymentDetails.bank);
        if (invoiceData.paymentDetails.paypal) paymentLines.push((t.paypal || "PayPal:") + " " + invoiceData.paymentDetails.paypal);
        if (invoiceData.paymentDetails.link) paymentLines.push((t.pay || "Pay:") + " " + invoiceData.paymentDetails.link);
        doc.text(paymentLines, PDF.MARGIN_LEFT, currentY + 12);
    }
}

// Download PDF
function downloadPDF() {
    // Ensure totals are up to date (in case debounce hasn't fired)
    syncFromDOM();
    _calculateTotals();

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
        var t = translations[currentLang] || translations.en;
        generatePDFContent(doc, t);
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

// Migrate data from localStorage to IndexedDB on first run
function migrateFromLocalStorage() {
    try {
        var hasOldData = localStorage.getItem('invoice_data');
        if (!hasOldData) return;

        // Migrate counter
        var counter = localStorage.getItem('invoice_counter');
        if (counter) setMeta('invoice_counter', parseInt(counter));

        // Migrate theme
        var theme = localStorage.getItem('theme');
        if (theme) setMeta('theme', theme);

        // Migrate language
        var lang = localStorage.getItem('invoice_language');
        if (lang) setMeta('language', lang);

        // Migrate all invoices
        var migratedCount = 0;
        var historyEntries = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key && key.startsWith('invoice_INV-')) {
                try {
                    var saved = JSON.parse(localStorage.getItem(key));
                    if (saved && saved.invoiceNumber) {
                        putInvoice(saved);
                        historyEntries.push({
                            invoiceNumber: saved.invoiceNumber,
                            date: saved.date,
                            savedAt: saved.savedAt || Date.now(),
                            grandTotal: saved.grandTotal || (saved.subtotal || 0) + (saved.totalTax || 0) - (saved.discount || 0),
                            currency: saved.currency
                        });
                        migratedCount++;
                    }
                } catch (e) {}
            }
        }

        if (historyEntries.length > 0) setMeta('invoice_history', historyEntries);

        // Also migrate the current invoice
        try {
            var current = JSON.parse(hasOldData);
            if (current && current.invoiceNumber) {
                putInvoice(current);
                putInvoice(Object.assign({}, current, { invoiceNumber: 'current' }));
            }
        } catch (e) {}

        if (migratedCount > 0) showToast('Migrated ' + migratedCount + ' invoices from local storage', 'success');

        // Clean up localStorage after migration
        ['invoice_data', 'invoice_counter', 'invoice_history', 'theme', 'invoice_language'].forEach(function(k) {
            localStorage.removeItem(k);
        });
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key && key.startsWith('invoice_INV-')) localStorage.removeItem(key);
        }
    } catch (e) {
        console.warn('Migration from localStorage failed (non-fatal):', e);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    openDB().then(function() {
        // Try IndexedDB first, fallback to localStorage for migration
        getMeta('theme').then(function(dbTheme) {
            var savedTheme = dbTheme || localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
        });

        migrateFromLocalStorage();

        document.getElementById('theme-toggle').addEventListener('click', function() {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            setMeta('theme', next).catch(function() {});
        });

        init();
    }).catch(function(err) {
        console.error('Failed to open database:', err);
        showToast('Database failed to initialize. Some features may not work.', 'error');
        init();
    });

    // Keyboard shortcut: Ctrl+S / Cmd+S to download
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            downloadPDF();
        }
    });
});
