document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scale = 20;
    const rows = canvas.height / scale;
    const cols = canvas.width / scale;
    
    let snake = [{ x: 10 * scale, y: 10 * scale }];
    let direction = 'RIGHT';
    let food = { x: Math.floor(Math.random() * cols) * scale, y: Math.floor(Math.random() * rows) * scale };
    let gameOver = false;
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw food
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'darkorange';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(food.x + scale / 2, food.y + scale / 2, scale / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Draw snake
        ctx.fillStyle = 'limegreen';
        ctx.strokeStyle = 'darkgreen';
        ctx.lineWidth = 2;
        snake.forEach(part => {
            ctx.beginPath();
            ctx.arc(part.x + scale / 2, part.y + scale / 2, scale / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });
        
        // Move snake
        const head = { ...snake[0] };
        if (direction === 'RIGHT') head.x += scale;
        if (direction === 'LEFT') head.x -= scale;
        if (direction === 'UP') head.y -= scale;
        if (direction === 'DOWN') head.y += scale;
        
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            food = { x: Math.floor(Math.random() * cols) * scale, y: Math.floor(Math.random() * rows) * scale };
        } else {
            snake.pop();
        }
        
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)) {
            gameOver = true;
            document.getElementById('message').textContent = '¡Game Over! Presiona "Jugar de Nuevo".';
            document.getElementById('restart-button').style.display = 'inline-block';
        }
    }
    
    function collision(head) {
        return snake.some(part => part.x === head.x && part.y === head.y);
    }
    
    function handleKeyPress(event) {
        if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
        if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
        if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
        if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    }
    
    function restartGame() {
        snake = [{ x: 10 * scale, y: 10 * scale }];
        direction = 'RIGHT';
        food = { x: Math.floor(Math.random() * cols) * scale, y: Math.floor(Math.random() * rows) * scale };
        gameOver = false;
        document.getElementById('message').textContent = 'Usa las teclas de flecha para mover la serpiente.';
        document.getElementById('restart-button').style.display = 'none';
    }
    
    document.getElementById('restart-button').addEventListener('click', restartGame);
    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = '../index.html'; // Ruta al catálogo de juegos
    });
    
    document.addEventListener('keydown', handleKeyPress);
    
    setInterval(draw, 200); // Ajusta aquí la velocidad del juego
});
