const ctx = canvas.getContext("2d");

function screenFlash() {
  return gsap.to("#overlap", {
    opacity: 1,
    repeat: 3,
    yoyo: true,
    duration: 0.4,
    onComplete() {
      gsap.to("#overlap", {
        opacity: 1,
        duration: 0.4,
        onComplete() {
          animateBattle();
          gsap.to("#overlap", {
            opacity: 0,
            duration: 0.4,
          });
        },
      });
    },
  });
}

// --- Create canvas
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Used in main function
const keysPressed = {};

const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400,
  },
});

const movables = [backgroundSprite, ...boundaries, foregroundSprite, ...battleZones];

// Is currently coliding
function rectangularCollision({ rectangle1, rectangle2, velocity }) {
  if (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + Boundary.width &&
    rectangle1.position.y <= rectangle2.position.y + Boundary.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  ) {
    return true;
  }

  return false;
}

const battle = {
  initiated: false,
};

const FPS = 120;

animate();
// animateBattle();

window.addEventListener("keydown", (e) => (keysPressed[e.key] = true));

window.addEventListener("keyup", (e) => delete keysPressed[e.key]);
