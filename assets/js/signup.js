// frontend/assets/js/signup.js
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  if (!signupForm) return;

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();   // NOTE: 'name' to match backend
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",              // important so cookie (token) is saved
        body: JSON.stringify({ name, email, password }),
      });


      const data = await res.json();

      if (res.ok) {
        // Registration OK
        alert("✅ Registered! Redirecting...");
        // token may be sent in cookie (httpOnly) — optionally keep in localStorage if backend returns token
        if (data.token) localStorage.setItem("token", data.token);
        window.location.href = "/dashboard.html";
      } else {
        // show readable server error
        alert("❌ " + (data.msg || "Registration failed"));
      }
    } catch (err) {
      console.error("Network/error:", err);
      alert("⚠️ Could not connect to server. Is the backend running?");
    }
  });
});
