export class Paddle {
  constructor(x, court) {
    this.court = court;
    this.r = 50;
    this.pos = { x: court.mid.x * x * 0.8, y: 0 };
    this.lastPos = { x: 0, y: 0 };
    this.speed = { x: 0, y: 0 };
  }

  move({ x, y }) {
    if (x) {
      this.speed.x = (x * this.r) / 10;
    }
    if (y) {
      this.speed.y = (y * this.r) / 10;
    }
  }

  stop({ x, y }) {
    if (x) {
      this.speed.x = 0;
    }
    if (y) {
      this.speed.y = 0;
    }
  }

  update() {
    const t = this;
    this.lastPos.x = this.pos.x;
    this.lastPos.y = this.pos.y;
    t.pos.y = Math.max(
      t.r - t.court.mid.y,
      Math.min(t.court.mid.y - t.r, t.pos.y + t.speed.y)
    );
    const edge =
      t.pos.x < 0 ? { l: -t.court.mid.x, r: 0 } : { l: 0, r: t.court.mid.x };
    t.pos.x = Math.max(
      edge.l + t.r,
      Math.min(edge.r - t.r, t.pos.x + t.speed.x)
    );
  }

  show(e) {
    e.save();
    e.translate(this.court.mid.x, this.court.mid.y);
    e.fillStyle = "#999";
    e.beginPath();
    e.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    e.fill();
    e.restore();
  }
}
