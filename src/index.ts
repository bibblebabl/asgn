import './style.css'
import { Canvas } from './canvas'
import {
  getCursorPosition,
  getDistance,
  getParallelogrammeArea,
  getParallelogrammeCords,
} from './utils'
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

function drawLastPoint() {
  const [, , , d] = getParallelogrammeCords(points)
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
  console.log(points.length)
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

function handleResize(event: MouseEvent) {
  const cursor = getCursorPosition(canvas.element, event)

  console.log(points.length)

  points.forEach((point, index) => {
    const dx = cursor.x - point.x
    const dy = cursor.y - point.y
    const isIn = dx * dx + dy * dy < CIRCLE_DIAMETER

    if (isIn) {
      draggingCircleIndex = index
    }
  })
}

function onMouseMove(event: MouseEvent) {
  if (isDragging) {
    const cursorPosition = getCursorPosition(canvas.element, event)

    if (draggingCircleIndex) {
      points[draggingCircleIndex].x = cursorPosition.x
      points[draggingCircleIndex].y = cursorPosition.y

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
  }
}

function onMouseDown(event: MouseEvent) {
  const mouseDownHandler = points.length === MAX_CIRCLES_COUNT + 1 ? handleResize : handlePoint
  isDragging = true
  mouseDownHandler(event)
}

function onMouseUp() {
  isDragging = false
  draggingCircleIndex = null
}

canvas.on('mousedown', onMouseDown)

canvas.on('mouseup', onMouseUp)

canvas.on('mousemove', onMouseMove)

document.body.querySelector('button.reset').addEventListener('mousedown', () => {
  canvas.reset()
  points = []
})
