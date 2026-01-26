// ===============================
// DATA STORAGE
// ===============================
let workouts = [
  { name: "Ali", activity: "steps", amount: 5000, date: "2026-01-10" },
  { name: "Sara", activity: "minutes", amount: 45, date: "2026-01-11" },
  { name: "John", activity: "distance", amount: 3, date: "2026-01-12" },
  { name: "Aina", activity: "steps", amount: 7000, date: "2026-01-13" }
];

// ===============================
// DOM ELEMENTS
// ===============================
const form = document.getElementById("workoutForm");
const leaderboardList = document.getElementById("leaderboardList");
const recentList = document.getElementById("recentList");
const message = document.getElementById("message");

// ===============================
// EVENT LISTENER
// ===============================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const activity = document.getElementById("activity").value;
  const amount = Number(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  // VALIDATION (SMART CHECKS)
  if (!name || !activity || !amount || !date) {
    message.textContent = "⚠️ Please fill in all fields!";
    message.style.color = "red";
    return;
  }

  if (amount <= 0) {
    message.textContent = "⚠️ Please enter a valid number!";
    message.style.color = "red";
    return;
  }

  // ADD NEW WORKOUT
  workouts.push({ name, activity, amount, date });

  message.textContent = "✅ Activity added successfully!";
  message.style.color = "green";

  form.reset();

  updateLeaderboard();
  updateRecent();
});

// ===============================
// LEADERBOARD LOGIC
// ===============================
function updateLeaderboard(filterActivity = "all") {
  leaderboardList.innerHTML = "";

  let totals = {};

  workouts.forEach(workout => {
    if (filterActivity !== "all" && workout.activity !== filterActivity) return;

    if (!totals[workout.name]) {
      totals[workout.name] = 0;
    }
    totals[workout.name] += workout.amount;
  });

  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([name, total], index) => {
    const li = document.createElement("li");
   li.textContent = `#${index + 1} ${name} - ${total} ${filterActivity !== "all" ? filterActivity : ""}`;
    leaderboardList.appendChild(li);
  });
}

// ===============================
// RECENT ACTIVITIES (LAST 5)
// ===============================
function updateRecent() {
  recentList.innerHTML = "";

  workouts
    .slice(-5)
    .reverse()
    .forEach(workout => {
      const li = document.createElement("li");
      li.textContent = `${workout.name}: ${workout.amount} ${workout.activity} (just now)`;
      recentList.appendChild(li);
    });
}

// ===============================
// FILTER BUTTONS (OPTIONAL)
// ===============================
function filterSteps() {
  updateLeaderboard("steps");
}

function filterMinutes() {
  updateLeaderboard("minutes");
}

function filterDistance() {
  updateLeaderboard("distance");
}

function showAll() {
  updateLeaderboard("all");
}

// ===============================
// INITIAL LOAD
// ===============================
updateLeaderboard();
updateRecent();
