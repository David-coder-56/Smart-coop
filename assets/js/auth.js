// frontend/assets/js/auth.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const forgotForm = document.getElementById("forgotForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("token", data.token || "");
          alert("✅ Login successful");
          window.location.href = "/dashboard.html";
        } else {
          alert("❌ " + (data.msg || "Login failed"));
        }
      } catch (err) {
        console.error(err);
        alert("⚠️ Could not connect to server.");
      }
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      try {
        const res = await fetch("http://localhost:5000/api/auth/forgot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) alert("📧 Reset link sent to your email.");
        else alert("❌ " + (data.msg || "Failed"));
      } catch (err) {
        console.error(err);
        alert("⚠️ Could not connect to server.");
      }
    });
  }
});
