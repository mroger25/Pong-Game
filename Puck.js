export class Puck {
  constructor(e) {
    this.myCanvas = e;
    this.r = 12;
    this.initPos(2, 1.5);
  }

  initPos(s, a) {
    this.x = this.myCanvas.canvas.width / 2;
    this.y = this.myCanvas.canvas.height / 2;
    this.setMove(s, a);
  }

  setMove(s, a) {
    this.s = s;
    this.a = a;
    this.xSpeed = (s * Math.sqrt(a * a + 1)) / (1 + a * a);
    this.ySpeed = a * this.xSpeed;
  }

  paddleCollision(p) {
    const c = this;
    const xdcp = Math.abs(c.x - p.x);
    const ydcp = Math.abs(c.y - p.y);
    if (xdcp > p.w / 2 + c.r) {
    } else if (ydcp > (p.h + p.w) / 2) {
    } else if (ydcp <= p.h / 2) {
      this.setMove(-this.s, -this.a);
    } else {
      let edge;
      if (c.y - p.y < 0) {
        edge = { x: p.x, y: p.y - p.h / 2 };
      } else {
        edge = { x: p.x, y: p.y + p.h / 2 };
      }
      const dce2 = (c.x - edge.x) ** 2 + (c.y - edge.y) ** 2;
      const r2 = c.r * c.r;
      if (dce2 > r2) {
      } else {
        const ang = (c.y - edge.y) / (c.x - edge.x);
      }
    }
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.y - this.r < 0 || this.y + this.r > this.myCanvas.canvas.height) {
      this.setMove(this.s, -this.a);
    }
    if (this.x + this.r < 0 || this.x - this.r > this.myCanvas.canvas.width) {
      this.initPos(-this.s, -this.a);
    }
  }

  show() {
    const e = this.myCanvas.ctx;
    e.fillStyle = "#FFF";
    e.beginPath();
    e.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    e.fill();
  }
}
