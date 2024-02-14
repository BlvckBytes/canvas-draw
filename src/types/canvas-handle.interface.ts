import { ControlRegistry } from './controls/control-registry.interface';
import { Vector2 } from './vector2.interface';

export interface CanvasHandle {
  controlRegistry: ControlRegistry;
  draw(increaseFrameId: boolean): void
  getCurrentFrameIndex(): number;
  getLastMousePosition(): Vector2
  setZoomLevel(amount: number): number
  getZoomLevel(): number
  setZoomConstraints(minimum: number, maximum: number): void
}