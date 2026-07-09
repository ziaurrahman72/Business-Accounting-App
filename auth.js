/* ==========================================================
   Authentication Logic - লগইন সিস্টেম
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorBox = document.getElementById("errorBox");
  const submitBtn = document.getElementById("loginBtn");
  const offlineBadge = document.getElementById("offlineBadge");

  // ইন্টারনেট আছে কিনা তা দেখানো
  function updateOnlineStatus() {
    if (!navigator.onLine) {
      offlineBadge.classList.add("show");
      offlineBadge.textContent = "⚠ ইন্টারনেট সংযোগ নেই - অফলাইন মোডে চলছে";
    } else {
      offlineBadge.classList.remove("show");
    }
  }
  updateOnlineStatus();
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  // যদি ইউজার আগে থেকেই লগইন করা থাকে (session persist), সরাসরি Dashboard এ পাঠানো
  auth.onAuthStateChanged((user) => {
    if (user) {
      window.location.href = "pages/dashboard.html";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorBox.textContent = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      errorBox.textContent = "ইমেইল এবং পাসওয়ার্ড দিতে হবে";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "লগইন হচ্ছে...";

    try {
      // অফলাইনে থাকলে Firebase Auth নিজে থেকেই local persisted session ব্যবহার করবে
      // (auth persistence আগেই সেট করা আছে নিচে)
      await auth.signInWithEmailAndPassword(email, password);
      // সফল হলে onAuthStateChanged এ redirect হবে
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = "লগইন করুন";

      switch (err.code) {
        case "auth/invalid-email":
          errorBox.textContent = "সঠিক ইমেইল দিন";
          break;
        case "auth/user-not-found":
          errorBox.textContent = "এই ইমেইলে কোনো একাউন্ট পাওয়া যায়নি";
          break;
        case "auth/wrong-password":
          errorBox.textContent = "পাসওয়ার্ড ভুল হয়েছে";
          break;
        case "auth/network-request-failed":
          errorBox.textContent = "ইন্টারনেট সংযোগ পরীক্ষা করুন";
          break;
        default:
          errorBox.textContent = "লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন";
      }
    }
  });

  // Dark/Light Mode টগল
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("app-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("app-theme", next);
    themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
  });
});

// Auth persistence - ব্রাউজার বন্ধ করলেও লগইন থাকবে (offline app আচরণের জন্য জরুরি)
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
