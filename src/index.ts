import './style.css'
import { Canvas } from './canvas'
import { getCursorPosition, getParallelogrammeArea, getParallelogrammeCords } from './utils'
import { MAX_CIRCLES_COUNT, CIRCLE_RADIUS, CIRCLE_DIAMETER, Alphabet } from './const'
import { Point } from './types'

document.getElementById('app').innerHTML = `
<header class="header">
<h1 class="heading">Drawer</h1>
<button class="reset" type="button">reset</button>
</header>
`
const canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement)

let points: Point[] = []
let isDragging = false
let draggingCircleIndex: number | null = null
let draggingCircle: Point | null = null

function drawPoint(pointToDraw: Point, index: number) {
  canvas.drawCircle({
    x: pointToDraw.x,
    y: pointToDraw.y,
    radius: CIRCLE_RADIUS,
    startAngle: 0,
    endAngle: 360,
  })

  canvas.drawTooltip(pointToDraw, Alphabet[index])
}

function drawLastPoint(pointsToDraw?: Point[]) {
  const [, , , d] = getParallelogrammeCords(pointsToDraw || points)
  const pointToDraw = d

  canvas.drawCircle({
    x: pointToDraw.x,
    y: pointToDraw.y,
    radius: CIRCLE_RADIUS,
  })

  points.push(pointToDraw)

  canvas.drawParallelogram(points)

  canvas.drawTooltip(pointToDraw, 'D')
}

function drawMainCircle() {
  const [a, b, c] = getParallelogrammeCords(points)

  const circleS = getParallelogrammeArea(points)

  const circleRadius = Math.sqrt(circleS / Math.PI)

  const center = {
    x: (a.x + c.x) / 2,
    y: (a.y + c.y) / 2,
  }

  canvas.drawTooltip(center, 'CENTER')

  canvas.drawCircle({
    x: center.x,
    y: center.y,
    radius: circleRadius,
  })
}

function drawHandler(pointToDraw: Point) {
  drawPoint(pointToDraw, points.length)
  points.push(pointToDraw)

  if (points.length === MAX_CIRCLES_COUNT) {
    drawLastPoint()
    drawMainCircle()
  }
}

function handlePoint(event: MouseEvent) {
  const point = getCursorPosition(canvas.element, event)

  drawHandler(point)
}

function setDraggingPoint(event: MouseEvent) {
  const cursor = getCursorPosition(canvas.element, event)

  points.forEach((point, index) => {
    const dx = cursor.x - point.x
    const dy = cursor.y - point.y
    const isIn = dx * dx + dy * dy < CIRCLE_DIAMETER

    if (isIn) {
      draggingCircle = point
      draggingCircleIndex = index
    }
  })
}

function reDraw() {
  canvas.reset()
  canvas.drawParallelogram(points)

  points.forEach((point) =>
    canvas.drawCircle({
      x: point.x,
      y: point.y,
      radius: CIRCLE_RADIUS,
    })
  )

  drawMainCircle()
}

function onMouseMove(event: MouseEvent) {
  if (isDragging) {
    const cursorPosition = getCursorPosition(canvas.element, event)

    if (draggingCircleIndex !== null && draggingCircle) {
      // const prevPointIndex = draggingCircleIndex - 1 < 0 ? 4 : draggingCircleIndex - 1
      const nextPointIndex = draggingCircleIndex + 1 > 4 ? 0 : draggingCircleIndex + 1

      const diffX = cursorPosition.x - draggingCircle.x
      const diffY = cursorPosition.y - draggingCircle.y

      points[draggingCircleIndex].x = cursorPosition.x
      points[draggingCircleIndex].y = cursorPosition.y

      points[nextPointIndex].x = points[nextPointIndex].x + diffX
      points[nextPointIndex].y = points[nextPointIndex].y + diffY

      reDraw()
    }
  }
}

function onMouseDown(event: MouseEvent) {
  if (points.length <= MAX_CIRCLES_COUNT) {
    handlePoint(event)
    return
  }

  console.log(draggingCircle)

  if (!isDragging) setDraggingPoint(event)
  isDragging = true
}

function onMouseUp() {
  isDragging = false
  draggingCircle = null
  draggingCircleIndex = null
}

canvas.on('mousedown', onMouseDown)

canvas.on('mouseup', onMouseUp)

canvas.on('mousemove', onMouseMove)

document.body.querySelector('button.reset').addEventListener('mousedown', () => {
  canvas.reset()
  points = []
})
