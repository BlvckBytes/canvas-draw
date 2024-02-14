import { ColorSupplier } from '../color-supplier.interface';
import { DrawableComposite } from '../drawable/drawable-composite.interface';
import { Vector2 } from '../vector2.interface';

export interface GraphedCurve extends DrawableComposite {
  origin: Vector2,
  curve: (x: number) => number,
  xStart: number;
  xEnd: number;
  stepSize: number;
  curveColor: ColorSupplier;
}