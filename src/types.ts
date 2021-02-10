export type Point = {
  x: number
  y: number
}

export type State = {
  points: Point[]
  isDragging: Boolean
  draggingCircle: Point | null
  draggingCircleIndex: number | null
}
