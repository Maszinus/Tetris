const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const blockSize = 20;
let blockX = canvas.width / 2 - blockSize / 2;
let blockY = 0;
let falling = true;

function drawBlock() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(blockX, blockY, blockSize, blockSize);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    if (falling) {
        blockY += 2;
        if (blockY + blockSize >= canvas.height) {
            blockY = canvas.height - blockSize;
            falling = false;
        }
    }
}

function gameLoop() {
    clearCanvas();
    update();
    drawBlock();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        blockX -= 20;
        if (blockX < 0) {
            blockX = 0;
        }
    } else if (event.key === 'ArrowRight') {
        blockX += 20;
        if (blockX + blockSize > canvas.width) {
            blockX = canvas.width - blockSize;
        }
    }
});

gameLoop();