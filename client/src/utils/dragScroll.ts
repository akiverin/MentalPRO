export function enableDragScroll(container: HTMLElement) {
  if (!container) return;

  let pos = { top: 0, left: 0, x: 0, y: 0 };
  let isDragging = false;

  const mouseDownHandler = (e: MouseEvent) => {
    // Игнорируем, если клик был по ссылке (чтобы не срабатывать при нажатии на иконку)
    if ((e.target as HTMLElement).closest("a")) return;

    isDragging = true;
    pos = {
      left: container.scrollLeft,
      top: container.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    container.style.cursor = "grabbing";
    container.style.userSelect = "none";

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    container.scrollLeft = pos.left - dx;
    container.scrollTop = pos.top - dy;
  };

  const mouseUpHandler = () => {
    if (!isDragging) return;

    isDragging = false;
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);

    container.style.cursor = "grab";
    container.style.removeProperty("user-select");
  };

  container.addEventListener("mousedown", mouseDownHandler);
}
