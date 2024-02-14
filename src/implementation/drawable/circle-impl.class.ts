import { Circle } from '../../types/drawable/circle.interface';
import { StyleConfig } from '../../types/style-config.interface';
import { Vector2 } from '../../types/vector2.interface';
import { StyleConfigImpl } from '../style-config-impl.class';

export class CircleImpl implements Circle {

  public style: StyleConfig;
  public startAngle: number;
  public endAngle: number;

  constructor(
    public origin: Vector2,
    public radius: number,
    startAngle?: number,
    endAngle?: number,
    style?: StyleConfig,
  ) {
    this.style = style !== undefined ? style : new StyleConfigImpl();
    this.startAngle = startAngle !== undefined ? startAngle : 0;
    this.endAngle = endAngle !== undefined ? endAngle       : 2 * Math.PI;
  }

  configureStyle(receiver: (style: StyleConfig) => void): Circle {
    receiver(this.style);
    return this;
  }
}