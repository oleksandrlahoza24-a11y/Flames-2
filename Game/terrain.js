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

function resize() {
    Graphics.canvas.width = window.innerWidth;
    Graphics.canvas.height = window.innerHeight;
}

function resetGame() {
    state.score = 0;
    document.getElementById('score').innerText = 0;
    document.getElementById('game-over').style.display = 'none';
    state.gameActive = true;
    state.viewOffset = 0;
    state.targetViewOffset = 0;
    Details.clear();

    const groundY = window.innerHeight * 0.7;

    state.platforms = [
        { x: 50, w: 120 },
        { x: 350, w: 100 }
    ];
    
    Details.add(50, 120);
    Details.add(350, 100);

    state.player.x = 50 + 120 - 30;
    state.player.y = groundY - 20;
    state.bridge = { length: 0, angle: 0, active: false, dropping: false };
}

function update() {
    if (!state.gameActive) return;

    state.viewOffset += (state.targetViewOffset - state.viewOffset) * 0.1;

    if (state.bridge.active) {
        state.bridge.length += 6;
    }

    if (state.bridge.dropping) {
        state.bridge.angle += 10;
        if (state.bridge.angle >= 90) {
            state.bridge.angle = 90;
            state.bridge.dropping = false;
            checkLanding();
        }
    }

    if (state.player.moving) {
        state.player.x += 7;
        if (state.player.x >= state.player.targetX) {
            state.player.x = state.player.targetX;
            state.player.moving = false;
            
            state.score++;
            document.getElementById('score').innerText = state.score;
            
            state.platforms.shift();
            const last = state.platforms[state.platforms.length - 1];
            const nextX = last.x + last.w + 60 + Math.random() * 200;
            const nextW = 50 + Math.random() * 100;
            state.platforms.push({ x: nextX, w: nextW });
            Details.add(nextX, nextW);

            state.targetViewOffset = state.platforms[0].x - 50;
            state.bridge = { length: 0, angle: 0, active: false, dropping: false };
        }
    }
}

function checkLanding() {
    const next = state.platforms[1];
    const bridgeEnd = state.platforms[0].x + state.platforms[0].w + state.bridge.length;
    
    if (bridgeEnd >= next.x && bridgeEnd <= next.x + next.w) {
        state.player.targetX = next.x + next.w - 30;
        state.player.moving = true;
    } else {
        setTimeout(() => {
            state.gameActive = false;
            document.getElementById('game-over').style.display = 'block';
        }, 500);
    }
}

// Global Touch Listeners
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

function gameLoop() {
    update();
    Graphics.render(state);
    requestAnimationFrame(gameLoop);
}

// Initial Boot
window.addEventListener('resize', resize);
resize();
resetGame();
gameLoop();
