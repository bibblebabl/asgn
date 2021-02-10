import { Point } from './types'

export function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent): Point {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  return { x, y }
}

export function getParallelogramCords(points: Point[]): Point[] {
  if (points.length < 3) {
    // @TODO: сделать подоходяшую ошибку
    return points
  }

  const d: Point = {
    x: 0,
    y: 0,
  }

  const [a, b, c] = points

  d.x = a.x + c.x - b.x
  d.y = a.y + c.y - b.y

  return [...points, d]
}

export function getDistance(a: Point, b: Point): number {
  const dist = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))

  return dist
}

export function getParallelogrammeArea(points: Point[]): number {
  const [a, b, c, d] = points

  const distAB = getDistance(a, b)
  const distBC = getDistance(b, c)
  const distBD = getDistance(b, d)

  // Также площадь параллелограмма может быть выражена через стороны {\displaystyle a,\ b}a,\ b и длину любой из диагоналей {\displaystyle d}d по формуле Герона как сумма площадей двух равных примыкающих треугольников:
  const p = (distAB + distBC + distBD) / 2
  const S = 2 * Math.sqrt(p * (p - distAB) * (p - distBC) * (p - distBD))

  return S
}

function getDragDirection() {}
