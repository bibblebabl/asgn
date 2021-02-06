import { Point } from "./types";

export function getCursorPosition(
  canvas: HTMLCanvasElement,
  event: MouseEvent
): Point {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x, y };
}

export function getParallelogrammeCords(points: Point[]): Point[] {
  if (points.length < 3) {
    // @TODO: сделать подоходяшую ошибку
    return points;
  }

  const d: Point = {
    x: 0,
    y: 0
  };

  const [a, b, c] = points;

  d.x = a.x + c.x - b.x;
  d.y = a.y + c.y - b.y;

  return [...points, d];
}

export function getDistance(a: Point, b: Point): number {
  const dist = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  return dist;
}

export function getParallelogrammeArea(points: Point[]): number {
  const [a, b, c, d] = points;
  // const base = ;
  const height = c.y - a.y;

  return 42;
}
