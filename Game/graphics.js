// graphics.js
const Graphics = {
    canvas: document.getElementById('gameCanvas'),
    ctx: document.getElementById('gameCanvas').getContext('2d'),

    render(state) {
        const { ctx, canvas } = this;
        const groundY = canvas.height * 0.7;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw Ambiance (Details)
        Details.draw(ctx, groundY, state.viewOffset);

        // 2. Draw Curvy Ground
        ctx.save();
        ctx.translate(-state.viewOffset, 0);
        ctx.fillStyle = "#000";
        ctx.beginPath();
        
        // Start shape off-screen left
        ctx.moveTo(state.platforms[0].x - 100, canvas.height);
        
        state.platforms.forEach((p, i) => {
            // Draw to the start of platform
            ctx.lineTo(p.x, groundY);
            // Draw across the platform
            ctx.lineTo(p.x + p.w, groundY);
            
            // Curve to the next platform
            const next = state.platforms[i + 1];
            if (next) {
                const midX = (p.x + p.w + next.x) / 2;
                ctx.bezierCurveTo(
                    p.x + p.w + 40, groundY, 
                    midX, groundY + 120, 
                    next.x, groundY
                );
            }
        });

        // Close shape off-screen right
        ctx.lineTo(state.platforms[state.platforms.length - 1].x + 200, canvas.height);
        ctx.fill();

        // 3. Draw Bridge
        if (state.bridge.length > 0) {
            ctx.save();
            const startX = state.platforms[0].x + state.platforms[0].w;
            ctx.translate(startX, groundY);
            ctx.rotate(state.bridge.angle * Math.PI / 180);
            ctx.fillRect(-3, -state.bridge.length, 6, state.bridge.length);
            ctx.restore();
        }

        // 4. Draw Player
        ctx.fillRect(state.player.x, state.player.y, 20, 20);

        ctx.restore();
    }
};
