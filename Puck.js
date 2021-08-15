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
    const a = Math.random() * 360;
    this.setMove(s, a);
  }

  setMove(s, a) {
    this.s = s;
    this.a = a;
    this.xSpeed = Math.cos(a * (Math.PI / 180)) * s;
    this.ySpeed = Math.sin(a * (Math.PI / 180)) * -s;
  }

  paddleCollision() {
    const c = this;
    const p = c.x < c.myCanvas.canvas.width / 2 ? c.lPaddle : c.rPaddle;
    const dx = c.x - p.x;
    const dy = c.y - p.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this.crashed = distance < c.r + p.r ? !0 : !1;
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.y - this.r < 0 || this.y + this.r > this.myCanvas.canvas.height) {
      this.setMove(this.s, 360 - this.a);
    }
    if (this.x + this.r < 0 || this.x - this.r > this.myCanvas.canvas.width) {
      if (this.x < this.myCanvas.canvas.width / 2) {
        this.rScore++;
      } else {
        this.lScore++;
      }
      this.initPos(this.s);
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

    const p = c.x < c.myCanvas.canvas.width / 2 ? c.lPaddle : c.rPaddle;

    const m = c.ySpeed / c.xSpeed;
    const f_reta_ponto = (m, p, color) => {
      const f = (x) => {
        return m * (x - p.x) + p.y;
      };
      e.strokeStyle = color;
      e.beginPath();
      e.moveTo(0, f(0));
      e.lineTo(c.myCanvas.canvas.width, f(c.myCanvas.canvas.width));
      e.stroke();
    };
    const f_circle_center = (R, p, color) => {
      e.strokeStyle = color;
      e.beginPath();
      e.arc(p.x, p.y, R, 0, 2 * Math.PI);
      e.stroke();
    };

    f_circle_center(p.r / 2, { x: p.x, y: p.y }, "blue");
    f_circle_center(p.r, { x: p.x, y: p.y }, "cyan");
    f_reta_ponto((p.y - c.y) / (p.x - c.x), { x: p.x, y: p.y }, "cyan");
    f_reta_ponto(m, { x: p.x, y: p.y }, "blue");
  }
}
