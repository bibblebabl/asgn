import { Canvas } from './canvas'
import { Point } from './types'
import { POINT_CIRCLE_RADIUS } from './const'
import { getCursorPosition, getParallelogramArea, getParallelogramPoints } from './utils'

type Props = {
  onMouseDown: (event: MouseEvent) => void
  onMouseUp: (event: MouseEvent) => void
  onMouseMove: (event: MouseEvent) => void
  onReset: () => void
  onAboutMenu: () => void
}
export class View {
  private canvas: Canvas

  constructor(
    canvas: Canvas,
    { onMouseDown, onMouseUp, onMouseMove, onReset, onAboutMenu }: Props
  ) {
    this.canvas = canvas

    canvas.on('mousedown', onMouseDown)
    canvas.on('mouseup', onMouseUp)
    canvas.on('mousemove', onMouseMove)

    this.canvas.font = '12px monospace'

    document.querySelector('.button--reset')?.addEventListener('mousedown', onReset)
    document
      .querySelectorAll('.button--modal-toggle')
      ?.forEach((el) => el.addEventListener('mousedown', onAboutMenu))
  }

  getCursorPosition(event: MouseEvent): Point {
    return getCursorPosition(this.canvas.element, event)
  }

  drawPoint(point: Point, index: number) {
    this.canvas.drawCircle({
      x: point.x,
      y: point.y,
      radius: POINT_CIRCLE_RADIUS,
      startAngle: 0,
      endAngle: 360,
    })

    this.drawTooltip(point, `${index}`)
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
    const [a, , c] = getParallelogramPoints(points)
    const circleArea = getParallelogramArea(points)

    const circleRadius = Math.sqrt(circleArea / Math.PI)

    const center = {
      x: (a.x + c.x) / 2,
      y: (a.y + c.y) / 2,
    }

    console.log(center, circleRadius)

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
