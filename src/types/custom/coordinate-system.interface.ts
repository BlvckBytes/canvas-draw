import { ColorSupplier } from '../color-supplier.interface';
import { DrawableComposite } from '../drawable/drawable-composite.interface';
import { Vector2 } from '../vector2.interface';

export interface CoordinateSystem extends DrawableComposite {
  axisStrokeWidth: number;
  gridStrokeWidth: number;
  width: number;
  height: number;
  origin: Vector2;
  xStepSize: number;
  yStepSize: number;
  axisColor: ColorSupplier | null;
  gridColor: ColorSupplier | null;

  accountForOrigin(point: Vector2): Vector2;
}