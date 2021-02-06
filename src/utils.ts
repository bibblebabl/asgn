export function getCursorPosition(
  canvas: HTMLCanvasElement,
  event: MouseEvent
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x, y };
}
