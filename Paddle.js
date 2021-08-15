export class Paddle {
  constructor(e, x) {
    this.myCanvas = e;
    this.height = e.canvas.height;
    this.initPos(x, this.height / 2);
  }

  initPos(x, y) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 100;
    this.r = this.h / 2;
    this.speed = 0;
  }

  move(e) {
    this.speed = e;
  }

  update() {
    this.y = Math.max(
      this.h / 2,
      Math.min(this.height - this.h / 2, this.y + this.speed)
    );
  }

  show() {
    const e = this.myCanvas.ctx;
    e.fillStyle = "#999";
    e.beginPath();
    e.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    e.fill();
  }
}
