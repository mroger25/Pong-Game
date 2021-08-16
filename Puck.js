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
    const v = {};
    v.x = Math.cos(a * (Math.PI / 180)) * this.s;
    v.y = Math.sin(a * (Math.PI / 180)) * -this.s;
    this.setMove(v);
  }

  setMove(v) {
    this.v = v;
  }

  paddleCollision() {
    const c = this;
    const p = c.x < c.myCanvas.canvas.width / 2 ? c.lPaddle : c.rPaddle;
    const dx = c.x - p.x;
    const dy = c.y - p.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this.crashed = distance < c.r + p.r ? !0 : !1;
    if (this.crashed) {
      const p = c.x < c.myCanvas.canvas.width / 2 ? c.lPaddle : c.rPaddle;
      const draw_line_p_p = (a, b) => {
        const ca = (a.y - b.y) / (a.x - b.x);
        const f = (x) => {
          return a.y + (x - a.x) * ca;
        };
        const p = { x: 0 };
        const q = { x: c.myCanvas.canvas.width };
        p.y = f(p.x);
        q.y = f(q.x);
        return ca;
      };
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
        m: c.v.y / c.v.x,
        R: p.r / 2,
        p: { x: p.x, y: p.y },
      });
      const pcrash = c.x > p.x ? crash[0] : crash[1];
      const pfocus = c.x > p.x ? focus[0] : focus[1];
      const ca = draw_line_p_p(pcrash, pfocus);
      const new_vector = intersection_line_circle({
        m: ca,
        R: Math.sqrt(c.v.x * c.v.x + c.v.y * c.v.y),
        p: { x: c.x, y: c.y },
      });
      const v = c.x > p.x ? new_vector[0] : new_vector[1];
      c.setMove({ x: v.x - c.x, y: v.y - c.y });
    }
  }

  move() {
    this.x += this.v.x;
    this.y += this.v.y;
    if (this.y - this.r < 0 || this.y + this.r > this.myCanvas.canvas.height) {
      this.setMove({ x: this.v.x, y: -this.v.y });
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
