import { Drawable } from "./drawable";

// basic drawable square
export class Square1 implements Drawable {
  constructor(public x: number, public y: number, public size: number) {}

  draw(gc: CanvasRenderingContext2D) {
    gc.beginPath();
    gc.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    gc.fill();
    gc.stroke();
  }
}
