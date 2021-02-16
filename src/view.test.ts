// jest.mock('./canvas')
import 'jest-canvas-mock'
import { View } from './view'
import { Canvas } from './canvas'

const canvasElement = {
  getContext: jest.fn().mockReturnValue({
    beginPath: jest.fn(),
    arc: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    closePath: jest.fn(),
    fillText: jest.fn(),
    clearRect: jest.fn(),
  }),
  getBoundingClientRect: jest.fn().mockReturnValue({
    left: 0,
    top: 0,
  }),
  addEventListener: jest.fn(),
  drawCircle: jest.fn(),
} as unknown

const canvas = new Canvas(canvasElement as HTMLCanvasElement)

const view = new View(canvas, {
  onMouseDown: jest.fn(),
  onMouseMove: jest.fn(),
  onMouseUp: jest.fn(),
  onReset: jest.fn(),
  onAboutMenu: jest.fn(),
})

describe('View class method', () => {
  it(`getCursorPosition should return Point`, () => {
    const event = {
      clientX: 11,
      clientY: 11,
    } as MouseEvent

    const result = view.getCursorPosition(event)

    expect(result).toStrictEqual({ x: 11, y: 11 })
  })

  it(`drawPoint should draw circle and tooltip`, () => {
    const point = {
      x: 10,
      y: 10,
    }

    const mockedDrawCircle = jest.spyOn(Canvas.prototype, 'drawCircle')
    const mockedDrawTooltip = jest.spyOn(view, 'drawTooltip')

    view.drawPoint(point, 1)

    expect(mockedDrawCircle).toHaveBeenCalledTimes(1)
    expect(mockedDrawTooltip).toHaveBeenCalledTimes(1)
  })

  it(`drawParallelogram should call draw drawParallelogram`, () => {
    const points = [
      { x: 299, y: 376 },
      { x: 654, y: 229 },
      { x: 669, y: 463 },
      { x: 314, y: 610 },
    ]

    const mockedDrawParallelogram = jest.spyOn(Canvas.prototype, 'drawParallelogram')

    view.drawParallelogram(points)

    expect(mockedDrawParallelogram).toHaveBeenCalledTimes(1)
    expect(mockedDrawParallelogram).toHaveBeenCalledWith(points)
  })

  it(`drawTooltip should draw tooltip with coordinates and index`, () => {
    const mockedDrawText = jest.spyOn(Canvas.prototype, 'drawText')

    view.drawTooltip({ x: 10, y: 10 }, '1')

    expect(mockedDrawText).toHaveBeenCalledTimes(3)
  })

  it(`drawMainCircle should draw circle based on Parallelogram area`, () => {
    const points = [
      { x: 299, y: 376 },
      { x: 654, y: 229 },
      { x: 669, y: 463 },
      { x: 314, y: 610 },
    ]

    const center = {
      x: 484,
      y: 419.5,
    }

    const mockedDrawCircle = jest.spyOn(Canvas.prototype, 'drawCircle')
    const mockedDrawTooltip = jest.spyOn(view, 'drawTooltip')

    view.drawMainCircle(points)

    expect(mockedDrawCircle).toHaveBeenCalledWith({
      ...center,
      radius: 164.75398491181556,
    })
    expect(mockedDrawTooltip).toHaveBeenCalledWith(center, 'CENTER')
  })

  it(`reDraw should redraw shapes`, () => {
    const mockedCanvasReset = jest.spyOn(Canvas.prototype, 'reset')
    const mockedDrawParallelogram = jest.spyOn(Canvas.prototype, 'drawParallelogram')
    const mockedDrawPoint = jest.spyOn(view, 'drawPoint')
    const mockedDrawMainCircle = jest.spyOn(view, 'drawMainCircle')

    const points = [
      { x: 299, y: 376 },
      { x: 654, y: 229 },
      { x: 669, y: 463 },
      { x: 314, y: 610 },
    ]

    view.reDraw(points)

    expect(mockedCanvasReset).toHaveBeenCalled()
    expect(mockedDrawParallelogram).toHaveBeenCalled()
    expect(mockedDrawPoint).toHaveBeenCalledTimes(4)
    expect(mockedDrawMainCircle).toHaveBeenCalled()
  })

  it(`reset should reset canvas`, () => {
    const mockedCanvasReset = jest.spyOn(Canvas.prototype, 'reset')

    view.reset()

    expect(mockedCanvasReset).toHaveBeenCalled()
  })
})
