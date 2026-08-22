// Redirect to dashboard if already logged in (only on login/signup pages)
async function checkExistingSession() {
  const { data } = await supabaseClient.auth.getSession();
  if (data.session) window.location.href = "dashboard.html";
}
checkExistingSession();

// SIGN UP
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");
    msg.innerHTML = "";

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });

    if (error) {
      msg.innerHTML = `<p class="error-msg">${error.message}</p>`;
      return;
    }

    msg.innerHTML = `<p class="success-msg">Account created! You can now login.</p>`;
    setTimeout(() => window.location.href = "login.html", 1500);
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");
    msg.innerHTML = "";

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
      msg.innerHTML = `<p class="error-msg">${error.message}</p>`;
      return;
    }

    window.location.href = "dashboard.html";
  });
}
