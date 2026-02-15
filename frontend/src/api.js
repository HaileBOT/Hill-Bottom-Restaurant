// API utility for frontend to interact with backend
const API_BASE = "http://localhost:4000/api";

export async function sendContactMessage(data) {
  const res = await fetch(`${API_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function sendReservation(data) {
  const res = await fetch(`${API_BASE}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getMessages() {
  const res = await fetch(`${API_BASE}/messages`);
  return res.json();
}

export async function getReservations() {
  const res = await fetch(`${API_BASE}/reservations`);
  return res.json();
}
