const messageEl = document.getElementById("message");
const guestSection = document.getElementById("guest-section");
const userSection = document.getElementById("user-section");
const userInfoEl = document.getElementById("user-info");

function showMessage(text, isError) {
  messageEl.textContent = text;
  messageEl.className = isError ? "error" : "ok";
}

function render() {
  const user = getUser();
  guestSection.hidden = user !== null;
  userSection.hidden = user === null;
  if (user) {
    userInfoEl.textContent = "Logged in as " + user.username + " (userId " + user.userId + ")";
  }
}

document.getElementById("signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  try {
    await postJson(SERVICES.user + "/signup", {
      username: form.username.value,
      password: form.password.value,
    });
    form.reset();
    showMessage("Account created. You can log in now.", false);
  } catch (error) {
    showMessage(error.message, true);
  }
});

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  try {
    const user = await postJson(SERVICES.user + "/login", {
      username: form.username.value,
      password: form.password.value,
    });
    saveUser(user);
    form.reset();
    showMessage("", false);
    render();
  } catch (error) {
    showMessage(error.message, true);
  }
});

document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    await postJson(SERVICES.user + "/logout");
  } catch (error) {
    // even if the call fails, the client still forgets the user
  }
  clearUser();
  showMessage("Logged out.", false);
  render();
});

render();
