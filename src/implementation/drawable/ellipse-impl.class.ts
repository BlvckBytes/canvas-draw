import { Ellipse } from '../../types/drawable/ellipse.interface';
import { StyleConfig } from '../../types/style-config.interface';
import { Vector2 } from '../../types/vector2.interface';
import { StyleConfigImpl } from '../style-config-impl.class';

export class EllipseImpl implements Ellipse {

  public style: StyleConfig;
  public startAngle: number = 0;
  public endAngle: number = 2 * Math.PI;

  constructor(
    public origin: Vector2,
    public radiusX: number,
    public radiusY: number,
    startAngle?: number,
    endAngle?: number,
    style?: StyleConfig,
  ) {
    this.style = style !== undefined ? style : new StyleConfigImpl();
    this.startAngle = startAngle !== undefined ? startAngle : 0;
    this.endAngle = endAngle !== undefined ? endAngle       : 2 * Math.PI;
  }

  configureStyle(receiver: (style: StyleConfig) => void): Ellipse {
    receiver(this.style);
    return this;
  }
}