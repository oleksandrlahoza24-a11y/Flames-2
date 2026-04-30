const WorldGen = (() => {

  let objects = [];
  let seed    = 42;

  function generate(W, groundY, newSeed) {
    if (newSeed !== undefined) seed = newSeed;
    objects = [];
    const rng = Graphics.seededRng(seed);

    const worldWidth = W * 3;
    const startX     = -W;

    for (const tree of ASSETS.trees) {
      const count = Math.floor(worldWidth * tree.density * 1000);
      for (let i = 0; i < count; i++) {
        const x     = startX + rng() * worldWidth;
        const scale = tree.minScale + rng() * (tree.maxScale - tree.minScale);
        objects.push({ kind: "tree", type: tree, x, scale, z: scale });
      }
    }

    for (const bush of ASSETS.bushes) {
      const count = Math.floor(worldWidth * bush.density * 1000);
      for (let i = 0; i < count; i++) {
        const x     = startX + rng() * worldWidth;
        const scale = bush.minScale + rng() * (bush.maxScale - bush.minScale);
        objects.push({ kind: "bush", type: bush, x, scale, z: scale * 0.5 });
      }
    }

    objects.sort((a, b) => a.z - b.z);
  }

  function draw(ctx, W, groundY, cameraX) {
    for (const obj of objects) {
      const sx = obj.x - cameraX;
      if (sx < -200 || sx > W + 200) continue;
      if (obj.kind === "tree") {
        Graphics.drawTree(ctx, groundY, obj.type, sx, obj.scale);
      } else if (obj.kind === "bush") {
        Graphics.drawBush(ctx, groundY, obj.type, sx, obj.scale);
      }
    }
  }

  return { generate, draw };
})();
