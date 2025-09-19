// Fake auth handling for now
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const forgotForm = document.getElementById("forgotForm");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Signup successful! (Backend integration needed)");
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login successful! (Backend integration needed)");
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Password reset link sent! (Backend integration needed)");
    });
  }
});

// signup.js
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("✅ Registered! Redirecting...");
      localStorage.setItem("token", data.token); // save token
      window.location.href = "/dashboard.html";  // go to dashboard
    } else {
      alert("❌ " + data.msg);
    }
  } catch (err) {
    console.error("Error:", err);
  }
});