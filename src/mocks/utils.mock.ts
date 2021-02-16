export const utilsMocks = {
  getParallelogramPoints: [
    {
      points: [
        { x: 101, y: 350 },
        { x: 482, y: 146 },
        { x: 495, y: 394 },
      ],
    },
    {
      points: [
        { x: 274, y: 505 },
        { x: 578, y: 318 },
        { x: 659, y: 677 },
      ],
    },
    {
      points: [
        { x: 303, y: 309 },
        { x: 643, y: 227 },
        { x: 512, y: 503 },
      ],
    },
    {
      points: [
        { x: 308, y: 364 },
        { x: 741, y: 253 },
        { x: 430, y: 554 },
      ],
    },
  ],

  getDistance: [
    {
      points: {
        a: { x: 106, y: 474 },
        b: { x: 596, y: 215 },
      },
      expected: 554.2391180708919,
    },
    {
      points: {
        a: { x: 596, y: 215 },
        b: { x: 553, y: 579 },
      },
      expected: 366.5310355208683,
    },
    {
      points: {
        a: { x: 596, y: 215 },
        b: { x: 63, y: 838 },
      },
      expected: 819.8890168797238,
    },
  ],

  getParallelogramArea: [
    {
      points: [
        { x: 229, y: 436 },
        { x: 556, y: 264 },
        { x: 578, y: 577 },
        { x: 251, y: 749 },
      ],
      expected: 106134.99999999997,
    },
    {
      points: [
        { x: 229, y: 436 },
        { x: 357, y: 114 },
        { x: 379, y: 427 },
        { x: 251, y: 749 },
      ],
      expected: 47147.99999999999,
    },
    {
      points: [
        { x: 229, y: 436 },
        { x: 478, y: 199 },
        { x: 500, y: 512 },
        { x: 251, y: 749 },
      ],

      expected: 83151.00000000006,
    },
  ],
}
