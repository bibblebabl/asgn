import { Canvas } from './canvas'
import { Point } from './types'
import { CIRCLE_RADIUS, Alphabet } from './const'
import { getCursorPosition, getParallelogrammeArea, getParallelogrammeCords } from './utils'

type Props = {
  onMouseDown: (event: MouseEvent) => void
  onMouseUp: (event: MouseEvent) => void
  onMouseMove: (event: MouseEvent) => void
}
export class View {
  private canvas: Canvas

  constructor(canvas: Canvas, { onMouseDown, onMouseUp, onMouseMove }: Props) {
    this.canvas = canvas

    canvas.on('mousedown', onMouseDown)
    canvas.on('mouseup', onMouseUp)
    canvas.on('mousemove', onMouseMove)
  }

  getCursorPosition(event: MouseEvent): Point {
    return getCursorPosition(this.canvas.element, event)
  }

  drawPoint(point: Point, index: number) {
    this.canvas.drawCircle({
      x: point.x,
      y: point.y,
      radius: CIRCLE_RADIUS,
      startAngle: 0,
      endAngle: 360,
    })

    this.drawTooltip(point, Alphabet[index])
  }

  drawParallelogram(points: Point[]) {
    this.canvas.drawParallelogram(points)
  }

  drawTooltip(point: Point, index: string) {
    this.canvas.drawText(`index: ${index}`, point.x + 10, point.y + 5)
    this.canvas.drawText(`x: ${point.x}`, point.x + 10, point.y + 20)
    this.canvas.drawText(`y: ${point.y}`, point.x + 10, point.y + 35)
  }

  drawMainCircle(points: Point[]) {
    const [a, , c] = getParallelogrammeCords(points)
    const circleS = getParallelogrammeArea(points)

    const circleRadius = Math.sqrt(circleS / Math.PI)

    const center = {
      x: (a.x + c.x) / 2,
      y: (a.y + c.y) / 2,
    }

    this.canvas.drawCircle({
      x: center.x,
      y: center.y,
      radius: circleRadius,
    })

    this.drawTooltip(center, 'CENTER')
  }

  reDraw(points: Point[]) {
    this.canvas.reset()
    this.canvas.drawParallelogram(points)

    points.forEach((point: Point, index) => this.drawPoint(point, index))

    this.drawMainCircle(points)
  }

  reset() {
    this.canvas.reset()
  }
}