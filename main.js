const offset = {
  x: -735,
  y: -650,
};

// --- Create collisions array
const gridWidth = 70;

// collisions is imported in index.html
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += gridWidth) {
  collisionsMap.push(collisions.slice(i, gridWidth + i));
}

// Collisions as array of Boundary class
const boundaries = arrayMapper(collisionsMap);

// battleZones is imported in index.html
const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += gridWidth) {
  battleZonesMap.push(battleZonesData.slice(i, gridWidth + i));
}

// Battle zones as array of Boundary class
const battleZones = arrayMapper(battleZonesMap);

// SPRITES
// -- Add background image
const backgroundImage = new Image();
backgroundImage.src = "./img/Pellet Town 400.png";

// -- Add background image
const foregroundImage = new Image();
foregroundImage.src = "./img/foreground.png";

// -- Add player images
// ---- UP
const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";

// ---- DOWN
const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

// ---- LEFT
const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

// ---- RIGHT
const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";

// -- Background Sprite
const backgroundSprite = new Sprite({ position: { x: offset.x, y: offset.y }, image: backgroundImage });

// -- Foreground Sprite
const foregroundSprite = new Sprite({ position: { x: offset.x, y: offset.y }, image: foregroundImage });

// -- Player Sprite
const playerSprite = new Sprite({
  position: {
    // x: canvas.width / 2 - this.image.width / 8,
    // y: canvas.height / 2 - this.image.height / 2,

    x: canvas.width / 2 - 192 / 8, // image file width
    y: canvas.height / 2 - 68 / 2, // image file height
  },
  frames: {
    max: 4,
    hold: 10,
  },
  image: playerDownImage,
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage,
  },
});

// --- Main function
function animate() {
  const mainSceneId = window.requestAnimationFrame(animate);

  setTimeout(() => {
    mainSceneId;
  }, 1000 / FPS);

  // Draw map
  backgroundSprite.draw();

  // Draw boundaries
  boundaries.forEach((boundary) => {
    boundary.fill = "rgba(255, 0, 0, 1)";
    boundary.draw();
  });

  // Draw battle zones
  battleZones.forEach((zone) => {
    // zone.fill = "blue";
    zone.fill = "rgba(255, 0, 255, 1.0)";
    zone.draw();
  });

  // Draw player
  playerSprite.draw();

  // Render foreground (above player)
  foregroundSprite.draw();

  let moving = true;
  playerSprite.animate = false;

  if (battle.initiated) {
    return;
  }

  const playerRectangle = {
    top: playerSprite.position.y,
    bottom: playerSprite.position.y + playerSprite.height,
    left: playerSprite.position.x,
    right: playerSprite.position.x + playerSprite.width,
    area: playerSprite.width * playerSprite.height,
  };

  // Battle zone activateion
  // - Check if player is pressing a movement key
  // - Check if player position overlaps battlezone position
  if (Object.keys(keysPressed).length) {
    for (let battleZone of battleZones) {
      const battleZoneRectangle = {
        top: battleZone.position.y,
        bottom: battleZone.position.y + battleZone.height,
        left: battleZone.position.x,
        right: battleZone.position.x + battleZone.width,
        area: battleZone.width * battleZone.height,
      };

      const horizontalOverlap =
        Math.min(playerRectangle.right, battleZoneRectangle.right) -
        Math.max(playerRectangle.left, battleZoneRectangle.left);

      const verticalOverlap =
        Math.min(playerRectangle.bottom, battleZoneRectangle.bottom) -
        Math.max(playerRectangle.top, battleZoneRectangle.top);

      const overlappingArea = horizontalOverlap * verticalOverlap;

      const coliding = rectangularCollision({
        rectangle1: playerSprite,
        rectangle2: battleZone,
      });

      const battleCondition = coliding && overlappingArea > playerRectangle.area / 2 && Math.random() < 0.01;

      if (battleCondition) {
        moving = false;
        playerSprite.animate = false;
        battle.initiated = true;

        // Activate a new animation loop

        // Deactivate current animation loop
        window.cancelAnimationFrame(mainSceneId);

        // Screen transition
        screenFlash();

        break;
      }
    }
  }

  const velocity = 3;

  if (keysPressed["w"]) {
    // Set image to UP
    playerSprite.image = playerSprite.sprites.up;
    playerSprite.animate = true;

    for (let boundary of boundaries) {
      const coliding = rectangularCollision({
        rectangle1: playerSprite,
        rectangle2: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y + velocity } },
      });

      if (coliding) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movables.forEach((item) => (item.position.y += velocity));
    }
  }

  if (keysPressed["a"]) {
    // Set image to LEFT
    playerSprite.image = playerSprite.sprites.left;
    playerSprite.animate = true;

    for (let boundary of boundaries) {
      const coliding = rectangularCollision({
        rectangle1: playerSprite,
        rectangle2: { ...boundary, position: { x: boundary.position.x + velocity, y: boundary.position.y } },
      });

      if (coliding) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movables.forEach((item) => (item.position.x += velocity));
    }
  }

  if (keysPressed["s"]) {
    // Set image to DOWN
    playerSprite.image = playerSprite.sprites.down;
    playerSprite.animate = true;

    for (let boundary of boundaries) {
      const coliding = rectangularCollision({
        rectangle1: playerSprite,
        rectangle2: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y - velocity } },
      });

      if (coliding) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movables.forEach((item) => (item.position.y -= velocity));
    }
  }

  if (keysPressed["d"]) {
    // Set image to RIGHT
    playerSprite.image = playerSprite.sprites.right;
    playerSprite.animate = true;

    for (let boundary of boundaries) {
      const coliding = rectangularCollision({
        rectangle1: playerSprite,
        rectangle2: { ...boundary, position: { x: boundary.position.x - velocity, y: boundary.position.y } },
      });

      if (coliding) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movables.forEach((item) => (item.position.x -= velocity));
    }
  }
}
