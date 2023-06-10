// Set up some constants
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const blockSize = 20;
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const totalRows = Math.floor(height / blockSize);
const totalCols = Math.floor(width / blockSize);
let gameStarted = false;

// Generate a random initial position for the snake
const spawnLocation = {
    x: Math.floor(Math.random() * totalCols),
    y: Math.floor(Math.random() * totalRows)
};

// Create the snake
let snake = [spawnLocation];
let direction = 'none';

// Create the food
let food = {x: 0, y: 0};

function generateFood() {
    food.x = Math.floor(Math.random() * totalCols);
    food.y = Math.floor(Math.random() * totalRows);
}

generateFood();

// Set up the game loop
let isPaused = false;
let updateInterval = 1000 / 10; // 10 updates per second
function update() {
    // Check if the game is paused or has started
    start()
    if (isPaused || !gameStarted) {
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Update the snake's position
    let head = {x: snake[0].x, y: snake[0].y};
    if (direction === 'right') head.x++;
    else if (direction === 'left') head.x--;
    else if (direction === 'up') head.y--;
    else if (direction === 'down') head.y++;
    snake.unshift(head);

    // Check if the snake has run into the food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        generateFood();
        updateInterval *= 0.9; // Increase the update interval as the snake grows
    } else {
        snake.pop();
    }

    // Check if the snake has run into a wall or itself
    if (
        snake[0].x < 0 ||
        snake[0].x >= totalCols ||
        snake[0].y < 0 ||
        snake[0].y >= totalRows ||
        checkCollision(snake[0], snake.slice(1))
    ) {
        // Game over!
        console.log('Game over!');
        gameOver();
        return;
    }

    // Draw the game
    draw()

    // Schedule the next update
    setTimeout(update, updateInterval);
}

// Draw the snake and the food
function draw() {
    snake.forEach(block => {
        ctx.fillStyle = '#5d61e8';
        ctx.fillRect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
    });
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
}

// Check if the given block is colliding with any blocks in the array
function checkCollision(block, blocks) {
    return blocks.some(otherBlock => block.x === otherBlock.x && block.y === otherBlock.y);
}

// Display the start message
function start() {
    if (gameStarted) return;
    ctx.fillStyle = '#f00';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Display start message
    ctx.fillText('Welcome in SNAKE', width / 2, height / 2);

    ctx.font = '24px sans-serif';
    ctx.fillText(`Press any directional key to start...`, width / 2, height / 2 + 50);

    // We draw the game to let the player see it anyways
    draw()
}

// Display a game over message
function gameOver() {
    ctx.fillStyle = '#f00';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Display the game over message
    ctx.fillText('Game Over!', width / 2, height / 2);

    // Display the player's score
    ctx.font = '24px sans-serif';
    ctx.fillText(`Score: ${snake.length}`, width / 2, height / 2 + 50);

    // Draw the restart button on the canvas
    const buttonText = 'Restart';
    ctx.font = '24px sans-serif';
    const buttonWidth = ctx.measureText(buttonText).width + 40;
    const buttonHeight = 40;
    const buttonX = width / 2 - buttonWidth / 2;
    const buttonY = height / 2 + 90;
    ctx.fillStyle = '#5d61e8';
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(buttonText, width / 2, buttonY + buttonHeight / 2);

    // Check if the mouse is over the button
    const mouse = {x: 0, y: 0};
    canvas.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    // Restart the game when the button is clicked
    canvas.addEventListener('click', e => {
        if (mouse.x >= buttonX && mouse.x <= buttonX + buttonWidth &&
            mouse.y >= buttonY && mouse.y <= buttonY + buttonHeight) {
            restartGame();
        }
    });
}

// Restart the game
function restartGame() {
    // Reset the update interval and game status
    updateInterval = 1000 / 10;
    gameStarted = false;

    // Reset the snake and direction
    snake = [spawnLocation];
    direction = 'none';

    // Generate a new food
    generateFood();

    // Clear the canvas and start the game loop
    ctx.clearRect(0, 0, width, height);
    update();
}

// Set up the arrow keys to control the snake
document.addEventListener('keydown', event => {
    if (event.keyCode === 37 && direction !== 'right') {
        if (!gameStarted) {
            gameStarted = true;
            ctx.clearRect(0, 0, width, height);
            update()
        }
        direction = 'left';
    } else if (event.keyCode === 38 && direction !== 'down') {
        if (!gameStarted) {
            gameStarted = true;
            ctx.clearRect(0, 0, width, height);
            update()
        }
        direction = 'up';
    } else if (event.keyCode === 39 && direction !== 'left') {
        if (!gameStarted) {
            gameStarted = true;
            ctx.clearRect(0, 0, width, height);
            update()
        }
        direction = 'right';
    } else if (event.keyCode === 40 && direction !== 'up') {
        if (!gameStarted) {
            gameStarted = true;
            ctx.clearRect(0, 0, width, height);
            update()
        }
        direction = 'down';
    }

    // Check if the P key was pressed to pause the game
    if (event.keyCode === 80) {
        isPaused = !isPaused;
        update();
    }
});

// Start the game loop
update();
