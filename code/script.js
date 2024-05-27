const gameContainer = document.getElementById('game-container');
const gameBoard = document.getElementById('tic-tac-toe');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const messagePopup = document.getElementById('message-popup');
const messageText = document.getElementById('message-text');
const newGameButton = document.getElementById('new-game-button');
const quitButton = document.getElementById('quit-button');
const startButton = document.getElementById('start-button');

let currentPlayer = 'X';
let gameBoardState = Array(9).fill('');
let gameActive = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// Adding this function to show the initial message popup
function showInitialMessage() {
    messageText.innerHTML = '<button id="start-again-button">Start Game</button>';
    messagePopup.style.display = 'flex';

    // Adding event listener for the "Start Game" button within the message
    document.getElementById('start-again-button').addEventListener('click', startNewGame);

    // Hiding the "Start Game" button in the game container
    startButton.style.display = 'none';

    // Hiding the Quit button
    quitButton.style.display = 'none';
}

// Calling this function when script loads to show the initial message
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoardState[a] && gameBoardState[a] === gameBoardState[b] && gameBoardState[a] === gameBoardState[c]) {
            gameActive = false;
            return gameBoardState[a];
        }
    }

    if (!gameBoardState.includes('')) {
        gameActive = false;
        return 'draw';
    }

    return null;
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameBoardState[cellIndex] || !gameActive) return;

    gameBoardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    const winner = checkWinner();

    if (winner) {
        endGame(winner);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function endGame(result) {
    gameActive = false;
    if (result === 'draw') {
        messageText.innerHTML = "It's a draw!<button id='quit-result-button'>Quit</button>";
    } else {
        messageText.innerHTML = `Player ${result} wins!<button id='quit-result-button'>Quit</button>`;
    }

    messagePopup.style.display = 'flex';
    resetButton.style.display = 'none';
    newGameButton.style.display = 'block';

    // Adding event listener for the "Quit" button within the result message
    document.getElementById('quit-result-button').addEventListener('click', quitGame);
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameBoardState = Array(9).fill('');

    messageText.textContent = '';
    messagePopup.style.display = 'none';

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });

    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    resetButton.style.display = 'block';
    newGameButton.style.display = 'none';
}

function quitGame() {
    messageText.innerHTML = 'Start Game<button id="start-again-button">Start Game</button>';
    messagePopup.style.display = 'flex';
    gameContainer.style.filter = 'blur(0)'; // Removing the blur effect

    // Reseting the game to the initial state
    gameBoard.innerHTML = '';
    gameActive = false;
    currentPlayer = 'X';
    gameBoardState = Array(9).fill('');
    statusDisplay.textContent = 'Start Game';

    // Hiding the other buttons
    resetButton.style.display = 'none';
    newGameButton.style.display = 'none';

    // Adding event listener for the "Start Game" button within the message
    document.getElementById('start-again-button').addEventListener('click', startNewGame);
}

// ...

function startNewGame() {
    messagePopup.style.display = 'none';
    gameContainer.style.filter = 'blur(0)'; // Removing the blur effect
    resetButton.style.display = 'block';

    // Removing existing grid cells
    gameBoard.innerHTML = '';

    // Creating the grid cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }

    // Initializing game state
    gameActive = true;
    currentPlayer = 'X';
    gameBoardState = Array(9).fill('');
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}


// ...



startButton.addEventListener('click', () => {
    gameContainer.style.filter = 'blur(5px)'; // Adding a blur effect to the game
    startNewGame();
});

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
}

showInitialMessage();
resetButton.addEventListener('click', restartGame);
quitButton.addEventListener('click', quitGame);
newGameButton.addEventListener('click', startNewGame);
// ...

/// ...