// -- Battle background
const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./img/battleBackground.png";

const battleBackgroundSprite = new Sprite({ position: { x: 0, y: 0 }, image: battleBackgroundImage });

// -- Draggle background
const draggleImage = new Image();
draggleImage.src = "./img/draggleSprite.png";

const draggleSprite = new Sprite({ position: { x: 800, y: 100 }, image: draggleImage, frames: { max: 4, hold: 30 }, animate: true });

// -- Emby background
const embyImage = new Image();
embyImage.src = "./img/embySprite.png";

const embySprite = new Sprite({ position: { x: 280, y: 325 }, image: embyImage, frames: { max: 4, hold: 30 }, animate: true });

function animateBattle() {
  const battleSceneId = window.requestAnimationFrame(animateBattle);

  setTimeout(() => {
    battleSceneId;
  }, 1000 / FPS);

  battleBackgroundSprite.draw();
  draggleSprite.draw();
  embySprite.draw();
}