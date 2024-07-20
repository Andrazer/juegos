const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');
const SIZE = 300;
const LINE_WIDTH = 5;
const WIN_LINE_WIDTH = 10;
const BOARD_SIZE = 3;
const SQUARE_SIZE = SIZE / BOARD_SIZE;
let board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(' '));
let currentPlayer = 'X';
let gameOver = false;

function drawBoard() {
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = LINE_WIDTH;

    for (let i = 1; i < BOARD_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * SQUARE_SIZE, 0);
        ctx.lineTo(i * SQUARE_SIZE, SIZE);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * SQUARE_SIZE);
        ctx.lineTo(SIZE, i * SQUARE_SIZE);
        ctx.stroke();
    }
}

function drawFigures() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = board[row][col];
            if (cell === 'X') {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = LINE_WIDTH;
                ctx.beginPath();
                ctx.moveTo(col * SQUARE_SIZE + 15, row * SQUARE_SIZE + 15);
                ctx.lineTo(col * SQUARE_SIZE + SQUARE_SIZE - 15, row * SQUARE_SIZE + SQUARE_SIZE - 15);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(col * SQUARE_SIZE + SQUARE_SIZE - 15, row * SQUARE_SIZE + 15);
                ctx.lineTo(col * SQUARE_SIZE + 15, row * SQUARE_SIZE + SQUARE_SIZE - 15);
                ctx.stroke();
            } else if (cell === 'O') {
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = LINE_WIDTH;
                ctx.beginPath();
                ctx.arc(col * SQUARE_SIZE + SQUARE_SIZE / 2, row * SQUARE_SIZE + SQUARE_SIZE / 2, SQUARE_SIZE / 2 - 15, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    }
}

function checkWinner(player) {
    const winningLineWidth = WIN_LINE_WIDTH;
    const color = player === 'X' ? 'red' : 'blue';

    for (let row = 0; row < BOARD_SIZE; row++) {
        if (board[row].every(cell => cell === player)) {
            drawHorizontalWinningLine(row, color);
            return true;
        }
    }

    for (let col = 0; col < BOARD_SIZE; col++) {
        if (board.every(row => row[col] === player)) {
            drawVerticalWinningLine(col, color);
            return true;
        }
    }

    if (board.every((row, i) => row[i] === player)) {
        drawDiagonal(0, 0, SIZE, SIZE, color);
        return true;
    }

    if (board.every((row, i) => row[BOARD_SIZE - 1 - i] === player)) {
        drawDiagonal(SIZE, 0, 0, SIZE, color);
        return true;
    }

    return false;
}

function drawHorizontalWinningLine(row, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = WIN_LINE_WIDTH;
    ctx.beginPath();
    ctx.moveTo(0, row * SQUARE_SIZE + SQUARE_SIZE / 2);
    ctx.lineTo(SIZE, row * SQUARE_SIZE + SQUARE_SIZE / 2);
    ctx.stroke();
}

function drawVerticalWinningLine(col, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = WIN_LINE_WIDTH;
    ctx.beginPath();
    ctx.moveTo(col * SQUARE_SIZE + SQUARE_SIZE / 2, 0);
    ctx.lineTo(col * SQUARE_SIZE + SQUARE_SIZE / 2, SIZE);
    ctx.stroke();
}

function drawDiagonal(x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = WIN_LINE_WIDTH;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function displayMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    setTimeout(() => {
        resetGame();
        messageDiv.textContent = '';
    }, 2000);
}

function resetGame() {
    board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(' '));
    currentPlayer = 'X';
    gameOver = false;
    drawBoard();
}

canvas.addEventListener('click', (e) => {
    if (gameOver) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / SQUARE_SIZE);
    const row = Math.floor(y / SQUARE_SIZE);

    if (board[row][col] === ' ') {
        board[row][col] = currentPlayer;
        if (checkWinner(currentPlayer)) {
            gameOver = true;
            displayMessage(`¡Jugador ${currentPlayer} ha ganado!`);
        } else if (board.flat().every(cell => cell !== ' ')) {
            gameOver = true;
            displayMessage("¡Empate!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
        drawBoard();
        drawFigures();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'r') {
        resetGame();
    }
});


document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = '../index.html'; // Ruta al catálogo de juegos
});


drawBoard();
