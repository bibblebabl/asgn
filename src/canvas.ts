import { StrokeColor } from './const'
import { Point } from './types'

export class Canvas {
  static degreesToRadians(degrees: number) {
    return (Math.PI / 180) * degrees
  }

  static create(): HTMLCanvasElement {
    return document.createElement('canvas')
  }

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor(element: HTMLCanvasElement) {
    this.canvas = element || Canvas.create()
    this.ctx = this.canvas.getContext('2d')

    this.init()
  }

  get element(): HTMLCanvasElement {
    return this.canvas
  }

  set font(font: string) {
    this.ctx.font = font
  }

  private init() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  attach(element: HTMLElement) {
    element.appendChild(this.canvas)
  }

  on(eventType: any, handler: any) {
    this.canvas.addEventListener(eventType, handler, false)
  }

  drawCircle({
    x,
    y,
    radius,
    startAngle = 0,
    endAngle = 360,
    isAntiClockwise = true,
  }: {
    x: number
    y: number
    radius: number
    startAngle?: number
    endAngle?: number
    isAntiClockwise?: boolean
  }) {
    this.ctx.beginPath()

    this.ctx.arc(
      x,
      y,
      radius,
      (startAngle = Canvas.degreesToRadians(startAngle)),
      (endAngle = Canvas.degreesToRadians(endAngle)),
      isAntiClockwise
    )

    this.ctx.strokeStyle = StrokeColor.POINT_CIRCLE

    this.ctx.closePath()
    this.ctx.stroke()

    return this
  }

  drawParallelogram(points: Point[]) {
    const [startPoint, ...restPoints] = points

    this.ctx.beginPath()

    this.ctx.moveTo(startPoint.x, startPoint.y)

    this.ctx.strokeStyle = StrokeColor.PARALLELOGRAM

    for (let point of restPoints) {
      this.ctx.lineTo(point.x, point.y)
    }

    this.ctx.closePath()
    this.ctx.stroke()

    return this
  }

  drawText(text: string, x: number, y: number) {
    this.ctx.fillText(text, x, y)
  }

  reset() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
