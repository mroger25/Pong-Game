export class Court {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.mid = { x: this.w / 2, y: this.h / 2 };
  }

  show(e, l, r) {
    e.fillStyle = "#FFF";
    e.textAlign = "center";
    e.textBaseline = "middle";
    e.font = "20px Arial";
    e.save();
    e.translate(this.mid.x, this.mid.y);
    e.fillText("SCORE", 0, -180);
    e.fillText(":", 0, -160);
    e.fillText(l, -20, -160);
    e.fillText(r, 20, -160);
    e.restore();
  }
}
