var fps, fpsInterval, startTime, now, then, elapsed;

// Initialize the timer variables and start the animation
function startAnimating({ fps, callback }) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  callback();
}