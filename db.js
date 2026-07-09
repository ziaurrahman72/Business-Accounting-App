/* ==========================================================
   IndexedDB Helper - অফলাইন লোকাল ডাটাবেজ
   ==========================================================
   ইন্টারনেট না থাকলে সব ডাটা প্রথমে এখানে (ব্রাউজারের IndexedDB) সেভ হবে।
   ইন্টারনেট ফিরে এলে service-worker.js এর Background Sync এই ডাটা
   Firestore এ পাঠিয়ে দেবে।
   ========================================================== */

const DB_NAME = "biz_manager_local_db";
const DB_VERSION = 1;

// প্রতিটি মডিউলের জন্য আলাদা Object Store (টেবিলের মতো)
const STORES = ["products", "sales", "customers", "suppliers", "expenses", "pendingSync"];

function openLocalDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const dbInstance = event.target.result;
      STORES.forEach((storeName) => {
        if (!dbInstance.objectStoreNames.contains(storeName)) {
          dbInstance.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
        }
      });
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

// ডাটা লোকালি সেভ করা
async function saveLocal(storeName, data) {
  const dbInstance = await openLocalDB();
  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.add({ ...data, createdAt: new Date().toISOString(), synced: navigator.onLine });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// লোকাল থেকে সব ডাটা পড়া
async function getAllLocal(storeName) {
  const dbInstance = await openLocalDB();
  return new Promise((resolve, reject) => {
    const tx = dbInstance.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ইন্টারনেট সংযোগ পরিবর্তনের উপর নজর রাখা এবং Sync ট্রিগার করা
window.addEventListener("online", () => {
  document.dispatchEvent(new CustomEvent("connection-restored"));
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready.then((reg) => reg.sync.register("sync-pending-data"));
  }
});

window.addEventListener("offline", () => {
  document.dispatchEvent(new CustomEvent("connection-lost"));
});
