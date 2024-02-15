import { ColorSupplier } from '../../types/color-supplier.interface';
import { Drawable } from '../../types/drawable/drawable.type';
import { DrawableComposite } from '../../types/drawable/drawable-composite.interface';
import { Vector2 } from '../../types/vector2.interface';
import { LineImpl } from '../drawable/line-impl.class';
import { COLOR_BLACK_SUPPLIER } from '../style-config-impl.class';
import { Vector2Impl } from '../vector2-impl.class';

export class CoordinateSystemImpl implements DrawableComposite {

  type: 'drawable-composite' = 'drawable-composite';

  public axisStrokeWidth = 1/10;
  public gridStrokeWidth = 5/100;

  public xStepSize = 1;
  public yStepSize = 1;
  public axisColor: ColorSupplier | null = COLOR_BLACK_SUPPLIER;
  public gridColor: ColorSupplier | null = COLOR_BLACK_SUPPLIER;

  constructor(
    public width: number,
    public height: number,
    public origin: Vector2,
    xStepSize?: number,
    yStepSize?: number,
    axisColor?: ColorSupplier | null,
    gridColor?: ColorSupplier | null,
  ) {
    if (xStepSize !== undefined)
      this.xStepSize = xStepSize;

    if (yStepSize !== undefined)
      this.yStepSize = yStepSize;

    if (axisColor !== undefined)
      this.axisColor = axisColor;

    if (gridColor !== undefined)
      this.gridColor = gridColor;
  }

  accountForOrigin(point: Vector2): Vector2 {
    return point.copy().add(this.origin);
  }

  compose(): Drawable[] {
    const drawables: Drawable[] = [];

    if (this.axisColor !== null) {
      const xAxis = new LineImpl(new Vector2Impl(0, this.origin.y), new Vector2Impl(this.width, this.origin.y));
      xAxis.style.strokeColor = this.axisColor;
      xAxis.style.strokeWidth = this.axisStrokeWidth;
      drawables.push(xAxis);

      const yAxis = new LineImpl(new Vector2Impl(this.origin.x, 0), new Vector2Impl(this.origin.x, this.height));
      yAxis.style.strokeColor = this.axisColor;
      yAxis.style.strokeWidth = this.axisStrokeWidth;
      drawables.push(yAxis);
    }

    const drawGridLine = (start: Vector2, end: Vector2) => {
      const verticalGridLine = new LineImpl(start, end);
      verticalGridLine.style.strokeColor = this.gridColor;
      verticalGridLine.style.strokeWidth = this.gridStrokeWidth;
      drawables.push(verticalGridLine);
    }

    // Vertical lines

    if (this.gridColor !== null) {
      for (let x = this.origin.x - this.xStepSize; x > 0; x -= this.xStepSize)
        drawGridLine(new Vector2Impl(x, 0), new Vector2Impl(x, this.height));

      for (let x = this.origin.x + this.xStepSize; x < this.width; x += this.xStepSize)
        drawGridLine(new Vector2Impl(x, 0), new Vector2Impl(x, this.height));

      // Horizontal lines

      for (let y = this.origin.y - this.yStepSize; y > 0; y -= this.yStepSize)
        drawGridLine(new Vector2Impl(0, y), new Vector2Impl(this.width, y));

      for (let y = this.origin.y + this.yStepSize; y < this.width; y += this.yStepSize)
        drawGridLine(new Vector2Impl(0, y), new Vector2Impl(this.width, y));
    }

    return drawables;
  }
}