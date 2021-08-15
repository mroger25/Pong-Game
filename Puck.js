export class Puck {
  constructor(e) {
    this.myCanvas = e;
    this.r = 12;
    this.lScore = 0;
    this.rScore = 0;
    this.s = 5;
    this.initPos();
  }

  initPos() {
    this.x = this.myCanvas.canvas.width / 2;
    this.y = this.myCanvas.canvas.height / 2;
    const a = Math.random() * 360;
    this.setMove(a);
  }

  setMove(a) {
    this.a = a;
    this.xSpeed = Math.cos(a * (Math.PI / 180)) * this.s;
    this.ySpeed = Math.sin(a * (Math.PI / 180)) * -this.s;
  }

  paddleCollision() {
    const c = this;
    const p = c.x < c.myCanvas.canvas.width / 2 ? c.lPaddle : c.rPaddle;
    const dx = c.x - p.x;
    const dy = c.y - p.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this.crashed = distance < c.r + p.r ? !0 : !1;
    if (this.crashed) {
      const m = c.ySpeed / c.xSpeed;
      const intersection_line_circle = ({ m, R, p }) => {
        const a = m * m * p.x + p.x;
        const b = m * m + 1;
        const c = R * Math.sqrt(b);
        const x1 = (a + c) / b;
        const x2 = (a - c) / b;
        const y1 = m * (x1 - p.x) + p.y;
        const y2 = m * (x2 - p.x) + p.y;
        return [
          { x: x1, y: y1 },
          { x: x2, y: y2 },
        ];
      };

      const crash = intersection_line_circle({
        m: (p.y - c.y) / (p.x - c.x),
        R: p.r,
        p: { x: p.x, y: p.y },
      });
      const focus = intersection_line_circle({
        m,
        R: p.r / 2,
        p: { x: p.x, y: p.y },
      });
      const pcrash = c.x > p.x ? crash[0] : crash[1];
      const pfocus = c.x > p.x ? focus[0] : focus[1];
      const dx = pcrash.x - pfocus.x;
      const dy = pcrash.y - pfocus.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ang_return = Math.acos(dx / dist) / (Math.PI / 180);
      console.log(ang_return);
      c.setMove(ang_return);
    }
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.y - this.r < 0 || this.y + this.r > this.myCanvas.canvas.height) {
      this.setMove(360 - this.a);
    }
    if (this.x + this.r < 0 || this.x - this.r > this.myCanvas.canvas.width) {
      if (this.x < this.myCanvas.canvas.width / 2) {
        this.rScore++;
      } else {
        this.lScore++;
      }
      this.initPos();
    }
  }

  update(lPaddle, rPaddle) {
    this.lPaddle = lPaddle;
    this.rPaddle = rPaddle;
    this.move();
    this.paddleCollision();
  }

  show() {
    const c = this;
    const e = c.myCanvas.ctx;
    e.fillStyle = "#FFF";
    e.beginPath();
    e.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    e.fill();
  }
}
