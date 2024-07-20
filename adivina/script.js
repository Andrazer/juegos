document.addEventListener('DOMContentLoaded', () => {
    const min = 1;
    const max = 100;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const guessInput = document.getElementById('guess');
    const checkButton = document.getElementById('check-button');
    const resultText = document.getElementById('result');
    const restartButton = document.getElementById('restart-button');
    
    function checkGuess() {
        const userGuess = Number(guessInput.value);
        if (userGuess < min || userGuess > max) {
            resultText.textContent = `Por favor, ingresa un número entre ${min} y ${max}.`;
            return;
        }
        if (userGuess === randomNumber) {
            resultText.textContent = '¡Felicidades! Has adivinado el número.';
            checkButton.disabled = true;
            restartButton.style.display = 'inline-block';
        } else if (userGuess < randomNumber) {
            resultText.textContent = 'El número es mayor. Inténtalo de nuevo.';
        } else {
            resultText.textContent = 'El número es menor. Inténtalo de nuevo.';
        }
    }

    function restartGame() {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        guessInput.value = '';
        resultText.textContent = '';
        checkButton.disabled = false;
        restartButton.style.display = 'none';
    }

    checkButton.addEventListener('click', checkGuess);
    restartButton.addEventListener('click', restartGame);
    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = '../index.html'; // Ruta al catálogo de juegos
    });
});
