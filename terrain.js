// terrain.js
let state = {
    score: 0,
    gameActive: true,
    platforms: [],
    viewOffset: 0,
    targetViewOffset: 0,
    bridge: { length: 0, angle: 0, active: false, dropping: false },
    player: { x: 0, y: 0, targetX: 0, moving: false }
};

function resetGame() {
    state.score = 0;
    document.getElementById('score').innerText = 0;
    document.getElementById('game-over').style.display = 'none';
    state.gameActive = true;
    state.viewOffset = 0;
    state.targetViewOffset = 0;
    Details.clear();

    // Initial platforms
    state.platforms = [
        { x: 50, w: 100 },
        { x: 300, w: 80 }
    ];
    
    // Generate details for first platforms
    Details.generateForPlatform(50, 100);
    Details.generateForPlatform(300, 80);

    state.player.x = 50 + 100 - 25;
    state.player.y = window.innerHeight - 250 - 20;
    state.bridge = { length: 0, angle: 0, active: false, dropping: false };
}

function generatePlatform() {
    const last = state.platforms[state.platforms.length - 1];
    const x = last.x + last.w + 50 + Math.random() * 200;
    const w = 40 + Math.random() * 100;
    const newPlatform = { x, w };
    state.platforms.push(newPlatform);
    Details.generateForPlatform(x, w);
}

// Input Handling
window.addEventListener('touchstart', (e) => {
    if (!state.gameActive || state.player.moving || state.bridge.dropping) return;
    state.bridge.active = true;
});

window.addEventListener('touchend', () => {
    if (state.bridge.active) {
        state.bridge.active = false;
        state.bridge.dropping = true;
    }
});

function update() {
    if (!state.gameActive) return;

    // View movement
    state.viewOffset += (state.targetViewOffset - state.viewOffset) * 0.1;

    if (state.bridge.active) {
        state.bridge.length += 5;
    }

    if (state.bridge.dropping) {
        state.bridge.angle += 8;
        if (state.bridge.angle >= 90) {
            state.bridge.angle = 90;
            state.bridge.dropping = false;
            checkLanding();
        }
    }

    if (state.player.moving) {
        state.player.x += 6;
        if (state.player.x >= state.player.targetX) {
            state.player.x = state.player.targetX;
            state.player.moving = false;
            state.score++;
            document.getElementById('score').innerText = state.score;
            
            state.platforms.shift();
            generatePlatform();
            state.targetViewOffset = state.platforms[0].x - 50;
            state.bridge = { length: 0, angle: 0, active: false, dropping: false };
        }
    }
}

function checkLanding() {
    const next = state.platforms[1];
    const bridgeEnd = state.platforms[0].x + state.platforms[0].w + state.bridge.length;
    
    if (bridgeEnd >= next.x && bridgeEnd <= next.x + next.w) {
        state.player.targetX = next.x + next.w - 25;
        state.player.moving = true;
    } else {
        setTimeout(() => {
            state.gameActive = false;
            document.getElementById('game-over').style.display = 'block';
        }, 500);
    }
}

function gameLoop() {
    update();
    Graphics.draw(state);
    requestAnimationFrame(gameLoop);
}

// Start
resetGame();
gameLoop();
