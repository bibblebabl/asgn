import { POINTS_TO_DRAW_SHAPE, POINT_CIRCLE_DIAMETER } from './const'
import { Canvas } from './canvas'
import { View } from './view'
import { State, Point } from './types'
import { getParallelogramPoints } from './utils'

export class App {
  state: State = {
    points: [],
    isDragging: false,
    draggingPointIndex: null,
  }

  view: View

  constructor(domElement: HTMLCanvasElement) {
    const canvas = new Canvas(domElement)

    this.view = new View(canvas, {
      onMouseDown: this.onMouseDown.bind(this),
      onMouseMove: this.onMouseMove.bind(this),
      onMouseUp: this.onMouseUp.bind(this),
      onReset: this.reset.bind(this),
      onAboutMenu: this.onAboutMenu.bind(this),
    })
  }

  updatePointsCoordinates(cursorPosition: Point) {
    const { points, draggingPointIndex } = this.state

    if (draggingPointIndex !== null) {
      const nextPointIndex = draggingPointIndex < POINTS_TO_DRAW_SHAPE ? draggingPointIndex + 1 : 0

      const diffX = cursorPosition.x - points[draggingPointIndex].x
      const diffY = cursorPosition.y - points[draggingPointIndex].y

      points[draggingPointIndex].x = cursorPosition.x
      points[draggingPointIndex].y = cursorPosition.y

      points[nextPointIndex].x = points[nextPointIndex].x + diffX
      points[nextPointIndex].y = points[nextPointIndex].y + diffY
    }
  }

  onMouseDown(event: MouseEvent) {
    const { points, isDragging } = this.state

    if (points.length < POINTS_TO_DRAW_SHAPE) {
      const point = this.view.getCursorPosition(event)
      this.view.drawPoint(point, points.length)
      this.state.points.push(point)

      if (points.length === POINTS_TO_DRAW_SHAPE) {
        const [, , , lastPoint] = getParallelogramPoints(points)
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
    const { points, isDragging, draggingPointIndex } = this.state

    if (isDragging && points.length > POINTS_TO_DRAW_SHAPE) {
      const cursorPosition = this.view.getCursorPosition(event)

      if (draggingPointIndex !== null) {
        this.updatePointsCoordinates(cursorPosition)

        this.view.reDraw(this.state.points)
      }
    }
  }

  onMouseUp() {
    this.state.isDragging = false
    this.state.draggingPointIndex = null
  }

  handleDrag(event: MouseEvent) {
    const cursor = this.view.getCursorPosition(event)

    this.state.points.forEach((point, index) => {
      const dx = cursor.x - point.x
      const dy = cursor.y - point.y
      const isIn = dx * dx + dy * dy < POINT_CIRCLE_DIAMETER

      if (isIn) {
        this.state.draggingPointIndex = index
      }
    })
  }

  onAboutMenu() {
    document.querySelector('.modal--about')?.classList.toggle('modal--open')
  }

  reset() {
    this.view.reset()
    this.state.points = []
  }
}
