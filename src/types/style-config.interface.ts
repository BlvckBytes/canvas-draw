import { ColorSupplier } from './color-supplier.interface';
import { Vector2 } from './vector2.interface';

export interface StyleConfig {
  strokeWidth: number;
  strokeColor: ColorSupplier | null;
  fillColor: ColorSupplier | null;
  rotation: number;
  rotationOrigin: Vector2 | null;

  // An array of numbers that specify distances to alternately draw a
  // line and a gap (in coordinate space units)
  lineDash: number[];

  lineCap: 'butt' | 'round' | 'square';
  lineJoin: 'round' | 'bevel' | 'miter';
}