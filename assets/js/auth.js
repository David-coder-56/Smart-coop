document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const forgotForm = document.getElementById("forgotForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          alert("✅ Login successful!");
          localStorage.setItem("token", data.token);
          window.location.href = "/dashboard.html";
        } else {
          alert("❌ " + data.msg);
        }
      } catch (err) {
        console.error("Error:", err);
        alert("⚠️ Server error.");
      }
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;

      try {
        const res = await fetch("http://localhost:5000/api/auth/forgot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
          alert("📧 Reset link sent to your email.");
        } else {
          alert("❌ " + data.msg);
        }
      } catch (err) {
        console.error("Error:", err);
        alert("⚠️ Server error.");
      }
    });
  }
});
