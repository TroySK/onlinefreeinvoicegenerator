// IndexedDB service module for InvoiceDB
// Stores: invoices (keyed by invoiceNumber), meta (key-value for counters/prefs)
var DB_NAME = 'InvoiceDB';
var DB_VERSION = 1;
var STORE_INVOICES = 'invoices';
var STORE_META = 'meta';

var dbPromise = null;

function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function(resolve, reject) {
        var request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = function(e) {
            var db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_INVOICES)) {
                db.createObjectStore(STORE_INVOICES, { keyPath: 'invoiceNumber' });
            }
            if (!db.objectStoreNames.contains(STORE_META)) {
                db.createObjectStore(STORE_META, { keyPath: 'key' });
            }
        };
        request.onsuccess = function(e) {
            resolve(e.target.result);
        };
        request.onerror = function(e) {
            reject(e.target.error);
        };
    });
    return dbPromise;
}

function getStore(mode) {
    return openDB().then(function(db) {
        return db.transaction([STORE_INVOICES, STORE_META], mode).objectStore(STORE_INVOICES);
    });
}

function getMetaStore(mode) {
    return openDB().then(function(db) {
        return db.transaction([STORE_META], mode).objectStore(STORE_META);
    });
}

function getInvoice(invoiceNumber) {
    return getStore('readonly').then(function(store) {
        return new Promise(function(resolve, reject) {
            var req = store.get(invoiceNumber);
            req.onsuccess = function() { resolve(req.result || null); };
            req.onerror = function() { reject(req.error); };
        });
    });
}

function putInvoice(data) {
    return getStore('readwrite').then(function(store) {
        return new Promise(function(resolve, reject) {
            var req = store.put(data);
            req.onsuccess = function() { resolve(); };
            req.onerror = function() { reject(req.error); };
        });
    });
}

function deleteInvoice(invoiceNumber) {
    return getStore('readwrite').then(function(store) {
        return new Promise(function(resolve, reject) {
            var req = store.delete(invoiceNumber);
            req.onsuccess = function() { resolve(); };
            req.onerror = function() { reject(req.error); };
        });
    });
}

function getAllInvoices() {
    return getStore('readonly').then(function(store) {
        return new Promise(function(resolve, reject) {
            var req = store.getAll();
            req.onsuccess = function() { resolve(req.result || []); };
            req.onerror = function() { reject(req.error); };
        });
    });
}

function clearInvoices() {
    return getStore('readwrite').then(function(store) {
        return new Promise(function(resolve, reject) {
            var req = store.clear();
            req.onsuccess = function() { resolve(); };
            req.onerror = function() { reject(req.error); };
        });
    });
}

function getMeta(key) {
    return getMetaStore('readonly').then(function(store) {
        return new Promise(function(resolve, reject) {
            var req = store.get(key);
            req.onsuccess = function() {
                resolve(req.result ? req.result.value : null);
            };
            req.onerror = function() { reject(req.error); };
        });
    });
}

function setMeta(key, value) {
    return getMetaStore('readwrite').then(function(store) {
        return new Promise(function(resolve, reject) {
            var req = store.put({ key: key, value: value });
            req.onsuccess = function() { resolve(); };
            req.onerror = function() { reject(req.error); };
        });
    });
}

function getHistory() {
    return getAllInvoices().then(function(invoices) {
        return invoices.map(function(inv) {
            return {
                invoiceNumber: inv.invoiceNumber,
                date: inv.date,
                savedAt: inv.savedAt || 0,
                grandTotal: inv.grandTotal || 0,
                currency: inv.currency
            };
        }).sort(function(a, b) {
            return (b.savedAt || 0) - (a.savedAt || 0);
        });
    });
}

function putHistory(entries) {
    // History is derived from invoices; no-op since we store full invoices.
    // This function is kept for API compatibility.
    return Promise.resolve();
}