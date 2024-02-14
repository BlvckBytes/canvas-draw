import { ColorSupplier } from '../types/color-supplier.interface';
import { StyleConfig } from '../types/style-config.interface';
import { Vector2 } from '../types/vector2.interface';

export const COLOR_BLACK: ColorSupplier = {
  get: () => ({ r: 0, g: 0, b: 0, a: 1, })
};

export class StyleConfigImpl implements StyleConfig {

  constructor(
    public strokeWidth: number = .1,
    public strokeColor: ColorSupplier | null = COLOR_BLACK,
    public fillColor: ColorSupplier | null = null,
    public rotation: number = 0,
    public rotationOrigin: Vector2 | null = null,

    // An array of numbers that specify distances to alternately draw a
    // line and a gap (in coordinate space units)
    public lineDash: number[] = [],

    public lineCap: 'butt' | 'round' | 'square' = 'butt',
    public lineJoin: 'round' | 'bevel' | 'miter' = 'miter'
  ) {}
}