const ASSETS = {

  colors: {
    background:    "#1a1a2e",
    ground:        "#16213e",
    player:        "#e94560",
    playerShadow:  "#a0213f",
    playerShine:   "#ff7096",
    buttonBg:      "#0f3460",
    buttonBorder:  "#e94560",
    buttonText:    "#ffffff",
    trail:         "rgba(233, 69, 96, 0.3)",
    groundLine:    "#0f3460",
    skyTop:        "#0d0d1a",
    skyBottom:     "#1a1a2e",
  },

  player: {
    radius: 28,
    mass:   1.2,
  },

  physics: {
    gravity:   0.6,
    friction:  0.85,
    moveForce: 0.7,
    jumpForce: 13,
    maxSpeed:  8,
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

  floor: {
    grassColor:      "#2d5a27",
    grassHighlight:  "#3d7a35",
    grassShadow:     "#1a3a16",
    dirtColor:       "#4a3728",
    reflectionAlpha: 0.18,
    reflectionColor: "#5588ff",
    bladeCount:      120,
    bladeHeight:     14,
    bladeSpread:     6,
  },

  trees: [
    {
      id:            "oak",
      trunkColor:    "#5c3d1e",
      trunkWidth:    18,
      trunkHeight:   60,
      canopyColor:   "#2d6e2d",
      canopyDark:    "#1e4e1e",
      canopyLight:   "#4aaa4a",
      canopyRadiusX: 36,
      canopyRadiusY: 44,
      shadowAlpha:   0.22,
      minScale:      0.85,
      maxScale:      1.25,
      density:       0.0012,
    },
    {
      id:            "pine",
      trunkColor:    "#4a2e10",
      trunkWidth:    12,
      trunkHeight:   40,
      canopyColor:   "#1a5c2a",
      canopyDark:    "#0f3a1a",
      canopyLight:   "#2e8a44",
      canopyRadiusX: 22,
      canopyRadiusY: 60,
      shadowAlpha:   0.18,
      minScale:      0.9,
      maxScale:      1.4,
      density:       0.0008,
    },
  ],

  bushes: [
    {
      id:          "round",
      color:       "#3a7a30",
      colorDark:   "#255020",
      colorLight:  "#56aa48",
      radiusX:     28,
      radiusY:     20,
      shadowAlpha: 0.15,
      minScale:    0.7,
      maxScale:    1.2,
      density:     0.002,
    },
    {
      id:          "flower",
      color:       "#3a7a30",
      colorDark:   "#255020",
      colorLight:  "#56aa48",
      radiusX:     18,
      radiusY:     14,
      flowerColor: "#e8c84a",
      flowerCount: 5,
      shadowAlpha: 0.12,
      minScale:    0.6,
      maxScale:    1.0,
      density:     0.0015,
    },
  ],

};
