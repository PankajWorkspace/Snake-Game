document.addEventListener("DOMContentLoaded", function () {
  let showscore = document.querySelector(".span");
  let alert = document.querySelector(".alert");
  let start = document.querySelector(".start");
  let pixel = document.querySelectorAll(".game div");
  let currentSnake = [2, 1, 0];
  let speed = 1;
  let score = 0;
  let appleIndex = 0;
  let interval = 0;
  let intervalTime = 0;
  let currentIndex = 0;
  let direction = 1;
  let width = 10;

  function startgame() {
    currentSnake.forEach((index) => pixel[index].classList.remove("snake"));
    pixel[appleIndex].classList.remove("apple");
    clearInterval(interval);
    direction = 1;
    score = 0;
    randomApple()
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    showscore.textContent = score;
    currentSnake.forEach((index) => pixel[index].classList.add("snake"));
    interval = setInterval(moveoutcome, intervalTime);
  }

  function randomApple() {
    do {
      applecount = Math.floor(Math.random() * pixel.length);
    } while (pixel.classList.contain("snake"));
    pixel[appleIndex].classList.add("snake")
  }

  function moveoutcome() {
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] - width < 0 && direction === -width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1)
    ) {
      return clearInterval(interval);
    }

    const tail = currentSnake.pop();
    pixel[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    snakesize(pixel, tail);
    pixel[currentSnake[0]].classList.add("snake");
    // snake.body.style.add("length")

    if (currentSnake.classList.contain("apple")) {
      currentSnake[0].classList.remove("apple");
      [tail[0]].classList.add("snake");
      currentSnake.push(tail);
      randomApple(pixel);
      score++;
      showscore.textcontent = score;
      clearInterval(interval);
      interval = intervalTime * speed;
      interval = setInterval(moveoutcome, intervalTime);
    }

    pixel[currentSnake[0]].classList.add("snake");
  }

  function controls(e) {
    pixel[currentIndex].classList.remove("snake");
    if (e.key === 37) {
      direction = -1;
    } else if (e.key === 38) {
      direction = +width;
    } else if (e.keycode === 39) {
      direction = +1;
    } else if (e.keycode === 40) {
      direction = -1;
    }
  }

  document.addEventListener("keyup", controls);
  start.addEventListener("click", startgame);
});
