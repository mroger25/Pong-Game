export class Puck {
  constructor(court) {
    this.court = court;
    this.r = 12;
    this.lScore = 0;
    this.rScore = 0;
    this.initPos();
  }

  initPos() {
    this.pos = { x: 0, y: 0 };
    this.lastPos = { x: 0, y: 0 };
    const a = Math.random() * 360;
    const speed = { x: 5, y: -5 };
    speed.x *= Math.cos(a * (Math.PI / 180));
    speed.y *= Math.sin(a * (Math.PI / 180));
    this.setMove(speed);
  }

  setMove(speed) {
    this.speed = speed;
  }

  checkCollision() {
    const c = this;
    const p = c.pos.x < 0 ? c.lPaddle : c.rPaddle;
    const dx = c.pos.x - p.pos.x;
    const dy = c.pos.y - p.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const crashed = distance <= c.r + p.r;
    if (crashed) {
      const posPuck = {
        x: c.pos.x - p.pos.x,
        y: c.pos.y - p.pos.y,
      };
      const speedPuck = Math.sqrt(
        (c.lastPos.x - c.pos.x) ** 2 + (c.lastPos.y - c.pos.y) ** 2
      );
      const a = speedPuck * 0.2;
      const vpuck = Math.sqrt(posPuck.x * posPuck.x + posPuck.y * posPuck.y);
      const vectorY = (a * posPuck.y) / vpuck;
      const vectorX = (a * posPuck.x) / vpuck;
      c.speed.x = -(c.lastPos.x - c.pos.x) + vectorX - (p.lastPos.x - p.pos.x);
      c.speed.y = -(c.lastPos.y - c.pos.y) + vectorY - (p.lastPos.y - p.pos.y);
    }
  }

  move() {
    this.lastPos.x = this.pos.x;
    this.lastPos.y = this.pos.y;
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
    if (
      this.pos.y - this.r < -this.court.mid.y ||
      this.pos.y + this.r > +this.court.mid.y
    ) {
      this.setMove({ x: this.speed.x, y: -this.speed.y });
    }
    if (this.pos.x - this.r > +this.court.mid.x) {
      this.initPos();
      this.lScore++;
    }
    if (this.pos.x + this.r < -this.court.mid.x) {
      this.initPos();
      this.rScore++;
    }
  }

  update(lPaddle, rPaddle) {
    this.lPaddle = lPaddle;
    this.rPaddle = rPaddle;
    this.move();
    this.checkCollision();
  }

  show(e) {
    const c = this;
    e.save();
    e.translate(c.court.mid.x, c.court.mid.y);
    e.fillStyle = "#FFF";
    e.beginPath();
    e.arc(c.pos.x, c.pos.y, c.r, 0, 2 * Math.PI);
    e.fill();

    const p = c.pos.x < 0 ? c.lPaddle : c.rPaddle;
    // const findCircleLineIntersections = (r, h, k, { m, n }, color) => {
    //   // circle: (x-h)^2 + (y-k)^2 = r^2
    //   // line: y=m*x+n
    //   // r: circle radius
    //   // h: x value of circle centre
    //   // k: y value of circle centre
    //   // m: slope
    //   // n: y-intercept

    //   // get a, b, c values
    //   const a = 1 + m * m;
    //   const b = (-h + m * (n - k)) * 2;
    //   const c = h * h + (n - k) * (n - k) - r * r;

    //   // get discriminant
    //   const d = b * b - 4 * a * c;
    //   const intersections = d >= 0 && [
    //     { x: (-b + Math.sqrt(d)) / (2 * a) },
    //     { x: (-b - Math.sqrt(d)) / (2 * a) },
    //   ];
    //   e.fillStyle = color;
    //   intersections.forEach((p) => {
    //     p.y = m * p.x + n;
    //     e.beginPath();
    //     e.arc(p.x, p.y, 2, 0, 2 * Math.PI);
    //     e.fill();
    //   });
    //   return intersections;
    // };
    // const findLineEquation = (a, b, color) => {
    //   const m = (b.y - a.y) / (b.x - a.x);
    //   const n = a.y - m * a.x;
    //   const f = (x) => {
    //     return m * x + n;
    //   };
    //   const p = { x: this.court.mid.x, y: f(this.court.mid.x) };
    //   const q = { x: -this.court.mid.x, y: f(-this.court.mid.x) };

    //   e.strokeStyle = color;
    //   e.beginPath();
    //   e.moveTo(p.x, p.y);
    //   e.lineTo(q.x, q.y);
    //   e.stroke();
    //   return { m, n };
    // };
    // const lineCollision = findLineEquation(
    //   { x: c.pos.x, y: c.pos.y },
    //   { x: p.pos.x, y: p.pos.y },
    //   "blue"
    // );
    // const intersections = findCircleLineIntersections(
    //   p.r,
    //   p.pos.x,
    //   p.pos.y,
    //   lineCollision,
    //   "red"
    // );

    const posPuck = {
      x: c.pos.x - p.pos.x,
      y: c.pos.y - p.pos.y,
    };
    const speedPuck = Math.sqrt(c.speed.x * c.speed.x + c.speed.y * c.speed.y);
    const a = speedPuck * 2;
    const vpuck = Math.sqrt(posPuck.x * posPuck.x + posPuck.y * posPuck.y);
    const vectorY = (a * posPuck.y) / vpuck;
    const vectorX = (a * posPuck.x) / vpuck;

    e.strokeStyle = "red";
    e.beginPath();
    e.moveTo(0, 0);
    e.lineTo(vectorX * 10, vectorY * 10);
    e.stroke();

    e.strokeStyle = "green";
    e.beginPath();
    e.moveTo(c.pos.x, c.pos.y);
    e.lineTo(c.pos.x + c.speed.x * 10, c.pos.y + c.speed.y * 10);
    e.stroke();

    e.restore();
  }
}
