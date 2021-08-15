import { CanvasActuator } from "./CanvasActuator.js";
import { Paddle } from "./Paddle.js";
import { Puck } from "./Puck.js";

class GameManager {
  constructor() {
    this.myCanvas = new CanvasActuator(600, 400, "#000");
    this.myCanvas.on("draw", this.draw.bind(this));
    this.myCanvas.on("keydown", this.move.bind(this));
    this.myCanvas.on("keyup", this.stop.bind(this));
    this.myPuck = new Puck(this.myCanvas);
    this.lPaddle = new Paddle(this.myCanvas, 20);
    this.rPaddle = new Paddle(this.myCanvas, 580);
  }

  move(e) {
    const acceptedKeys = {
      KeyW: { o: this.lPaddle, p: -5 },
      KeyS: { o: this.lPaddle, p: 5 },
      ArrowUp: { o: this.rPaddle, p: -5 },
      ArrowDown: { o: this.rPaddle, p: 5 },
    };
    if (acceptedKeys[e]) {
      acceptedKeys[e].o.move(acceptedKeys[e].p);
    }
  }

  stop(e) {
    const acceptedKeys = {
      KeyW: this.lPaddle,
      KeyS: this.lPaddle,
      ArrowUp: this.rPaddle,
      ArrowDown: this.rPaddle,
    };
    if (acceptedKeys[e]) {
      acceptedKeys[e].move(0);
    }
  }

  score() {
    const e = this.myCanvas.ctx;
    e.fillStyle = "#FFF";
    e.textAlign = "center";
    e.textBaseline = "middle";
    e.font = "20px Arial";
    e.fillText("SCORE", this.myCanvas.canvas.width / 2, 20);
    e.fillText(":", this.myCanvas.canvas.width / 2, 45);
    e.fillText(this.myPuck.lScore, this.myCanvas.canvas.width / 2 - 20, 45);
    e.fillText(this.myPuck.rScore, this.myCanvas.canvas.width / 2 + 20, 45);
  }

  draw() {
    this.lPaddle.update();
    this.rPaddle.update();
    this.myPuck.update(this.lPaddle, this.rPaddle);
    this.lPaddle.show();
    this.rPaddle.show();
    this.myPuck.show();
    this.score();
  }
}

new GameManager();
