const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const scaledCanvas = {
  width: canvas.width / 3,
  height: canvas.height / 3,
};

const gravity = 0.5;

class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }
  draw() {
    if (!this.image) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.draw();
  }
}

class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 100;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 100, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

const player = new Player({ x: 0, y: 0 });
const player2 = new Player({ x: 300, y: 100 });

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});
const middleground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/middleground.png",
});

function animate() {
  window.requestAnimationFrame(animate);

  c.save();
  c.scale(3, 3);
  c.translate(0, -background.image.height + scaledCanvas.height); //pozicionirenje backgrounda u donji lijevi ugao
  background.update();
  middleground.update();
  c.restore();

  player.update();
  player2.update();

  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = 3;
  else if (keys.a.pressed) player.velocity.x = -3;
}
animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -15;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
