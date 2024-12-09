const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const blockSize = 20;
let blockX = canvas.width / 2 - blockSize / 2; // Ustawienie na środek
let blockY = 0;
let falling = true;
let blocks = []; // Tablica do przechowywania zablokowanych klocków

function drawBlock() {
    ctx.fillStyle = '#024d83';
    ctx.fillRect(blockX, blockY, blockSize, blockSize);
}

function drawBlockedBlocks() {
    ctx.fillStyle = '#024d83'; // Kolor zablokowanych klocków
    for (let block of blocks) {
        ctx.fillRect(block.x, block.y, blockSize, blockSize);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    if (falling) {
        blockY += 2;
        if (blockY + blockSize >= canvas.height || isColliding()) {
            blockY = Math.floor(blockY / blockSize) * blockSize; // Snap to grid
            falling = false;
            blocks.push({ x: blockX, y: blockY }); // Dodaj zablokowany klocek do tablicy
            spawnNewBlock(); // Generuj nowy klocek
        }
    }
}

function isColliding() {
    for (let block of blocks) {
        if (blockX < block.x + blockSize &&
            blockX + blockSize > block.x &&
            blockY + blockSize >= block.y) {
            return true; // Wykryto kolizję
        }
    }
    return false; // Brak kolizji
}

function spawnNewBlock() {
    blockX = canvas.width / 2 - blockSize / 2; // Ustawienie na środek
    blockY = 0; // Resetuj pozycję Y
    falling = true; // Ustaw, że klocek znowu spada
}

function gameLoop() {
    clearCanvas();
    drawBlockedBlocks(); // Rysuj zablokowane klocki
    update();
    drawBlock();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        blockX -= blockSize;
        if (blockX < 0) {
            blockX = 0;
        }
    } else if (event.key === 'ArrowRight') {
        blockX += blockSize;
        if (blockX + blockSize > canvas.width) {
            blockX = canvas.width - blockSize;
        }
    }
});

gameLoop();
