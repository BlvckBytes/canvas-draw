import { CanvasHandle } from './canvas-handle.interface';

export interface CanvasEventHandler {

  onCanvasMouseDown(canvas: CanvasHandle): void;

  onCanvasMouseUp(canvas: CanvasHandle): void;

  onCanvasMouseMove(canvas: CanvasHandle): void;

  onCanvasKeyDown(canvas: CanvasHandle, keyEvent: KeyboardEvent): void;

  onCanvasKeyUp(canvas: CanvasHandle, keyEvent: KeyboardEvent): void;

  onCanvasZoom(canvas: CanvasHandle, delta: number): void;

  onCanvasScroll(canvas: CanvasHandle, deltaX: number, deltaY: number): void;

  onCanvasSetup(canvas: CanvasHandle): void;

}