import { Stylable } from '../stylable.interface';
import { Vector2 } from '../vector2.interface';

export interface BezierCurve extends Stylable<BezierCurve> {
  start: Vector2;
  firstControlPoint: Vector2;
  secondControlPoint: Vector2;
  end: Vector2;
}