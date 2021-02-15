import { getParallelogramPoints, getDistance, getParallelogramArea } from './utils'

describe(`Util functions are working correctly`, () => {
  it(`${getParallelogramPoints} should return array with 4 elements`, () => {
    const threePoints = [
      { x: 1, y: 1 },
      { x: 44, y: 44 },
      { x: 100, y: 100 },
    ]

    const [a, b, c, d] = getParallelogramPoints(threePoints)

    const distAB = getDistance(a, b)
    const distCD = getDistance(c, d)
    const distBC = getDistance(b, c)
    const distAD = getDistance(a, d)

    expect(distAB === distCD && distBC === distAD).toBeTruthy()
  })

  it(`${getDistance} should calculate correct distance`, () => {
    const a = { x: 392, y: 146 }
    const b = { x: 240, y: 333 }

    expect(getDistance(a, b)).toStrictEqual(240.9834019180574)
  })

  it(`${getParallelogramArea} should return correct area value`, () => {
    expect(
      getParallelogramArea([
        { x: 229, y: 94 },
        { x: 99, y: 297 },
        { x: 392, y: 228 },
        { x: 522, y: 25 },
      ])
    ).toStrictEqual(50508.99999999999)
  })
})
