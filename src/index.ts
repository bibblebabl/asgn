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

const canvas = new Canvas(
  document.getElementById("canvas") as HTMLCanvasElement
);

function onMouseDown(event: MouseEvent) {
  const point = getCursorPosition(canvas.element, event);
  let pointToDraw = point;

  if (circles.length >= MAX_CIRCLES_COUNT) return;

  canvas.drawCircle({
    x: pointToDraw.x,
    y: pointToDraw.y,
    radius: CIRCLE_RADIUS,
    startAngle: 0,
    endAngle: 360
  });

  canvas.drawTooltip(point, Alphabet[circles.length]);

  circles.push(pointToDraw);

  if (circles.length === MAX_CIRCLES_COUNT) {
    const [a, b, c, d] = getParallelogrammeCords(circles);
    pointToDraw = d;

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
}

function reSize(event: MouseEvent) {
  const cursor = getCursorPosition(canvas.element, event);

  // const point = circles.find(
  //   (el) =>
  //     el.x - CIRCLE_RADIUS <= cursor.x <= el.x + CIRCLE_RADIUS &&
  //     el.y - CIRCLE_RADIUS <= cursor.y <= el.y + CIRCLE_RADIUS
  // );

  for (var i = 0; i < circles.length; i++) {
    const currentCircle = circles[i];
    var dx = cursor.x - currentCircle.x;
    var dy = cursor.y - currentCircle.y;
    var isIn = dx * dx + dy * dy < CIRCLE_DIAMETER;
    if (isIn) {
      alert(
        `You clicked in the " + x: ${currentCircle.x} y: ${currentCircle.y}`
      );
    }
  }

  console.log(cursor);
}

canvas.on("mousedown", (event: MouseEvent) => {
  const handler =
    circles.length === MAX_CIRCLES_COUNT + 1 ? reSize : onMouseDown;

  handler(event);
});

document.body
  .querySelector("button.reset")
  .addEventListener("mousedown", () => {
    canvas.reset();
    circles = [];
  });
