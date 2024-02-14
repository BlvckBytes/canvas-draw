import { Stylable } from '../stylable.interface';
import { Vector2 } from '../vector2.interface';

export type TextAlignment = 'start' | 'end' | 'left' | 'right' | 'center';
export type TextBaseline = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';

export interface Typography extends Stylable<Typography> {
  location: Vector2;
  text: string;
  fontFamily: string;
  fontSize: number;
  alignment: TextAlignment;
  baseline: TextBaseline;
}