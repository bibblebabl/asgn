import "./style.css";
import { Canvas } from "./canvas";
import { getCursorPosition, getParalellogrammCords } from "./utils";
import { MAX_CIRCLES_COUNT, CIRCLE_SIZE } from "./const";
import { Point } from "./types";

document.getElementById("app").innerHTML = `
<h1 class="heading">Drawer</h1>
`;

let circles: Point[] = [];

const canvas = new Canvas(
  document.getElementById("canvas") as HTMLCanvasElement
);

canvas.on("mousedown", function (event: MouseEvent) {
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

  circles.push(pointToDraw);

  if (circles.length === MAX_CIRCLES_COUNT) {
    const [fourthPoint] = getParalellogrammCords(circles);
    pointToDraw = fourthPoint;

    canvas.drawCircle({
      x: pointToDraw.x,
      y: pointToDraw.y,
      radius: CIRCLE_SIZE / 2,
      startAngle: 0,
      endAngle: 360
    });

    circles.push(pointToDraw);
  }
});
