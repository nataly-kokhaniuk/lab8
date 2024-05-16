const tilesContainer = document.querySelector(".tiles");
const colors = ["white", "green", "crimson", "blue", "purple", "gold", "pink", "silver"];
const colors6 = ["white", "black","green", "crimson", "blue", "purple", "gold", "pink", "silver","white", "black","green", "crimson", "blue", "purple", "gold", "pink", "silver"];
let colorsPicklist = [...colors, ...colors];
let tileCount = colorsPicklist.length;
let colorsPicklist6 = [...colors, ...colors];
let tileCount6 = colorsPicklist.length;
let timerInterval;

// Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;
let timeRemaining = 180;
let pairsFound = 0;
let startTime;

// Function to build a tile
function buildTile(color) {
  const element = document.createElement("div");

  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    if (awaitingEndOfMove || element.getAttribute("data-revealed") === "true" || element === activeTile) {
      return;
    }

    element.style.backgroundColor = color;

    if (!activeTile) {
      activeTile = element;
      return;
    }

    if (activeTile.getAttribute("data-color") === color) {
      element.setAttribute("data-revealed", "true");
      activeTile.setAttribute("data-revealed", "true");
      activeTile = null;
      awaitingEndOfMove = false;
      revealedCount += 2;
      pairsFound += 1;
      document.querySelector(".pares span").textContent = pairsFound;

      if (revealedCount === tileCount) {
        clearInterval(timerInterval);
        const timeTaken = 180 - timeRemaining; // Calculate time taken to win
        document.querySelector(".timer span").textContent = timeTaken;
        alert(`You win! Time taken: ${timeTaken} seconds`);
        disableTiles();
        document.getElementById("newGameButton").disabled = false;
      }
      return;
    }

    awaitingEndOfMove = true;
    setTimeout(() => {
      activeTile.style.backgroundColor = null;
      element.style.backgroundColor = null;
      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000);
  });

  return element;
}

// Function to start a new game
function startNewGame() {
  tilesContainer.innerHTML = "";
  revealedCount = 0;
  pairsFound = 0;
  document.querySelector(".pares span").textContent = pairsFound;
  activeTile = null;
  awaitingEndOfMove = false;
  colorsPicklist = shuffleArray([...colors, ...colors]);
  tileCount = colorsPicklist.length;
  for (let i = 0; i < tileCount; i++) {
    const tile = buildTile(colorsPicklist[i]);
    tilesContainer.appendChild(tile);
  }

  timeRemaining = 180; // Reset timeRemaining to 180
  document.querySelector(".timer span").textContent = timeRemaining;
  clearInterval(timerInterval);
  disableTiles();
  document.getElementById("changeGameButton").disabled = false;
  document.getElementById("startGameButton").disabled = false;
}
// Function to start a new game
function startNewGame6() {
  tilesContainer.innerHTML = "";
  revealedCount = 0;
  pairsFound = 0;
  document.querySelector(".pares span").textContent = pairsFound;
  activeTile = null;
  awaitingEndOfMove = false;
  colorsPicklist6 = shuffleArray([...colors6, ...colors6]);
  tileCount6 = colorsPicklist6.length;
  for (let i = 0; i < tileCount6; i++) {
    const tile = buildTile(colorsPicklist6[i]);
    tilesContainer.appendChild(tile);
  }

  timeRemaining = 180; // Reset timeRemaining to 180
  document.querySelector(".timer span").textContent = timeRemaining;
  clearInterval(timerInterval);
  disableTiles();
  document.getElementById("changeGameButton").disabled = false;
  document.getElementById("startGameButton").disabled = false;
}

// Function to handle starting the game
function startGame() {
  enableTiles();
  document.getElementById("changeGameButton").disabled = true;
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to handle changing game settings
function changeGame() {
  const settings = document.getElementById("settings");
  settings.style.display = settings.style.display === "block" ? "none" : "block";
}

// Function to apply new settings
function applySettings() {
  const difficulty = document.getElementById("difficulty").value;
  timeRemaining = parseInt(difficulty);
  document.querySelector(".timer span").textContent = timeRemaining;
  document.getElementById("settings").style.display = "none";
}

// Function to update the timer
function updateTimer() {
  timeRemaining -= 1;
  document.querySelector(".timer span").textContent = timeRemaining;

  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    alert("Time's up! You lose.");
    disableTiles();
    document.getElementById("newGameButton").disabled = false;
  }
}

// Function to enable tiles
function enableTiles() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(tile => tile.style.pointerEvents = "auto");
}

// Function to disable tiles
function disableTiles() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(tile => tile.style.pointerEvents = "none");
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Event listeners for buttons
document.getElementById("newGameButton").addEventListener("click", () => {
  startNewGame();
  document.getElementById("startGameButton").disabled = false;
});

document.getElementById("startGameButton").addEventListener("click", startGame);
document.getElementById("changeGameButton").addEventListener("click", changeGame);
document.getElementById("applySettings").addEventListener("click", applySettings);

// Initialize the game without starting it
startNewGame();
document.getElementById("startGameButton").disabled = true;
