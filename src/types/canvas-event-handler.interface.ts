export interface CanvasEventHandler {

  onCanvasMouseDown(): void;

  onCanvasMouseUp(): void;

  onCanvasMouseMove(): void;

  onCanvasKeyDown(keyEvent: KeyboardEvent): void;

  onCanvasKeyUp(keyEvent: KeyboardEvent): void;

  onCanvasZoom(delta: number): void;

  onCanvasScroll(deltaX: number, deltaY: number): void;

  onCanvasSetup(): void;

}