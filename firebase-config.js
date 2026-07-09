/* ==========================================================
   Firebase Configuration
   ==========================================================
   নিচের firebaseConfig অবজেক্টে আপনার নিজের Firebase প্রজেক্টের
   তথ্য বসাতে হবে। এটি পাবেন:
   Firebase Console > Project Settings > General > Your apps > SDK setup

   বিস্তারিত ধাপ README.md ফাইলে দেওয়া আছে।
   ========================================================== */

// TODO: এখানে আপনার নিজের Firebase কনফিগারেশন বসান
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase অ্যাপ ইনিশিয়ালাইজ করা হচ্ছে
firebase.initializeApp(firebaseConfig);

// প্রয়োজনীয় সার্ভিসগুলো এক্সপোর্ট করা হচ্ছে যাতে অন্য ফাইল থেকে ব্যবহার করা যায়
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// অফলাইন সাপোর্টের জন্য Firestore পার্সিস্টেন্স চালু করা হচ্ছে
// এতে ইন্টারনেট না থাকলেও আগের ডাটা দেখা যাবে এবং নতুন ডাটা লোকালি সেভ হয়ে
// ইন্টারনেট এলে অটো সিঙ্ক হবে
db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
  if (err.code === "failed-precondition") {
    console.warn("একাধিক ট্যাব খোলা থাকায় Persistence চালু করা যায়নি");
  } else if (err.code === "unimplemented") {
    console.warn("এই ব্রাউজারে Offline Persistence সাপোর্ট নেই");
  }
});
