import { Stylable } from '../stylable.interface';
import { Vector2 } from '../vector2.interface';

export interface Ellipse extends Stylable<Ellipse> {
  origin: Vector2;
  radiusX: number;
  radiusY: number;
  startAngle: number;
  endAngle: number;
}