# ব্যবসা ম্যানেজমেন্ট সফটওয়্যার (Ziaur Rahman)

সম্পূর্ণ বাংলা, Online/Offline সাপোর্টেড, PWA + Android APK রেডি বিজনেস ম্যানেজমেন্ট সিস্টেম।

**বর্তমান অবস্থা:** Project Structure + Login System সম্পন্ন। পরবর্তী মডিউল ধাপে ধাপে যোগ হবে।

---

## ধাপ ১: Firebase প্রজেক্ট তৈরি করা (ফ্রি)

1. https://console.firebase.google.com এ যান, Google একাউন্ট দিয়ে লগইন করুন।
2. **Add project** এ ক্লিক করে একটি প্রজেক্ট বানান (যেমন: `zr-biz-manager`)।
3. বাম পাশের মেনু থেকে **Build > Authentication** এ যান > **Get started** > **Email/Password** চালু করুন।
4. **Build > Firestore Database** এ যান > **Create database** > Production mode এ শুরু করুন (রিজিওন: asia-south1 বা কাছাকাছি কোনোটা)।
5. **Build > Storage** এ যান > **Get started** (ছবি/ফাইল আপলোডের জন্য)।
6. **Project settings (⚙️ আইকন) > General** এ যান > নিচে **Your apps** সেকশনে **Web (</>)** আইকনে ক্লিক করে একটি Web App রেজিস্টার করুন।
7. যে `firebaseConfig` অবজেক্টটি দেখাবে, সেটি কপি করে `js/firebase-config.js` ফাইলের `firebaseConfig` এর জায়গায় বসিয়ে দিন।
8. Firestore এ প্রথম Admin ইউজার বানাতে: Authentication > Users > Add user - এখানে আপনার ইমেইল ও পাসওয়ার্ড দিন। এই ইমেইল-পাসওয়ার্ড দিয়েই লগইন পেজ থেকে লগইন করা যাবে।

---

## ধাপ ২: GitHub এ কোড আপলোড করা

### GitHub Desktop ব্যবহার করলে (সবচেয়ে সহজ, কমান্ড লাগবে না)
1. https://desktop.github.com থেকে GitHub Desktop ইনস্টল করুন এবং GitHub একাউন্ট দিয়ে লগইন করুন।
2. **File > New Repository** এ ক্লিক করুন। নাম দিন `business-management-bn`, Local Path হিসেবে এই ফোল্ডারটি বেছে নিন।
3. সব ফাইল কপি করে ওই ফোল্ডারে রাখুন (যদি আগে থেকে না থাকে)।
4. নিচে **Commit to main** এ ক্লিক করুন, তারপর **Publish repository** চাপুন। Repository যেন **Public** থাকে (GitHub Pages ফ্রি ব্যবহারের জন্য)।

### অথবা Terminal/Command Line দিয়ে (যদি Git ইনস্টল থাকে)
```bash
cd business-management-bn
git init
git add .
git commit -m "Initial commit: project structure + login system"
git branch -M main
git remote add origin https://github.com/<আপনার-ইউজারনেম>/business-management-bn.git
git push -u origin main
```
> GitHub এ প্রথমে https://github.com/new দিয়ে খালি একটি Repository তৈরি করে নিন, তারপর উপরের কমান্ড চালান।

---

## ধাপ ৩: GitHub Pages দিয়ে ফ্রি ওয়েবসাইট হোস্ট করা

1. GitHub এ আপনার Repository তে যান।
2. **Settings > Pages** এ যান।
3. **Branch** এ `main` সিলেক্ট করুন, ফোল্ডার `/ (root)` রেখে **Save** চাপুন।
4. কিছুক্ষণ পর একটি লিংক পাবেন এরকম:
   `https://<আপনার-ইউজারনেম>.github.io/business-management-bn/`
5. এই লিংকটিই আপনার সফটওয়্যারের লাইভ ওয়েবসাইট - মোবাইল/কম্পিউটার যেকোনো ব্রাউজার থেকে খোলা যাবে এবং **Add to Home Screen** করলে ফুলস্ক্রিন অ্যাপের মতো চলবে (কোনো address bar থাকবে না)।

**গুরুত্বপূর্ণ:** GitHub Pages এ HTTPS থাকে বলে PWA (Service Worker) ঠিকভাবে কাজ করবে - এটা APK বানানোর জন্যও জরুরি (Google শুধু HTTPS সাইট থেকে APK জেনারেট করতে দেয়)।

---

## ধাপ ৪: ফ্রি-তে Android APK বানানো

GitHub Pages এ ওয়েবসাইট লাইভ হওয়ার পর:

1. https://www.pwabuilder.com এ যান (Microsoft এর ফ্রি টুল, কোনো টাকা লাগে না)।
2. আপনার GitHub Pages লিংক পেস্ট করুন: `https://<আপনার-ইউজারনেম>.github.io/business-management-bn/`
3. **Start** চাপুন - PWABuilder আপনার manifest.json ও service-worker.js স্ক্যান করে PWA স্কোর দেখাবে।
4. স্কোর ভালো হলে (green ✔) **Package for Stores** এ ক্লিক করুন > **Android** সিলেক্ট করুন।
5. Package options এ Package ID দিন (যেমন: `com.ziaurrahman.bizmanager`), তারপর **Generate** চাপুন।
6. একটি `.zip` ফাইল ডাউনলোড হবে - এর ভেতরে থাকবে সাইন করা `.apk` বা `.aab` ফাইল, যেটা সরাসরি ফোনে ইনস্টল করা যাবে বা Google Play Store এ আপলোড করা যাবে।

> ফোনে APK ইনস্টল করার আগে ফোনের Settings > Security তে **Install from unknown sources** চালু রাখতে হবে (Play Store দিয়ে না বসালে)।

---

## প্রজেক্ট স্ট্রাকচার
```
business-management-bn/
├── index.html              → লগইন পেজ (হোম পেজ)
├── manifest.json            → PWA কনফিগারেশন
├── service-worker.js        → অফলাইন ক্যাশিং + ব্যাকগ্রাউন্ড সিঙ্ক
├── css/
│   └── style.css            → থিম (Dark/Light) + রেসপন্সিভ ডিজাইন
├── js/
│   ├── firebase-config.js   → Firebase সংযোগ (আপনার key বসাতে হবে)
│   ├── auth.js               → লগইন লজিক
│   └── db.js                 → IndexedDB অফলাইন ডাটাবেজ
├── icons/                    → অ্যাপ আইকন (Placeholder, পরে পরিবর্তনযোগ্য)
├── pages/
│   └── dashboard.html        → (এখন Placeholder, পরের মডিউলে সম্পূর্ণ হবে)
└── README.md
```

## এরপর যা যোগ হবে (Module ধাপে ধাপে)
- [x] Project Structure
- [x] Login System (Email/Password, Firebase Auth, Offline persistence)
- [ ] Dashboard (Sidebar + সামারি কার্ড + চার্ট)
- [ ] Product Management
- [ ] Sales / POS Billing
- [ ] Customer Management
- [ ] Supplier Management
- [ ] Expense Management
- [ ] Inventory (Stock In/Out)
- [ ] Reports (Daily/Weekly/Monthly/Yearly + PDF/Excel/CSV Export)
- [ ] User Roles (Admin/Manager/Staff) + Permissions
- [ ] Backup & Restore
- [ ] Notifications (Low Stock, Due Reminder)

প্রতিটি মডিউল একটি একটি করে সম্পূর্ণ কোডসহ পরবর্তী ধাপে দেওয়া হবে, ঠিক যেভাবে আপনি বলেছিলেন।
