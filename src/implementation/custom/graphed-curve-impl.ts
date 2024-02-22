import { ColorSupplier } from '../../types/color-supplier.interface';
import { GraphedCurve } from '../../types/custom/graphed-curve.interface';
import { Drawable } from '../../types/drawable/drawable.type';
import { Line } from '../../types/drawable/line.interface';
import { Vector2 } from '../../types/vector2.interface';
import { CustomPathImpl } from '../drawable/custom-path-impl.class';
import { LineImpl } from '../drawable/line-impl.class';

export class GraphedCurveImpl implements GraphedCurve {

  type: 'drawable-composite' = 'drawable-composite';

  public curveStrokeWidth: number;
  public xStart: number;
  public xEnd: number;
  public stepSize: number;

  constructor(
    public origin: Vector2,
    public curveColor: ColorSupplier,
    public curve: (x: number) => number,
    xStart?: number,
    xEnd?: number,
    stepSize?: number,
    curveStrokeWidth?: number,
  ) {
    this.xStart = xStart !== undefined ? xStart                               : 0;
    this.xEnd = xEnd !== undefined ? xEnd                                     : 2;
    this.stepSize = stepSize !== undefined ? stepSize                         : 1/10;
    this.curveStrokeWidth = curveStrokeWidth !== undefined ? curveStrokeWidth : 1/10;
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