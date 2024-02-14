import { Stylable } from '../stylable.interface';
import { Vector2 } from '../vector2.interface';

export interface Line extends Stylable<Line> {
  start: Vector2;
  end: Vector2;
}