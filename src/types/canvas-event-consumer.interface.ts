import { PointerPosition as PointerPosition } from './pointer-position.interface';

export interface CanvasEventConsumer {
  onKeyDown(event: KeyboardEvent): void;
  onKeyUp(event: KeyboardEvent): void;
  onPointerMove(position: PointerPosition): void;
  onPointerDown(position: PointerPosition): void;
  onPointerUp(position: PointerPosition): void;
  onZoom(position: PointerPosition, magnitude: number): void;
  onPan(position: PointerPosition, deltaX: number, deltaY: number): void;
}