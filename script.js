const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;
    checkResult();

    if (gameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  });
});

function checkResult() {
  for (let [a,b,c] of winningConditions) {
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      statusText.textContent = `Player ${cells[a].textContent} Wins!`;
      gameActive = false;
      return;
    }
  }

  if ([...cells].every(cell => cell.textContent !== "")) {
    statusText.textContent = "Game Draw!";
    gameActive = false;
  }
}

resetBtn.addEventListener("click", () => {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });

  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's Turn";

  message.textContent = "";
  message.classList.remove("show");
});


const message = document.getElementById("message");
const winSound = document.getElementById("winSound");

function checkResult() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;

    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameActive = false;

      // Highlight winning cells
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      // Show celebration message
      message.textContent = `🎉 Player ${cells[a].textContent} Wins! 🎉`;
      message.classList.add("show");

      // Play sound
      winSound.currentTime = 0;
      winSound.play();

      statusText.textContent = "Game Over";
      return;
    }
  }

  // Draw
  if ([...cells].every(cell => cell.textContent !== "")) {
    message.textContent = "🤝 It's a Draw!";
    message.classList.add("show");
    statusText.textContent = "Game Draw!";
    gameActive = false;
  }
}

