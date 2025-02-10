import { startSimpleKit, setSKDrawCallback } from "simplekit/canvas-mode";
startSimpleKit();

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);

  squareDemo(gc);
});

import { Square1 } from "./square";

const redSquare = new Square1(50, 50, 50);
const blueSquare = new Square1(250, 50, 50);
const square = new Square1(150, 150, 50);

function squareDemo(gc: CanvasRenderingContext2D) {
  gc.save();
  gc.fillStyle = "pink";
  gc.strokeStyle = "red";
  gc.lineWidth = 3;
  redSquare.draw(gc);
  gc.restore();

  gc.save();
  gc.fillStyle = "lightblue";
  gc.strokeStyle = "blue";
  gc.lineWidth = 3;
  blueSquare.draw(gc);
  gc.restore();

  gc.save();
  gc.fillStyle = "grey";
  square.draw(gc);
  gc.restore();
}

// function rectangleDemo(gc: CanvasRenderingContext2D) {
//   gc.fillStyle = "red";
//   gc.fillRect(90, 10, 50, 50);
// }

// function pathDemo(gc: CanvasRenderingContext2D) {
//   gc.lineWidth = 5;
//   gc.strokeStyle = "black";
//   gc.beginPath();
//   gc.moveTo(10, 10);
//   gc.lineTo(60, 60);
//   gc.closePath();
//   gc.stroke();
// }

// function circleDemo(gc: CanvasRenderingContext2D) {
//   // circle using ellipse
//   gc.strokeStyle = "blue";
//   gc.beginPath();
//   gc.ellipse(200, 40, 25, 25, 0, 0, Math.PI * 2);
//   gc.stroke();
// }

// function draw(gc: CanvasRenderingContext2D) {
//   pathDemo(gc);
//   circleDemo(gc);
//   rectangleDemo(gc);
// }

// setSKDrawCallback(draw);
