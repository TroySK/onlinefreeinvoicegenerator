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
// No constants needed — all persistence goes through db.js

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
        // Also save under 'current' key for the "current unsaved" invoice state
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
    // History is derived from invoices in IndexedDB, but we keep a separate
    // meta entry for fast lookup without scanning all invoices.
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
                            return setMeta('invoice_counter', backup.counter);
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
    // Save current invoice to history before switching (if it has data)
    syncFromDOM();
    saveInvoiceData().then(function() {
        // Load the selected invoice from IndexedDB
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

        // If we loaded from 'current', restore the real invoice number
        if (key === 'current' && data.invoiceNumber === 'current') {
            // Try to find a more recent real invoice number
            invoiceData.invoiceNumber = data.invoiceNumber;
        }
        return true;
    }).catch(function() {
        return false;
    });
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
        if (counter) {
            setMeta('invoice_counter', parseInt(counter));
        }

        // Migrate theme
        var theme = localStorage.getItem('theme');
        if (theme) {
            setMeta('theme', theme);
        }

        // Migrate language
        var lang = localStorage.getItem('invoice_language');
        if (lang) {
            setMeta('language', lang);
        }

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

        if (historyEntries.length > 0) {
            setMeta('invoice_history', historyEntries);
        }

        // Also migrate the current invoice
        try {
            var current = JSON.parse(hasOldData);
            if (current && current.invoiceNumber) {
                putInvoice(current);
                putInvoice(Object.assign({}, current, { invoiceNumber: 'current' }));
            }
        } catch (e) {}

        showToast('Migrated ' + migratedCount + ' invoices from local storage', 'success');

        // Clean up localStorage after migration
        ['invoice_data', 'invoice_counter', 'invoice_history', 'theme', 'invoice_language'].forEach(function(k) {
            localStorage.removeItem(k);
        });
        // Remove individual invoice keys
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key && key.startsWith('invoice_INV-')) {
                localStorage.removeItem(key);
            }
        }
    } catch (e) {
        console.warn('Migration from localStorage failed (non-fatal):', e);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    openDB().then(function() {
        // Migrate data from localStorage to IndexedDB if present
        migrateFromLocalStorage();

        // Try IndexedDB first, fallback to localStorage for migration
        getMeta('theme').then(function(dbTheme) {
            var savedTheme = dbTheme || localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
        });

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
