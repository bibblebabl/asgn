import "./style.css";
import { Canvas } from "./canvas";

document.getElementById("app").innerHTML = `
<h1 class="heading">Drawer</h1>
`;

const canvas = new Canvas(
  document.getElementById("canvas") as HTMLCanvasElement
);

function getCursorPosition(
  canvas: HTMLCanvasElement,
  event: MouseEvent
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x, y };
}

canvas.on("mousedown", function (event: MouseEvent) {
  const { x, y } = getCursorPosition(canvas.element, event);

  console.log(x, y);
});
