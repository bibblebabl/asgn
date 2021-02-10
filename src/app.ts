import { MAX_CIRCLES_COUNT, CIRCLE_DIAMETER } from './const'
import { Canvas } from './canvas'
import { View } from './view'
import { State, Point } from './types'
import { getParallelogrammeCords } from './utils'

const canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement)

export class App {
  state: State = {
    points: [],
    isDragging: false,
    draggingCircle: null,
    draggingCircleIndex: null,
  }

  view: View

  constructor() {
    this.view = new View(canvas, {
      onMouseDown: this.onMouseDown.bind(this),
      onMouseMove: this.onMouseMove.bind(this),
      onMouseUp: this.onMouseUp.bind(this),
    })

    document.querySelector('button.reset').addEventListener('mousedown', () => this.reset())
  }

  updatePointsPositions(cursorPosition: Point) {
    const { points, draggingCircle, draggingCircleIndex } = this.state

    if (draggingCircleIndex !== null && draggingCircle) {
      // const prevPointIndex = draggingCircleIndex - 1 < 0 ? 4 : draggingCircleIndex - 1
      const nextPointIndex = draggingCircleIndex + 1 > 4 ? 0 : draggingCircleIndex + 1

      const diffX = cursorPosition.x - draggingCircle.x
      const diffY = cursorPosition.y - draggingCircle.y

      points[draggingCircleIndex].x = cursorPosition.x
      points[draggingCircleIndex].y = cursorPosition.y

      points[nextPointIndex].x = points[nextPointIndex].x + diffX
      points[nextPointIndex].y = points[nextPointIndex].y + diffY
    }
  }

  onMouseDown(event: MouseEvent) {
    const { points, isDragging } = this.state

    if (points.length <= MAX_CIRCLES_COUNT) {
      const point = this.view.getCursorPosition(event)
      this.view.drawPoint(point, points.length)
      this.state.points.push(point)

      if (points.length === MAX_CIRCLES_COUNT) {
        const [, , , lastPoint] = getParallelogrammeCords(points)
        points.push(lastPoint)
        this.view.drawPoint(lastPoint, 3)
        this.view.drawParallelogram(points)
        this.view.drawMainCircle(points)
      }
    } else {
      if (!isDragging) this.handleDraggingPoint(event)
      this.state.isDragging = true
    }
  }

  onMouseMove(event: MouseEvent) {
    const { isDragging, draggingCircle, draggingCircleIndex } = this.state

    if (isDragging) {
      const cursorPosition = this.view.getCursorPosition(event)

      if (draggingCircleIndex !== null && draggingCircle) {
        this.updatePointsPositions(cursorPosition)

        this.view.reDraw(this.state.points)
      }
    }
  }

  onMouseUp() {
    this.state.isDragging = false
    this.state.draggingCircle = null
    this.state.draggingCircleIndex = null
  }

  handleDraggingPoint(event: MouseEvent) {
    const cursor = this.view.getCursorPosition(event)

    this.state.points.forEach((point, index) => {
      const dx = cursor.x - point.x
      const dy = cursor.y - point.y
      const isIn = dx * dx + dy * dy < CIRCLE_DIAMETER

      if (isIn) {
        this.state.draggingCircle = point
        this.state.draggingCircleIndex = index
      }
    })
  }

  reset() {
    this.view.reset()
    this.state.points = []
  }
}
