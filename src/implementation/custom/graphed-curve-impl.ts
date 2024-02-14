import { ColorSupplier } from '../../types/color-supplier.interface';
import { GraphedCurve } from '../../types/custom/graphed-curve.interface';
import { Drawable } from '../../types/drawable/drawable.type';
import { Line } from '../../types/drawable/line.interface';
import { Vector2 } from '../../types/vector2.interface';
import { CustomPathImpl } from '../drawable/custom-path-impl.class';
import { LineImpl } from '../drawable/line-impl.class';

export class GraphedCurveImpl implements GraphedCurve {

  type: 'drawable-composite' = 'drawable-composite';

  public curveStrokeWidth = 1/10;

  public xStart = 0;
  public xEnd = 2;
  public stepSize = 1/10;

  constructor(
    public origin: Vector2,
    public curveColor: ColorSupplier,
    public curve: (x: number) => number,
    xStart?: number,
    xEnd?: number,
    stepSize?: number,
  ) {
    if (xStart !== undefined)
      this.xStart = xStart;

    if (xEnd !== undefined)
      this.xEnd = xEnd;

    if (stepSize !== undefined)
      this.stepSize = stepSize;
  }

  compose(): Drawable[] {
    const drawables: Drawable[] = [];
    const lineSegments: Line[] = [];

    let lastPoint: Vector2 | null = null;
    for (let x = this.xStart; x <= this.xEnd; x += this.stepSize) {
      const point = this.origin.copy().addValues(x, this.curve(x));

      if (lastPoint == null) {
        lastPoint = point;
        continue;
      }

      lineSegments.push(new LineImpl(lastPoint, point));
      lastPoint = point;
    }

    // Force last point, no matter of the step-size
    if (lastPoint)
      lineSegments.push(new LineImpl(lastPoint, this.origin.copy().addValues(this.xEnd, this.curve(this.xEnd))));

    const customPath = new CustomPathImpl(lineSegments);
    customPath.style.strokeWidth = this.curveStrokeWidth;
    customPath.style.strokeColor = this.curveColor;
    drawables.push(customPath);

    return drawables;
  }
}