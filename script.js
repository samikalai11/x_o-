const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// إنشاء المربعات
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `🎉 اللاعب ${currentPlayer} فاز! 🎉`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    status.textContent = "😐 تعادل!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `دور اللاعب: ${currentPlayer}`;
}

function checkWin() {
  return winningCombinations.some((combo) => {
    return combo.every((index) => gameState[index] === currentPlayer);
  });
}

resetBtn.addEventListener("click", () => {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  status.textContent = `دور اللاعب: ${currentPlayer}`;
  createBoard();
});

createBoard();
