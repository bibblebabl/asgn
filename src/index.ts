import "./style.css";
import { Canvas } from "./canvas";
import {
  getCursorPosition,
  getDistance,
  getParallelogrammeArea,
  getParallelogrammeCords
} from "./utils";
import { MAX_CIRCLES_COUNT, CIRCLE_RADIUS, CIRCLE_DIAMETER } from "./const";
import { Point } from "./types";

document.getElementById("app").innerHTML = `
<header class="header">
<h1 class="heading">Drawer</h1>
<button class="reset" type="button">reset</button>
</header>
`;

enum Alphabet {
  "A",
  "B",
  "C",
  "D"
}

let circles: Point[] = [];

let isDragging = false;

let draggingCircle: Point | null = null;
let draggingCircleIndex: number | null = null;

const canvas = new Canvas(
  document.getElementById("canvas") as HTMLCanvasElement
);

function drawSingleCircle(pointToDraw: Point, index: number) {
  canvas.drawCircle({
    x: pointToDraw.x,
    y: pointToDraw.y,
    radius: CIRCLE_RADIUS,
    startAngle: 0,
    endAngle: 360
  });

  canvas.drawTooltip(pointToDraw, Alphabet[index]);
}

function drawFullShape() {
  const [a, b, c, d] = getParallelogrammeCords(circles);
  const pointToDraw = d;

  canvas.drawCircle({
    x: pointToDraw.x,
    y: pointToDraw.y,
    radius: CIRCLE_RADIUS
  });

  circles.push(pointToDraw);

  canvas.drawParallelogram(circles);

  const circleS = getParallelogrammeArea(circles);

  const circleRadius = Math.sqrt(circleS / Math.PI);

  canvas.drawTooltip(pointToDraw, "D");

  const center = {
    x: (a.x + c.x) / 2,
    y: (a.y + c.y) / 2
  };

  canvas.drawTooltip(center, "CENTER");

  canvas.drawCircle({
    x: center.x,
    y: center.y,
    radius: circleRadius
  });
}

function drawHandler(pointToDraw: Point) {
  if (circles.length >= MAX_CIRCLES_COUNT) return;

  drawSingleCircle(pointToDraw, circles.length);

  circles.push(pointToDraw);

  if (circles.length === MAX_CIRCLES_COUNT) drawFullShape();
}

function onMouseDown(event: MouseEvent) {
  const point = getCursorPosition(canvas.element, event);
  let pointToDraw = point;

  drawHandler(pointToDraw);
}

function reSize(event: MouseEvent) {
  const cursor = getCursorPosition(canvas.element, event);

  for (var i = 0; i < circles.length; i++) {
    const currentCircle = circles[i];
    var dx = cursor.x - currentCircle.x;
    var dy = cursor.y - currentCircle.y;
    var isIn = dx * dx + dy * dy < CIRCLE_DIAMETER;
    if (isIn) {
      draggingCircle = currentCircle;
      draggingCircleIndex = i;
    }
  }
}

canvas.on("mousedown", (event: MouseEvent) => {
  const mouseDownHandler =
    circles.length === MAX_CIRCLES_COUNT + 1 ? reSize : onMouseDown;
  isDragging = true;
  mouseDownHandler(event);
});

canvas.on("mouseup", (event: MouseEvent) => {
  isDragging = false;
  draggingCircle = null;
  draggingCircleIndex = null;
  // console.log(isDragging);
  // console.log(draggingCircle);
});

canvas.on("mousemove", (event: MouseEvent) => {
  if (isDragging) {
    const cursorPosition = getCursorPosition(canvas.element, event);

    if (draggingCircleIndex && draggingCircle) {
      const change = {
        x: cursorPosition.x - draggingCircle.x,
        y: cursorPosition.y - draggingCircle.y
      };

      console.log(change);

      const prevIndex =
        draggingCircleIndex - 1 < 0 ? 4 : draggingCircleIndex - 1;
      const nextIndex =
        draggingCircleIndex + 1 > 4 ? 0 : draggingCircleIndex + 1;

      console.log(prevIndex, nextIndex);

      circles[draggingCircleIndex] = cursorPosition;

      canvas.reset();

      drawFullShape();

      for (let index = 0; index < circles.length; index++) {
        drawSingleCircle(circles[index], index);
      }
    }
  }
});

document.body
  .querySelector("button.reset")
  .addEventListener("mousedown", () => {
    canvas.reset();
    circles = [];
  });
