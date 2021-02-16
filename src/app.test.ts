jest.mock('./canvas')
jest.mock('./view')

import { App } from './app'
import { appMocks } from './mocks/app.mock'
import { View } from './view'

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
      } of appMocks.updatePointsCoordinatesMock) {
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

      for (const mock of appMocks.onMouseMove) {
        app.state.points = mock.points

        app.state.isDragging = true
        app.state.draggingPointIndex = 2

        app.onMouseMove({
          clientX: 10,
          clientY: 10,
        } as MouseEvent)

        expect(mockedGetCursorPosition).toHaveBeenCalled()
        expect(mockedUpdatePointsCoordinates).toHaveBeenCalled()
        expect(mockedReDraw).toHaveBeenCalled()
      }
    })
  })

  describe(`handleDrag`, () => {
    it(`should set dragging index of selected point`, () => {
      const app = new App({} as HTMLCanvasElement)

      for (const mocks of appMocks.handleDrag) {
        const event = mocks.event

        jest.spyOn(View.prototype, 'getCursorPosition').mockReturnValue({
          x: event.clientX,
          y: event.clientY,
        })

        app.state.points = mocks.points

        app.handleDrag(event as MouseEvent)

        expect(app.state.draggingPointIndex).toStrictEqual(mocks.expected)
      }
    })

    it(`shouldn't set dragging index if event coords aren't close`, () => {
      const app = new App({} as HTMLCanvasElement)

      const event = {
        clientX: 11,
        clientY: 11,
      }

      for (const mocks of appMocks.handleDrag) {
        jest.spyOn(View.prototype, 'getCursorPosition').mockReturnValue({
          x: event.clientX,
          y: event.clientY,
        })

        app.state.points = mocks.points

        app.handleDrag(event as MouseEvent)

        expect(app.state.draggingPointIndex).toStrictEqual(null)
      }
    })
  })
})
