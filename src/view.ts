import { Canvas } from './canvas'
import { State, Point } from './types'
import { MAX_CIRCLES_COUNT, CIRCLE_RADIUS, Alphabet } from './const'
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

    this.canvas.drawTooltip(point, Alphabet[index])
  }

  drawLastPoint(points: Point[], pointsToDraw?: Point[]) {
    const [, , , d] = getParallelogrammeCords(pointsToDraw || points)
    const pointToDraw = d

    this.canvas.drawCircle({
      x: pointToDraw.x,
      y: pointToDraw.y,
      radius: CIRCLE_RADIUS,
    })

    points.push(pointToDraw)

    this.canvas.drawParallelogram(points)

    this.canvas.drawTooltip(pointToDraw, 'D')
  }

  drawMainCircle(points: Point[]) {
    const [a, b, c] = getParallelogrammeCords(points)

    const circleS = getParallelogrammeArea(points)

    const circleRadius = Math.sqrt(circleS / Math.PI)

    const center = {
      x: (a.x + c.x) / 2,
      y: (a.y + c.y) / 2,
    }

    this.canvas.drawTooltip(center, 'CENTER')

    this.canvas.drawCircle({
      x: center.x,
      y: center.y,
      radius: circleRadius,
    })
  }

  drawHandler(points: Point[], pointToDraw: Point) {
    this.drawPoint(pointToDraw, points.length)

    if (points.length === MAX_CIRCLES_COUNT) {
      this.drawLastPoint(points)
      this.drawMainCircle(points)
    }
  }

  reDraw(points: Point[]) {
    this.canvas.reset()
    this.canvas.drawParallelogram(points)

    points.forEach((point: Point) =>
      this.canvas.drawCircle({
        x: point.x,
        y: point.y,
        radius: CIRCLE_RADIUS,
      })
    )

    this.drawMainCircle()
  }

  reset() {
    this.canvas.reset()
  }
}
