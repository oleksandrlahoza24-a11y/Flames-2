const Graphics = (() => {

  function drawSky(ctx, W, H, groundY) {
    const grad = ctx.createLinearGradient(0, 0, 0, groundY);
    grad.addColorStop(0, ASSETS.colors.skyTop);
    grad.addColorStop(1, ASSETS.colors.skyBottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, groundY);
  }

  function drawFloor(ctx, W, H, groundY) {
    const F = ASSETS.floor;

    const dirtGrad = ctx.createLinearGradient(0, groundY, 0, H);
    dirtGrad.addColorStop(0, F.grassShadow);
    dirtGrad.addColorStop(0.15, F.dirtColor);
    dirtGrad.addColorStop(1, "#2a1f14");
    ctx.fillStyle = dirtGrad;
    ctx.fillRect(0, groundY, W, H - groundY);

    const grassGrad = ctx.createLinearGradient(0, groundY - 8, 0, groundY + 12);
    grassGrad.addColorStop(0, F.grassHighlight);
    grassGrad.addColorStop(0.5, F.grassColor);
    grassGrad.addColorStop(1, F.grassShadow);
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, groundY - 4, W, 16);

    const reflGrad = ctx.createLinearGradient(0, groundY, 0, groundY + 40);
    reflGrad.addColorStop(0, F.reflectionColor.replace(")", `,${F.reflectionAlpha})`).replace("rgb", "rgba").replace("#", "rgba(").replace(/([0-9a-f]{2})/gi, (m, h) => parseInt(h, 16) + ",").slice(0, -1) + ")");
    reflGrad.addColorStop(1, "rgba(0,0,0,0)");

    ctx.save();
    ctx.globalAlpha = F.reflectionAlpha;
    ctx.fillStyle = F.reflectionColor;
    const reflLinear = ctx.createLinearGradient(0, groundY, 0, groundY + 38);
    reflLinear.addColorStop(0, F.reflectionColor);
    reflLinear.addColorStop(1, "transparent");
    ctx.fillStyle = reflLinear;
    ctx.fillRect(0, groundY, W, 38);
    ctx.restore();
  }

  function drawGrassBlades(ctx, W, groundY, seed) {
    const F = ASSETS.floor;
    const rng = seededRng(seed + 999);
    for (let i = 0; i < F.bladeCount; i++) {
      const x    = rng() * W;
      const lean  = (rng() - 0.5) * F.bladeSpread;
      const h     = F.bladeHeight * (0.6 + rng() * 0.8);
      const bright = rng() > 0.5;
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.quadraticCurveTo(x + lean, groundY - h * 0.6, x + lean * 1.4, groundY - h);
      ctx.strokeStyle = bright ? F.grassHighlight : F.grassColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function drawTree(ctx, groundY, tree, x, scale) {
    const tw  = tree.trunkWidth  * scale;
    const th  = tree.trunkHeight * scale;
    const rx  = tree.canopyRadiusX * scale;
    const ry  = tree.canopyRadiusY * scale;
    const ty  = groundY - th;

    ctx.save();
    ctx.globalAlpha = tree.shadowAlpha;
    ctx.beginPath();
    ctx.ellipse(x, groundY - 2, rx * 0.8, 10 * scale, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.restore();

    const trunkGrad = ctx.createLinearGradient(x - tw / 2, 0, x + tw / 2, 0);
    trunkGrad.addColorStop(0, "#3a2510");
    trunkGrad.addColorStop(0.4, tree.trunkColor);
    trunkGrad.addColorStop(1, "#2a1a08");
    ctx.fillStyle = trunkGrad;
    ctx.fillRect(x - tw / 2, ty, tw, th + 4);

    const canopyGrad = ctx.createRadialGradient(x - rx * 0.2, ty - ry * 0.3, ry * 0.1, x, ty, ry);
    canopyGrad.addColorStop(0, tree.canopyLight);
    canopyGrad.addColorStop(0.5, tree.canopyColor);
    canopyGrad.addColorStop(1, tree.canopyDark);
    ctx.beginPath();
    ctx.ellipse(x, ty, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = canopyGrad;
    ctx.fill();

    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.beginPath();
    ctx.ellipse(x - rx * 0.15, ty - ry * 0.1, rx * 0.5, ry * 0.4, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();
  }

  function drawBush(ctx, groundY, bush, x, scale) {
    const rx = bush.radiusX * scale;
    const ry = bush.radiusY * scale;
    const by = groundY - ry * 0.6;

    ctx.save();
    ctx.globalAlpha = bush.shadowAlpha;
    ctx.beginPath();
    ctx.ellipse(x, groundY - 2, rx * 0.9, 7 * scale, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.restore();

    const bushGrad = ctx.createRadialGradient(x - rx * 0.2, by - ry * 0.25, 2, x, by, rx);
    bushGrad.addColorStop(0, bush.colorLight);
    bushGrad.addColorStop(0.5, bush.color);
    bushGrad.addColorStop(1, bush.colorDark);
    ctx.beginPath();
    ctx.ellipse(x, by, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = bushGrad;
    ctx.fill();

    if (bush.flowerColor && bush.flowerCount) {
      const fc = bush.flowerCount;
      for (let i = 0; i < fc; i++) {
        const fx = x + (i / fc - 0.5) * rx * 1.4;
        const fy = by - ry * 0.3 + Math.sin(i * 1.7) * ry * 0.3;
        ctx.beginPath();
        ctx.arc(fx, fy, 4 * scale, 0, Math.PI * 2);
        ctx.fillStyle = bush.flowerColor;
        ctx.fill();
      }
    }
  }

  function seededRng(seed) {
    let s = seed;
    return () => {
      s = (s * 16807 + 0) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  return { drawSky, drawFloor, drawGrassBlades, drawTree, drawBush, seededRng };
})();
