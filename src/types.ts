export type Point = {
  x: number
  y: number
}

export type State = {
  points: Point[]
  isDragging: Boolean
  draggingPointIndex: number | null
}
