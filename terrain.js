const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const gameOverEl = document.getElementById('game-over');
const instructionEl = document.getElementById('instructions');

// Game Constants
const PLATFORM_HEIGHT = 250;
const PLAYER_SIZE = 20;
const BRIDGE_WIDTH = 4;
const GROWTH_SPEED = 4; 

let score = 0;
let gameActive = true;
let platforms = [];
let bridge = { length: 0, angle: 0, active: false, dropping: false };
let player = { x: 0, y: 0, targetX: 0, moving: false };
let viewOffset = 0;
let targetViewOffset = 0;

// Initialize Game
function init() {
    resize();
    resetGame();
    animate();
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function resetGame() {
    score = 0;
    scoreEl.innerText = score;
    gameActive = true;
    gameOverEl.style.display = 'none';
    instructionEl.style.opacity = 1;
    viewOffset = 0;
    targetViewOffset = 0;
    
    // Initial Platforms
    platforms = [
        { x: 50, w: 80 },
        { x: 250, w: 60 }
    ];
    
    player.x = platforms[0].x + platforms[0].w - PLAYER_SIZE - 5;
    player.y = canvas.height - PLATFORM_HEIGHT - PLAYER_SIZE;
    player.moving = false;
    
    bridge = { length: 0, angle: 0, active: false, dropping: false };
}

// Procedural Generation
function generatePlatform() {
    const last = platforms[platforms.length - 1];
    const minGap = 50;
    const maxGap = 200;
    const minWidth = 40;
    const maxWidth = 100;
    
    const x = last.x + last.w + Math.random() * (maxGap - minGap) + minGap;
    const w = Math.random() * (maxWidth - minWidth) + minWidth;
    
    platforms.push({ x, w });
}

// Touch Handling (iPad)
window.addEventListener('touchstart', (e) => {
    if (!gameActive || player.moving || bridge.dropping) return;
    bridge.active = true;
    bridge.length = 0;
    bridge.angle = 0;
    instructionEl.style.opacity = 0;
});

window.addEventListener('touchend', () => {
    if (bridge.active) {
        bridge.active = false;
        bridge.dropping = true;
    }
});

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Smooth camera transition
    viewOffset += (targetViewOffset - viewOffset) * 0.1;
    
    ctx.save();
    ctx.translate(-viewOffset, 0);

    // Draw Terrain (Black)
    ctx.fillStyle = '#000';
    platforms.forEach(p => {
        ctx.fillRect(p.x, canvas.height - PLATFORM_HEIGHT, p.w, PLATFORM_HEIGHT);
    });

    // Draw Bridge (Black)
    if (bridge.length > 0 || bridge.active) {
        ctx.save();
        const startX = platforms[0].x + platforms[0].w;
        const startY = canvas.height - PLATFORM_HEIGHT;
        ctx.translate(startX, startY);
        ctx.rotate(bridge.angle * Math.PI / 180);
        ctx.fillRect(-BRIDGE_WIDTH/2, -bridge.length, BRIDGE_WIDTH, bridge.length);
        ctx.restore();
    }

    // Draw Player (Black Square)
    ctx.fillRect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE);

    ctx.restore();

    update();
    requestAnimationFrame(animate);
}

function update() {
    if (!gameActive) return;

    // 1. Grow Bridge
    if (bridge.active) {
        bridge.length += GROWTH_SPEED;
    }

    // 2. Drop Bridge
    if (bridge.dropping) {
        bridge.angle += 5;
        if (bridge.angle >= 90) {
            bridge.angle = 90;
            bridge.dropping = false;
            checkSuccess();
        }
    }

    // 3. Move Player
    if (player.moving) {
        player.x += 5;
        if (player.x >= player.targetX) {
            player.x = player.targetX;
            player.moving = false;
            
            // Cleanup old platform and shift view
            score++;
            scoreEl.innerText = score;
            platforms.shift();
            generatePlatform();
            targetViewOffset = platforms[0].x - 50;
            bridge.length = 0;
            bridge.angle = 0;
        }
    }
}

function checkSuccess() {
    const nextPlatform = platforms[1];
    const bridgeTip = platforms[0].x + platforms[0].w + bridge.length;
    
    if (bridgeTip >= nextPlatform.x && bridgeTip <= nextPlatform.x + nextPlatform.w) {
        // Success!
        player.moving = true;
        player.targetX = nextPlatform.x + nextPlatform.w - PLAYER_SIZE - 5;
    } else {
        // Fail - Fall animation
        setTimeout(() => {
            gameActive = false;
            gameOverEl.style.display = 'block';
        }, 500);
    }
}

// Start
window.addEventListener('resize', resize);
init();
