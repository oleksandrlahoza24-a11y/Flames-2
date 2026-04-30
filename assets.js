const ASSETS = {
  colors: {
    background:   "#1a1a2e",
    ground:       "#16213e",
    player:       "#e94560",
    playerShadow: "#a0213f",
    playerShine:  "#ff7096",
    buttonBg:     "#0f3460",
    buttonBorder: "#e94560",
    buttonText:   "#ffffff",
    trail:        "rgba(233, 69, 96, 0.3)",
    groundLine:   "#0f3460",
  },

  player: {
    radius: 28,
    mass:   1.2,
  },

  physics: {
    gravity:     0.6,
    friction:    0.85,
    moveForce:   0.7,
    jumpForce:   13,
    maxSpeed:    8,
  },

  world: {
    groundHeight: 80,
  },

  trail: {
    maxLength: 18,
    radius:    10,
  },

  buttons: {
    left:  { label: "◀", action: "left"  },
    right: { label: "▶", action: "right" },
    jump:  { label: "▲", action: "jump"  },
  },
};
