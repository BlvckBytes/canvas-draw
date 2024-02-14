import { Stylable } from '../stylable.interface';
import { Vector2 } from '../vector2.interface';

export interface Rectangle extends Stylable<Rectangle> {
  origin: Vector2;
  width: number;
  height: number;
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
}