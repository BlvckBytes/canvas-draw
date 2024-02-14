import { BezierCurve } from '../../types/drawable/bezier-curve.interface';
import { StyleConfig } from '../../types/style-config.interface';
import { Vector2 } from '../../types/vector2.interface';
import { StyleConfigImpl } from '../style-config-impl.class';

export class BezierCurveImpl implements BezierCurve {

  public style: StyleConfig;

  constructor(
    public start: Vector2,
    public firstControlPoint: Vector2,
    public secondControlPoint: Vector2,
    public end: Vector2,
    style?: StyleConfig,
  ) {
    this.style = style === undefined ? new StyleConfigImpl() : style;
  }

  configureStyle(receiver: (style: StyleConfig) => void): BezierCurve {
    receiver(this.style);
    return this;
  }
}