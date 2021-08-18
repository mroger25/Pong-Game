import { CanvasActuator } from "./CanvasActuator.js";
import { Court } from "./Court.js";
import { Paddle } from "./Paddle.js";
import { Puck } from "./Puck.js";

class GameManager {
  constructor() {
    this.myCanvas = new CanvasActuator(600, 400, "#000");
    this.myCanvas.on("draw", this.draw.bind(this));
    this.myCanvas.on("keydown", this.move.bind(this));
    this.myCanvas.on("keyup", this.stop.bind(this));
    this.court = new Court(
      this.myCanvas.canvas.width,
      this.myCanvas.canvas.height
    );
    this.myPuck = new Puck(this.court);
    this.lPaddle = new Paddle(-1, this.court);
    this.rPaddle = new Paddle(1, this.court);
  }

  move(e) {
    const acceptedKeys = {
      KeyW: { p: this.lPaddle, d: { x: 0, y: -1 } },
      KeyS: { p: this.lPaddle, d: { x: 0, y: 1 } },
      KeyA: { p: this.lPaddle, d: { x: -1, y: 0 } },
      KeyD: { p: this.lPaddle, d: { x: 1, y: 0 } },
      ArrowUp: { p: this.rPaddle, d: { x: 0, y: -1 } },
      ArrowDown: { p: this.rPaddle, d: { x: 0, y: 1 } },
      ArrowLeft: { p: this.rPaddle, d: { x: -1, y: 0 } },
      ArrowRight: { p: this.rPaddle, d: { x: 1, y: 0 } },
    };
    if (acceptedKeys[e]) {
      const p = acceptedKeys[e].p;
      const d = acceptedKeys[e].d;
      p.move(d);
    }
  }

  stop(e) {
    const acceptedKeys = {
      KeyW: { p: this.lPaddle, d: { x: 0, y: -1 } },
      KeyS: { p: this.lPaddle, d: { x: 0, y: 1 } },
      KeyA: { p: this.lPaddle, d: { x: -1, y: 0 } },
      KeyD: { p: this.lPaddle, d: { x: 1, y: 0 } },
      ArrowUp: { p: this.rPaddle, d: { x: 0, y: -1 } },
      ArrowDown: { p: this.rPaddle, d: { x: 0, y: 1 } },
      ArrowLeft: { p: this.rPaddle, d: { x: -1, y: 0 } },
      ArrowRight: { p: this.rPaddle, d: { x: 1, y: 0 } },
    };
    if (acceptedKeys[e]) {
      const p = acceptedKeys[e].p;
      const d = acceptedKeys[e].d;
      p.stop(d);
    }
  }

  draw() {
    this.lPaddle.update();
    this.rPaddle.update();
    this.myPuck.update(this.lPaddle, this.rPaddle);
    this.court.show(this.myCanvas.ctx, this.myPuck.lScore, this.myPuck.rScore);
    this.lPaddle.show(this.myCanvas.ctx);
    this.rPaddle.show(this.myCanvas.ctx);
    this.myPuck.show(this.myCanvas.ctx);
  }
}

new GameManager();
