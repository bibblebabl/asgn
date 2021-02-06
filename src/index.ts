import "./style.css";
import { Canvas } from "./canvas";
import { getCursorPosition } from "./utils";
import { CIRCLE_SIZE } from "./const";

document.getElementById("app").innerHTML = `
<h1 class="heading">Drawer</h1>
`;

const canvas = new Canvas(
  document.getElementById("canvas") as HTMLCanvasElement
);

canvas.on("mousedown", function (event: MouseEvent) {
  const { x, y } = getCursorPosition(canvas.element, event);

  canvas.drawCircle({
    x,
    y,
    radius: CIRCLE_SIZE / 2,
    startAngle: 0,
    endAngle: 360
  });
});
