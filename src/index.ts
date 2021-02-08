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
  drawPoint(pointToDraw, points.length)
  points.push(pointToDraw)

  if (points.length === MAX_CIRCLES_COUNT) {
    drawLastPoint()
    drawMainCircle()
  }
}

function onMouseDown(event: MouseEvent) {
  const point = getCursorPosition(canvas.element, event)
  let pointToDraw = point

  drawHandler(pointToDraw)
}

function reSize(event: MouseEvent) {
  const cursor = getCursorPosition(canvas.element, event)

  for (var i = 0; i < points.length; i++) {
    const currentCircle = points[i]
    var dx = cursor.x - currentCircle.x
    var dy = cursor.y - currentCircle.y
    var isIn = dx * dx + dy * dy < CIRCLE_DIAMETER
    if (isIn) {
      draggingCircleIndex = i
    }
  }
}

canvas.on('mousedown', (event: MouseEvent) => {
  const mouseDownHandler = points.length === MAX_CIRCLES_COUNT + 1 ? reSize : onMouseDown
  isDragging = true
  mouseDownHandler(event)
})

canvas.on('mouseup', () => {
  isDragging = false
  draggingCircleIndex = null
})

canvas.on('mousemove', (event: MouseEvent) => {
  if (isDragging) {
    const cursorPosition = getCursorPosition(canvas.element, event)

    if (draggingCircleIndex) {
      console.log(cursorPosition)
      console.log(draggingCircleIndex)
      console.log(points[draggingCircleIndex])

      points[draggingCircleIndex].x = cursorPosition.x
      points[draggingCircleIndex].y = cursorPosition.y
    }
  }
})

document.body.querySelector('button.reset').addEventListener('mousedown', () => {
  canvas.reset()
  points = []
})
