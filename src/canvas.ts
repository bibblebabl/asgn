import { Point } from "./types";

export class Canvas {
  static degreesToRadians(degrees: number) {
    // 1 radian = 57.2957795 degrees
    return (Math.PI / 180) * degrees;
  }

  static create(): HTMLCanvasElement {
    return document.createElement("canvas");
  }

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(element: HTMLCanvasElement) {
    this.canvas = element || Canvas.create();
    this.ctx = this.canvas.getContext("2d");

    this.init();
  }

  get element(): HTMLCanvasElement {
    return this.canvas;
  }

  private init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  attach(element: HTMLElement) {
    element.appendChild(this.canvas);
  }

  on(eventType: any, handler: any) {
    this.canvas.addEventListener(eventType, handler, false);
  }

  reset() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRect({
    x,
    y,
    width,
    height
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    // if (rect.fillStyle) {
    //     this.fillStyle = rect.fillStyle;
    //     this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
    // }

    // if (rect.strokeStyle && rect.lineWidth) {
    //     this.strokeStyle = rect.strokeStyle;
    //     this.lineWidth = rect.lineWidth;

    // }

    this.ctx.strokeRect(x, y, width, height);

    return this;
  }

  drawCircle({
    x,
    y,
    radius,
    startAngle = 0,
    endAngle = 360,
    isAntiClockwise = true
  }: {
    x: number;
    y: number;
    radius: number;
    startAngle?: number;
    endAngle?: number;
    isAntiClockwise?: boolean;
  }) {
    this.ctx.beginPath();

    this.ctx.arc(
      x,
      y,
      radius,
      (startAngle = Canvas.degreesToRadians(startAngle)),
      (endAngle = Canvas.degreesToRadians(endAngle)),
      isAntiClockwise
    );

    this.ctx.strokeStyle = "red";

    this.ctx.closePath();
    this.ctx.stroke();

    return this;
  }

  drawParallelogram(points: Point[]) {
    const [startPoint, ...restPoints] = points;

    this.ctx.beginPath();

    this.ctx.moveTo(startPoint.x, startPoint.y);

    this.ctx.strokeStyle = "blue";

    for (let point of restPoints) {
      this.ctx.lineTo(point.x, point.y);
    }

    this.ctx.closePath();
    this.ctx.stroke();

    return this;
  }

  drawTooltip(point: Point, index: string) {
    this.ctx.font = "12px monospace";
    this.ctx.fillText(`index: ${index}`, point.x + 10, point.y + 5);
    this.ctx.fillText(`x: ${point.x}`, point.x + 10, point.y + 20);
    this.ctx.fillText(`y: ${point.y}`, point.x + 10, point.y + 35);
  }
}
