export class CanvasActuator {
  constructor(w, h, color) {
    this.canvas = document.createElement("canvas");
    this.canvas.style.background = color;
    this.events = {};
    this.start(w, h);
  }

  start(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.render(w, h);
    this.click();
    this.keyListen();
  }

  emit(e, t) {
    const i = this.events[e];
    if (i) {
      i.forEach((e) => {
        e(t);
      });
    }
  }

  on(e, t) {
    if (this.events[e]) {
      this.events[e].push(t);
    } else {
      this.events[e] = [];
      this.events[e].push(t);
    }
  }

  clear(w, h) {
    this.ctx.clearRect(0, 0, w, h);
  }

  click() {
    this.canvas.addEventListener("click", (e) => {
      const n = { x: e.layerX, y: e.layerY };
      this.emit("click", n);
    });
  }

  keyListen() {
    document.addEventListener("keydown", (e) => {
      const n = e.code;
      this.emit("keydown", n);
    });
    document.addEventListener("keyup", (e) => {
      const n = e.code;
      this.emit("keyup", n);
    });
  }

  render(x, y) {
    this.clear(x, y);
    this.emit("draw");
    requestAnimationFrame(() => {
      this.render(x, y);
    });
  }
}
