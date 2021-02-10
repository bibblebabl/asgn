import { MAX_POINTS_COUNT, POINT_CIRCLE_DIAMETER } from './const'
import { Canvas } from './canvas'
import { View } from './view'
import { State, Point } from './types'
import { getParallelogramCords } from './utils'

const canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement)

export class App {
  state: State = {
    points: [],
    isDragging: false,
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
    const { points, draggingCircleIndex } = this.state

    if (draggingCircleIndex !== null) {
      const nextPointIndex = draggingCircleIndex < MAX_POINTS_COUNT ? draggingCircleIndex + 1 : 0

      const diffX = cursorPosition.x - points[draggingCircleIndex].x
      const diffY = cursorPosition.y - points[draggingCircleIndex].y

      points[draggingCircleIndex].x = cursorPosition.x
      points[draggingCircleIndex].y = cursorPosition.y

      points[nextPointIndex].x = points[nextPointIndex].x + diffX
      points[nextPointIndex].y = points[nextPointIndex].y + diffY
    }
  }

  onMouseDown(event: MouseEvent) {
    const { points, isDragging } = this.state

    if (points.length <= MAX_POINTS_COUNT) {
      const point = this.view.getCursorPosition(event)
      this.view.drawPoint(point, points.length)
      this.state.points.push(point)

      if (points.length === MAX_POINTS_COUNT) {
        const [, , , lastPoint] = getParallelogramCords(points)
        points.push(lastPoint)
        this.view.drawPoint(lastPoint, 3)
        this.view.drawParallelogram(points)
        this.view.drawMainCircle(points)
      }
    } else {
      if (!isDragging) this.handleDrag(event)
      this.state.isDragging = true
    }
  }

  onMouseMove(event: MouseEvent) {
    const { isDragging, draggingCircleIndex } = this.state

    if (isDragging) {
      const cursorPosition = this.view.getCursorPosition(event)

      if (draggingCircleIndex !== null) {
        this.updatePointsPositions(cursorPosition)

        this.view.reDraw(this.state.points)
      }
    }
  }

  onMouseUp() {
    this.state.isDragging = false
    this.state.draggingCircleIndex = null
  }

  handleDrag(event: MouseEvent) {
    const cursor = this.view.getCursorPosition(event)

    this.state.points.forEach((point, index) => {
      const dx = cursor.x - point.x
      const dy = cursor.y - point.y
      const isIn = dx * dx + dy * dy < POINT_CIRCLE_DIAMETER

      if (isIn) {
        this.state.draggingCircleIndex = index
      }
    })
  }

  reset() {
    this.view.reset()
    this.state.points = []
  }
}
