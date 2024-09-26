const cells = document.querySelectorAll("[data-cell]");
const gameMessage = document.querySelector("[data-gameMessage]");
const restartButton = document.querySelector("[data-restart]");

let isXTurn = true;
let gameState = Array(9).fill(null); // Array to track game state
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

// Event listener for each cell
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(cell, index), { once: true });
});

// Handle click events for each cell
function handleClick(cell, index) {
    if (gameState[index] !== null) return; // Prevent overwriting

    gameState[index] = isXTurn ? "X" : "O";
    cell.textContent = gameState[index];
    cell.dataset.cell = gameState[index];

    if (checkWin()) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        isXTurn = !isXTurn;
        updateGameMessage();
    }
}

// Check for winning combinations
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === (isXTurn ? "X" : "O");
        });
    });
}

// Check for draw (when all cells are filled and there's no winner)
function isDraw() {
    return gameState.every(cell => cell !== null);
}

// End game message (either a draw or a winner)
function endGame(draw) {
    if (draw) {
        gameMessage.textContent = "It's a draw!";
    } else {
        gameMessage.textContent = `${isXTurn ? "X" : "O"} wins!`;
    }
    cells.forEach(cell => cell.removeEventListener("click", handleClick)); // Disable further clicks
}

// Update game message based on whose turn it is
function updateGameMessage() {
    gameMessage.textContent = `It's ${isXTurn ? "X" : "O"}'s turn`;
}

// Restart the game
restartButton.addEventListener("click", restartGame);

function restartGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.removeAttribute("data-cell");
        cell.addEventListener("click", () => handleClick(cell, cell.dataset.index), { once: true });
    });
    isXTurn = true;
    gameMessage.textContent = "It's X's turn";
}

// Initialize message
updateGameMessage();
