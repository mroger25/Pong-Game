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
    const a = Math.tan(1 - (Math.PI / 180) * Math.random() * 90);
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
    const dx = c.x - p.x;
    const dy = c.y - p.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let crashed = !1;
    if (distance < c.r + p.r) {
      crashed = !0;
    }
    if (crashed) {
      const ang_collision = dy / dx;
      const ang_collision_perp = -1 / ang_collision; // tg (a)
      // tg (a+b) <=> tg (180+a-b)
      const ang = f;
      this.setMove(-this.s, ang);
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
