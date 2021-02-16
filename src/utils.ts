import { Point } from './types'

export function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent): Point {
  const rect = canvas.getBoundingClientRect()

  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  return { x, y }
}

export function getParallelogramPoints(points: Point[]): Point[] {
  const lastPoint: Point = {
    x: 0,
    y: 0,
  }

  const [a, b, c] = points

  lastPoint.x = a.x + c.x - b.x
  lastPoint.y = a.y + c.y - b.y

  const allPoints = [a, b, c, lastPoint]

  return allPoints
}

export function getDistance(a: Point, b: Point): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

export function getParallelogramArea(points: Point[]): number {
  const [a, b, c, d] = points

  const distAB = getDistance(a, b)
  const distBC = getDistance(b, c)
  const distBD = getDistance(b, d)

  // calculating using Heron's formula
  const p = (distAB + distBC + distBD) / 2
  const area = 2 * Math.sqrt(p * (p - distAB) * (p - distBC) * (p - distBD))

  return area
}
