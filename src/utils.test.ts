import { getParallelogramPoints, getDistance, getParallelogramArea } from './utils'

import { utilsMocks } from './mocks/utils.mock'

describe(`Util functions are working correctly`, () => {
  it(`${getParallelogramPoints} should return array with 4 elements`, () => {
    for (const mock of utilsMocks.getParallelogramPoints) {
      const points = mock.points

      const [a, b, c, d] = getParallelogramPoints(points)

      const distAB = getDistance(a, b)
      const distCD = getDistance(c, d)
      const distBC = getDistance(b, c)
      const distAD = getDistance(a, d)

      const sidesAreParallel = distAB === distCD && distBC === distAD

      expect(sidesAreParallel).toBeTruthy()
    }
  })

  it(`${getDistance} should calculate correct distance`, () => {
    for (const mock of utilsMocks.getDistance) {
      expect(getDistance(mock.points.a, mock.points.b)).toStrictEqual(mock.expected)
    }
  })

  it(`${getParallelogramArea} should return correct area value`, () => {
    for (const mock of utilsMocks.getParallelogramArea) {
      expect(getParallelogramArea(mock.points)).toStrictEqual(mock.expected)
    }
  })
})
