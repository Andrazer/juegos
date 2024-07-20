document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');
    const backButton = document.getElementById('back-button');
    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let flippedCards = [];
    let matchedPairs = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffle(cardValues);
        board.innerHTML = '';
        cardValues.forEach((value, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;
            card.dataset.index = index;
            card.addEventListener('click', flipCard);
            board.appendChild(card);
        });
        message.textContent = 'Haz clic en una carta para comenzar.';
        restartButton.style.display = 'none';
    }

    function flipCard() {
        if (this.classList.contains('flipped') || this.classList.contains('matched')) {
            return;
        }

        this.classList.add('flipped');
        this.textContent = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            if (matchedPairs === cardValues.length / 2) {
                message.textContent = '¡Has encontrado todos los pares!';
                restartButton.style.display = 'inline-block';
            } else {
                message.textContent = '¡Es un par!';
            }
        } else {
            message.textContent = 'No es un par. Intenta de nuevo.';
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
            }, 1000);
        }
        flippedCards = [];
    }

    function restartGame() {
        matchedPairs = 0;
        flippedCards = [];
        createBoard();
    }

    restartButton.addEventListener('click', restartGame);
    backButton.addEventListener('click', () => {
        window.location.href = '../index.html'; // Ruta al catálogo de juegos
    });

    createBoard();
});
