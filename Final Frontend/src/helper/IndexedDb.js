// e2eeKeyStore.js

const DB_NAME = "recircle_e2ee";
const DB_VERSION = 1;
const STORE = "keys";
const KEY_ID = "rsa_keypair_v1";

function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);

        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE)) {
                db.createObjectStore(STORE, { keyPath: "id" });
            }
        };

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export async function saveRSAKeysToIDB({ pubB64, privB64 }) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).put({
            id: KEY_ID,
            pubB64,
            privB64,
            updatedAt: Date.now(),
        });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

export async function loadRSAKeysFromIDB() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const req = tx.objectStore(STORE).get(KEY_ID);

        req.onsuccess = () => {
            const row = req.result;
            resolve(row ? { pubB64: row.pubB64, privB64: row.privB64 } : null);
        };
        req.onerror = () => reject(req.error);
    });
}

export async function clearRSAKeysFromIDB() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).delete(KEY_ID);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}
