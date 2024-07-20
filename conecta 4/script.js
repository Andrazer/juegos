document.addEventListener('DOMContentLoaded', () => {
    const rows = 6;
    const cols = 7;
    const board = [];
    let currentPlayer = 'red'; // 'red' or 'yellow'
    let gameOver = false;

    const gameBoard = document.getElementById('game-board');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');
    const backButton = document.getElementById('back-button');

    function createBoard() {
        gameBoard.innerHTML = '';
        for (let row = 0; row < rows; row++) {
            board[row] = [];
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', handleCellClick);
                gameBoard.appendChild(cell);
                board[row][col] = null;
            }
        }
    }

    function handleCellClick(event) {
        if (gameOver) return;

        const cell = event.target;
        const col = parseInt(cell.dataset.col);
        const row = getAvailableRow(col);

        if (row === null) return;

        board[row][col] = currentPlayer;
        updateBoard();

        if (checkWinner(row, col)) {
            message.textContent = `¡Jugador ${currentPlayer === 'red' ? 1 : 2} ha ganado!`;
            gameOver = true;
            restartButton.style.display = 'inline-block';
        } else if (board.flat().every(cell => cell !== null)) {
            message.textContent = '¡Es un empate!';
            gameOver = true;
            restartButton.style.display = 'inline-block';
        } else {
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            message.textContent = `Jugador ${currentPlayer === 'red' ? 1 : 2}, es tu turno.`;
        }
    }

    function getAvailableRow(col) {
        for (let row = rows - 1; row >= 0; row--) {
            if (board[row][col] === null) {
                return row;
            }
        }
        return null;
    }

    function updateBoard() {
        Array.from(gameBoard.children).forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.className = 'cell';
            if (board[row][col]) {
                cell.classList.add(board[row][col]);
            }
        });
    }

    function checkWinner(row, col) {
        const directions = [
            { row: 0, col: 1 }, // Horizontal
            { row: 1, col: 0 }, // Vertical
            { row: 1, col: 1 }, // Diagonal Descendente
            { row: 1, col: -1 } // Diagonal Ascendente
        ];

        for (const { row: rDir, col: cDir } of directions) {
            let count = 1;
            for (let i = 1; i < 4; i++) {
                const r = row + i * rDir;
                const c = col + i * cDir;
                if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== currentPlayer) {
                    break;
                }
                count++;
            }
            for (let i = 1; i < 4; i++) {
                const r = row - i * rDir;
                const c = col - i * cDir;
                if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== currentPlayer) {
                    break;
                }
                count++;
            }
            if (count >= 4) {
                return true;
            }
        }
        return false;
    }

    function restartGame() {
        createBoard();
        currentPlayer = 'red';
        gameOver = false;
        message.textContent = 'Jugador 1, es tu turno.';
        restartButton.style.display = 'none';
    }

    restartButton.addEventListener('click', restartGame);
    backButton.addEventListener('click', () => {
        window.location.href = '../index.html'; // Ruta al catálogo de juegos
    });

    createBoard();
});
