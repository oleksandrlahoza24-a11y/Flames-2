// effects.js
const PostProcessing = {
    bgLayers: [],
    fgLayers: [],
    
    init() {
        // Create 3 layers of background depth
        for(let i = 0; i < 3; i++) {
            this.bgLayers.push(this.generateLayer(0.2 + (i * 0.2), 5 + (i * 10)));
        }
        // Create 1 extreme foreground layer (closest to camera)
        this.fgLayers.push(this.generateLayer(1.5, 25));
    },

    // Generates a parallax layer with specific speed and blur
    generateLayer(speed, blur) {
        return {
            speed: speed,
            blur: blur,
            elements: []
        };
    },

    // Adds new trees to the parallax layers
    addDecorToLayers(x) {
        [...this.bgLayers, ...this.fgLayers].forEach(layer => {
            if (Math.random() > 0.3) {
                layer.elements.push({
                    x: x + Math.random() * 400,
                    img: TreeGenerator.cache[Math.floor(Math.random() * TreeGenerator.cache.length)],
                    scale: layer.speed * 0.8 + (Math.random() * 0.5)
                });
            }
        });
    },

    drawBackground(ctx, state) {
        this.bgLayers.forEach(layer => {
            ctx.filter = `blur(${layer.blur}px) brightness(1.2)`;
            layer.elements.forEach(el => {
                const scrollX = el.x - (state.viewOffset * layer.speed);
                const w = el.img.width * el.scale;
                const h = el.img.height * el.scale;
                ctx.drawImage(el.img, scrollX, state.groundY - h + 20, w, h);
            });
        });
        ctx.filter = 'none'; // Reset blur for gameplay layer
    },

    drawForeground(ctx, state) {
        this.fgLayers.forEach(layer => {
            // Extreme foreground is very blurred and darker
            ctx.filter = `blur(${layer.blur}px) brightness(0.5)`;
            layer.elements.forEach(el => {
                const scrollX = el.x - (state.viewOffset * layer.speed);
                const w = el.img.width * el.scale;
                const h = el.img.height * el.scale;
                ctx.drawImage(el.img, scrollX, state.groundY - h + 100, w, h);
            });
        });
        ctx.filter = 'none';
    },

    applyMotionBlur(ctx, state) {
        // Calculate velocity for motion blur
        const velocity = Math.abs(state.targetViewOffset - state.viewOffset);
        if (velocity > 1) {
            ctx.canvas.style.filter = `blur(${Math.min(velocity * 0.1, 4)}px)`;
        } else {
            ctx.canvas.style.filter = 'none';
        }
    }
};

PostProcessing.init();
