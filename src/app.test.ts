jest.mock('./canvas')
jest.mock('./view')

import { App } from './app'
import { View } from './view'

const app = new App({} as HTMLCanvasElement)

describe(`App class methods are working correctly`, () => {
  it(`App onMouseDown draws point`, () => {
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
})
