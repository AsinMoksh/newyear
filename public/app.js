const socket = io();
let username = "";
let room = "";

function joinRoom() {
  username = document.getElementById("username").value || "Guest";
  room = document.getElementById("room").value;
  socket.emit("joinRoom", room);
  alert(`Joined ${room} room`);
}

function sendMessage() {
  const msg = document.getElementById("msg").value;
  socket.emit("chat", `${username}: ${msg}`);
  document.getElementById("msg").value = "";
}

socket.on("chat", (msg) => {
  document.getElementById("chatBox").innerHTML += `<p>${msg}</p>`;
});

// COUNTDOWN
const target = new Date("Jan 1, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "🎆 HAPPY NEW YEAR 2026 🎆";
    launchFireworks();
    return;
  }

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  // Show only seconds when less than 1 minute left
  if (diff <= 60000) { // 60 seconds
    document.getElementById("countdown").innerHTML = `${s}s`;
  } else {
    document.getElementById("countdown").innerHTML =
      `${d}d ${h}h ${m}m ${s}s`;
  }
}, 1000);

// FIREWORKS 🎆
function launchFireworks() {
  setInterval(() => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 }
    });
  }, 800);
}
