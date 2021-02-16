jest.mock('./canvas')
jest.mock('./view')

import { App } from './app'
import { View } from './view'

const updatePointsCoordinatesMock = [
  {
    cursorPosition: { x: 669, y: 463 },
    draggingPointIndex: 2,
    points: [
      { x: 299, y: 376 },
      { x: 654, y: 229 },
      { x: 669, y: 463 },
      { x: 314, y: 610 },
    ],
    expected: [
      { x: 299, y: 376 },
      { x: 654, y: 229 },
      { x: 669, y: 463 },
      { x: 314, y: 610 },
    ],
  },
]

describe(`App class methods`, () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe(`updatePointsCoordinates`, () => {
    it(`changes points coordinates if it has correct draggingPointIndex`, () => {
      const app = new App({} as HTMLCanvasElement)

      for (const {
        cursorPosition,
        draggingPointIndex,
        points,
        expected,
      } of updatePointsCoordinatesMock) {
        app.state.draggingPointIndex = draggingPointIndex

        app.state.points = points

        app.updatePointsCoordinates(cursorPosition)

        expect(app.state.points).toStrictEqual(expected)
      }
    })

    it(`doesn't change points if draggingPointIndex is null`, () => {
      const app = new App({} as HTMLCanvasElement)

      app.state.draggingPointIndex === null

      app.updatePointsCoordinates({ x: 0, y: 0 })

      expect(app.state.points).toStrictEqual([])
    })
  })

  it(`onMouseDown draws point`, () => {
    const app = new App({} as HTMLCanvasElement)

    const event = {
      clientX: 10,
      clientY: 10,
    } as MouseEvent

    const mockedDrawPoint = jest.spyOn(View.prototype, 'drawPoint')

    jest.spyOn(View.prototype, 'getCursorPosition').mockReturnValue({
      x: 10,
      y: 10,
    })

    app.onMouseDown(event)

    expect(mockedDrawPoint).toHaveBeenCalledWith({ x: 10, y: 10 }, 0)
  })

  describe(`onMouseMove`, () => {
    it(`doesn't call update and redraw functions if isDragging and draggingPointIndex are falsy`, () => {
      const app = new App({} as HTMLCanvasElement)
      const mockedUpdatePointsCoordinates = jest.spyOn(app, 'updatePointsCoordinates')
      const mockedGetCursorPosition = jest.spyOn(View.prototype, 'getCursorPosition')
      const mockedReDraw = jest.spyOn(View.prototype, 'reDraw')

      app.onMouseMove({} as MouseEvent)

      expect(mockedUpdatePointsCoordinates).not.toHaveBeenCalled()
      expect(mockedGetCursorPosition).not.toHaveBeenCalled()
      expect(mockedReDraw).not.toHaveBeenCalled()
    })

    it(`calls update and redraw functions if isDragging and draggingPointIndex are truthy, and `, () => {
      const app = new App({} as HTMLCanvasElement)
      const mockedGetCursorPosition = jest.spyOn(View.prototype, 'getCursorPosition')
      const mockedUpdatePointsCoordinates = jest.spyOn(app, 'updatePointsCoordinates')
      const mockedReDraw = jest.spyOn(View.prototype, 'reDraw')

      app.state.points = [
        { x: 299, y: 376 },
        { x: 654, y: 229 },
        { x: 669, y: 463 },
        { x: 314, y: 610 },
      ]

      app.state.isDragging = true
      app.state.draggingPointIndex = 2

      app.onMouseMove({
        clientX: 10,
        clientY: 10,
      } as MouseEvent)

      expect(mockedGetCursorPosition).toHaveBeenCalled()
      expect(mockedUpdatePointsCoordinates).toHaveBeenCalled()
      expect(mockedReDraw).toHaveBeenCalled()
    })
  })

  describe(`handleDrag`, () => {
    it(`should set dragging index of selected point`, () => {
      const app = new App({} as HTMLCanvasElement)

      const event = {
        clientX: 562,
        clientY: 555,
      }

      jest.spyOn(View.prototype, 'getCursorPosition').mockReturnValue({
        x: event.clientX,
        y: event.clientY,
      })

      app.state.points = [
        { x: 174, y: 429 },
        { x: 586, y: 218 },
        { x: 562, y: 561 },
        { x: 150, y: 772 },
      ]

      app.handleDrag(event as MouseEvent)

      expect(app.state.draggingPointIndex).toStrictEqual(2)
    })

    it(`shouldn't set dragging index if event coords aren't close`, () => {
      const app = new App({} as HTMLCanvasElement)

      const event = {
        clientX: 11,
        clientY: 11,
      }

      app.state.points = [
        { x: 205, y: 407 },
        { x: 565, y: 176 },
        { x: 699, y: 579 },
        { x: 339, y: 810 },
      ]

      app.handleDrag(event as MouseEvent)

      expect(app.state.draggingPointIndex).toStrictEqual(null)
    })
  })
})
