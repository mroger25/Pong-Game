export class Puck {
  constructor(e) {
    this.myCanvas = e;
    this.r = 12;
    this.lScore = 0;
    this.rScore = 0;
    this.initPos(5);
  }

  initPos(s) {
    this.x = this.myCanvas.canvas.width / 2;
    this.y = this.myCanvas.canvas.height / 2;
    const a = Math.random() * 6 - 3;
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
    let crashed = !1;
    if (xdcp > p.w / 2 + c.r) {
    } else if (ydcp > p.h / 2) {
    } else {
      crashed = !0;
    }
    if (crashed) {
      const ang = (c.y - p.y) / (c.x - p.x);
      const pSide = p.x > c.myCanvas.canvas.width / 2;
      const cSide = c.x < p.x;
      if ((pSide && cSide) || !(pSide || cSide)) {
        this.setMove(-this.s, ang);
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
      if (this.x < this.myCanvas.canvas.width / 2) {
        this.rScore++;
      } else {
        this.lScore++;
      }
      this.initPos(-this.s);
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
