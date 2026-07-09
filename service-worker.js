/* ==========================================================
   Service Worker - অফলাইন ক্যাশিং ও ব্যাকগ্রাউন্ড সিঙ্ক
   ========================================================== */

const CACHE_NAME = "biz-manager-cache-v1";

// অফলাইনে যেসব ফাইল লাগবে সেগুলো এখানে লিস্ট করা হলো
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/firebase-config.js",
  "./js/auth.js",
  "./js/db.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// ইনস্টল হওয়ার সময় মূল ফাইলগুলো ক্যাশ করা হয়
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// পুরনো ক্যাশ মুছে ফেলা হয় (নতুন ভার্সন এলে)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// নেটওয়ার্ক রিকোয়েস্ট হ্যান্ডেল করা - প্রথমে নেটওয়ার্ক, না পেলে ক্যাশ
self.addEventListener("fetch", (event) => {
  // Firebase / API রিকোয়েস্ট ক্যাশ করা হবে না
  if (event.request.url.includes("firestore.googleapis.com") ||
      event.request.url.includes("identitytoolkit.googleapis.com")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request).then((res) => res || caches.match("./index.html")))
  );
});

// ইন্টারনেট ফিরে এলে ডাটা সিঙ্ক করার জন্য Background Sync
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-pending-data") {
    event.waitUntil(syncPendingData());
  }
});

async function syncPendingData() {
  // js/db.js এ IndexedDB থেকে pending ডাটা নিয়ে Firestore এ পাঠানোর লজিক এখানে যুক্ত হবে
  // এই ফাংশনটি পরবর্তী মডিউলে (Sync Engine) সম্পূর্ণ করা হবে
  console.log("Background sync triggered - pending data sync হবে এখানে");
}
