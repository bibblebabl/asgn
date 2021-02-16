export const appMocks = {
  updatePointsCoordinatesMock: [
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
  ],

  onMouseMove: [
    {
      points: [
        { x: 229, y: 436 },
        { x: 556, y: 264 },
        { x: 578, y: 577 },
        { x: 251, y: 749 },
      ],
    },
    {
      points: [
        { x: 229, y: 436 },
        { x: 357, y: 114 },
        { x: 379, y: 427 },
        { x: 251, y: 749 },
      ],
    },
    {
      points: [
        { x: 229, y: 436 },
        { x: 478, y: 199 },
        { x: 500, y: 512 },
        { x: 251, y: 749 },
      ],
    },
  ],

  handleDrag: [
    {
      event: {
        clientX: 225,
        clientY: 433,
      },
      points: [
        { x: 229, y: 436 },
        { x: 556, y: 264 },
        { x: 578, y: 577 },
        { x: 251, y: 749 },
      ],
      expected: 0,
    },
    {
      event: {
        clientX: 352,
        clientY: 110,
      },
      points: [
        { x: 229, y: 436 },
        { x: 357, y: 114 },
        { x: 379, y: 427 },
        { x: 251, y: 749 },
      ],
      expected: 1,
    },
    {
      event: {
        clientX: 500,
        clientY: 512,
      },
      points: [
        { x: 229, y: 436 },
        { x: 478, y: 199 },
        { x: 500, y: 512 },
        { x: 251, y: 749 },
      ],
      expected: 2,
    },
  ],
}
