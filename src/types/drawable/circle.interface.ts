import { Stylable } from '../stylable.interface';
import { Vector2 } from '../vector2.interface';

export interface Circle extends Stylable<Circle> {
  origin: Vector2;
  radius: number;
  startAngle: number;
  endAngle: number;
}