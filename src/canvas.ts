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
    this.canvas.addEventListener(eventType, handler);
  }

  drawCircle({
    x,
    y,
    radius,
    startAngle,
    endAngle,
    isAntiClockwise = true
  }: {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
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

    this.ctx.stroke();

    return this;
  }
}
