import "./style.css";
import { Canvas } from "./canvas";
import {
  getCursorPosition,
  getDistance,
  getParallelogrammeCords
} from "./utils";
import { MAX_CIRCLES_COUNT, CIRCLE_SIZE } from "./const";
import { Point } from "./types";

document.getElementById("app").innerHTML = `
<h1 class="heading">Drawer</h1>
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
    radius: CIRCLE_SIZE / 2,
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
      radius: CIRCLE_SIZE / 2
    });

    circles.push(pointToDraw);

    canvas.drawParallelogram(circles);

    console.log(getDistance(a, c));
    console.log(getDistance(b, d));

    const center = {
      x: a.x + getDistance(a, c) / 2,
      y: b.y + getDistance(b, d) / 2
    };

    canvas.drawTooltip(center, "CENTER");

    canvas.drawCircle({
      x: center.x,
      y: center.y,
      radius: 100 / 2
    });

    canvas.drawTooltip(pointToDraw, "D");
  }
}

canvas.on("mousedown", onMouseDown);
