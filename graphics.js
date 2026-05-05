// graphics.js
const Graphics = {
    canvas: document.getElementById('gameCanvas'),
    ctx: document.getElementById('gameCanvas').getContext('2d'),

    init() {
        window.addEventListener('resize', () => this.resize());
        this.resize();
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    draw(gameState) {
        const { ctx, canvas } = this;
        const groundY = canvas.height - 250;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Ambiance Assets (Background)
        Details.draw(ctx, gameState.viewOffset);

        // Draw Curvy Terrain
        ctx.save();
        ctx.translate(-gameState.viewOffset, 0);
        ctx.fillStyle = "#000";
        
        ctx.beginPath();
        ctx.moveTo(gameState.platforms[0].x, canvas.height);
        
        gameState.platforms.forEach((p, i) => {
            // Line to start of platform
            ctx.lineTo(p.x, groundY);
            // Line across platform
            ctx.lineTo(p.x + p.w, groundY);
            
            // Draw curve to next platform
            if (gameState.platforms[i+1]) {
                const next = gameState.platforms[i+1];
                const midX = (p.x + p.w + next.x) / 2;
                // Create a "dip" between platforms
                ctx.bezierCurveTo(p.x + p.w + 20, groundY, midX, groundY + 100, next.x, groundY);
            }
        });

        ctx.lineTo(canvas.width * 10, canvas.height); // Close the shape way off screen
        ctx.fill();

        // Draw Bridge
        if (gameState.bridge.length > 0) {
            ctx.save();
            const b = gameState.bridge;
            const startX = gameState.platforms[0].x + gameState.platforms[0].w;
            ctx.translate(startX, groundY);
            ctx.rotate(b.angle * Math.PI / 180);
            ctx.fillRect(-2, -b.length, 4, b.length);
            ctx.restore();
        }

        // Draw Player
        ctx.fillRect(gameState.player.x, gameState.player.y, 20, 20);

        ctx.restore();
    }
};

Graphics.init();
