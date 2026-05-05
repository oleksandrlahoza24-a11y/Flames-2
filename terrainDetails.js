// terrainDetails.js
const Details = {
    assets: [],

    // Generate decorations for a specific platform
    generateForPlatform(platformX, platformW) {
        const amount = Math.floor(Math.random() * 3); // 0 to 2 items per platform
        for (let i = 0; i < amount; i++) {
            const type = Math.random() > 0.5 ? 'tree' : 'bush';
            const x = platformX + (Math.random() * platformW);
            this.assets.push({
                x: x,
                type: type,
                size: 20 + Math.random() * 40,
                flip: Math.random() > 0.5
            });
        }
    },

    draw(ctx, viewOffset) {
        ctx.fillStyle = "#000";
        this.assets.forEach(asset => {
            ctx.save();
            ctx.translate(asset.x - viewOffset, window.innerHeight - 250);
            if (asset.flip) ctx.scale(-1, 1);

            if (asset.type === 'tree') {
                this.drawTree(ctx, asset.size);
            } else {
                this.drawBush(ctx, asset.size);
            }
            ctx.restore();
        });
    },

    drawTree(ctx, size) {
        // Trunk
        ctx.fillRect(-2, -size, 4, size);
        // Leaves (triangles)
        ctx.beginPath();
        ctx.moveTo(0, -size - (size * 0.5));
        ctx.lineTo(-size/2, -size/3);
        ctx.lineTo(size/2, -size/3);
        ctx.fill();
    },

    drawBush(ctx, size) {
        ctx.beginPath();
        ctx.arc(0, 0, size/2, Math.PI, 0);
        ctx.arc(-size/4, -size/4, size/3, Math.PI, 0);
        ctx.arc(size/4, -size/5, size/3, Math.PI, 0);
        ctx.fill();
    },

    clear() {
        this.assets = [];
    }
};
