import { Stylable } from '../stylable.interface';
import { Vector2 } from '../vector2.interface';

export interface QuadraticCurve extends Stylable<QuadraticCurve> {
  start: Vector2;
  controlPoint: Vector2;
  end: Vector2;
}