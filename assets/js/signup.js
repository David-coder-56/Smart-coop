document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("name").value;
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
          localStorage.setItem("token", data.token);
          window.location.href = "/dashboard.html";
        } else {
          alert(data.msg);
        }
      } catch (err) {
        console.error("Error:", err);
        alert("⚠️ Server error.");
      }
    });
  }
});
