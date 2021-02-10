export type Point = {
  x: number
  y: number
}

export type State = {
  points: Point[]
  isDragging: Boolean
  draggingCircleIndex: number | null
}
