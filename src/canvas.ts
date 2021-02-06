export class Canvas {
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
}
