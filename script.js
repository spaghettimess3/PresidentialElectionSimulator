// Shared data
const candidatesPool = [
  {name: "Alex Rivera", party: "Dem", strength: 85, color: "#1e90ff"},
  {name: "Jordan Hale", party: "Rep", strength: 82, color: "#ff3333"},
  {name: "Taylor Brooks", party: "Dem", strength: 78, color: "#1e90ff"},
  {name: "Morgan Ellis", party: "Rep", strength: 81, color: "#ff3333"},
  {name: "Casey Quinn", party: "Dem", strength: 79, color: "#1e90ff"},
  {name: "Riley Knox", party: "Rep", strength: 77, color: "#ff3333"}
];

let playerCandidate = null;
let opponentCandidate = null;

// Candidate Selection Screen
function loadCandidates() {
  const container = document.getElementById('candidateList');
  if (!container) return;

  container.innerHTML = '';
  candidatesPool.forEach(cand => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="party ${cand.party === 'Dem' ? 'dem' : 'rep'}">${cand.party}</div>
      <h2>${cand.name}</h2>
      <p>Strength: ${cand.strength}</p>
    `;
    card.onclick = () => {
      playerCandidate = cand;
      alert(`You selected ${cand.name}. Now choose your opponent or let AI pick.`);
    };
    container.appendChild(card);
  });
}

// For election.html
function initElectionMap() {
  const map = L.map('map', { zoomControl: true }).setView([38, -96], 4.2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ''
  }).addTo(map);

  fetch('https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/us-states.json')
    .then(r => r.json())
    .then(data => {
      window.geoLayer = L.geoJSON(data, {
        style: { fillColor: '#1f2a44', weight: 1.5, color: '#4a5f8a', fillOpacity: 0.85 }
      }).addTo(map);
    });
}

function randomOpponent() {
  if (!playerCandidate) {
    alert("Please select your candidate first.");
    return;
  }
  let opp = candidatesPool[Math.floor(Math.random() * candidatesPool.length)];
  while (opp === playerCandidate) opp = candidatesPool[Math.floor(Math.random() * candidatesPool.length)];

  opponentCandidate = opp;
  window.location.href = "election.html";
}

// Run when election.html loads
if (document.getElementById('map')) {
  initElectionMap();
  // You can add more logic here for displaying chosen candidates
}

// Add this at the bottom of script.js for the selection page
if (document.getElementById('candidateList')) {
  loadCandidates();
}
