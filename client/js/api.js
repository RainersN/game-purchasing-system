// Shared helpers for all pages. Later pages will add the game and payment calls here.

const SERVICES = {
  user: "http://localhost:8081",
  game: "http://localhost:8082",     // not built yet
  payment: "http://localhost:8083",  // not built yet
};

// The logged-in user is kept in sessionStorage. There are no tokens (see DESIGN.md):
// later requests just send the userId.
function saveUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

function getUser() {
  const raw = sessionStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

function clearUser() {
  sessionStorage.removeItem("user");
}

// POSTs JSON and returns the parsed response (or null if the body is empty).
// Throws an Error with the service's message when the response is not OK.
async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    throw new Error((data && data.message) || "Request failed (" + response.status + ")");
  }
  return data;
}
