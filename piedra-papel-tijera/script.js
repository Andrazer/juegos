document.addEventListener('DOMContentLoaded', () => {
    const choices = ['piedra', 'papel', 'tijera'];
    const resultText = document.getElementById('result-text');

    function getRandomChoice() {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function getResult(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return '¡Es un empate!';
        }
        if (
            (playerChoice === 'piedra' && computerChoice === 'tijera') ||
            (playerChoice === 'tijera' && computerChoice === 'papel') ||
            (playerChoice === 'papel' && computerChoice === 'piedra')
        ) {
            return '¡Ganaste!';
        }
        return 'Perdiste. Inténtalo de nuevo!';
    }

    function handleClick(choice) {
        const computerChoice = getRandomChoice();
        const result = getResult(choice, computerChoice);
        resultText.textContent = `Elegiste ${choice}. La computadora eligió ${computerChoice}. ${result}`;
    }

    document.getElementById('piedra').addEventListener('click', () => handleClick('piedra'));
    document.getElementById('papel').addEventListener('click', () => handleClick('papel'));
    document.getElementById('tijera').addEventListener('click', () => handleClick('tijera'));

    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = '../index.html'; // Ruta al catálogo de juegos
    });
});
