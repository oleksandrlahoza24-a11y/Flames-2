// terrainDetails.js
const Details = {
    list: [],

    // Add decorations to a platform
    add(x, w) {
        const count = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < count; i++) {
            this.list.push({
                x: x + (Math.random() * w),
                type: Math.random() > 0.5 ? 'tree' : 'bush',
                size: 20 + Math.random() * 35
            });
        }
    },

    draw(ctx, groundY, viewOffset) {
        ctx.fillStyle = "#000";
        this.list.forEach(item => {
            ctx.save();
            ctx.translate(item.x - viewOffset, groundY);
            
            if (item.type === 'tree') {
                // Trunk
                ctx.fillRect(-2, -item.size, 4, item.size);
                // Foliage
                ctx.beginPath();
                ctx.moveTo(0, -item.size * 1.6);
                ctx.lineTo(-item.size/2, -item.size/2);
                ctx.lineTo(item.size/2, -item.size/2);
                ctx.fill();
            } else {
                // Bush
                ctx.beginPath();
                ctx.arc(0, 0, item.size/2, Math.PI, 0);
                ctx.fill();
            }
            ctx.restore();
        });
    },

    clear() {
        this.list = [];
    }
};
