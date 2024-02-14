import { Rectangle } from '../../types/drawable/rectangle.interface';
import { StyleConfig } from '../../types/style-config.interface';
import { Vector2 } from '../../types/vector2.interface';
import { StyleConfigImpl } from '../style-config-impl.class';

export class RectangleImpl implements Rectangle {

  public style: StyleConfig;
  public topLeftRadius: number;
  public topRightRadius: number;
  public bottomLeftRadius: number;
  public bottomRightRadius: number;

  constructor(
    public origin: Vector2,
    public width: number,
    public height: number,
    topLeftRadius?: number,
    topRightRadius?: number,
    bottomLeftRadius?: number,
    bottomRightRadius?: number,
    style?: StyleConfig,
  ) {
    this.style = style !== undefined ? style : new StyleConfigImpl();
    this.topLeftRadius = topLeftRadius !== undefined ? topLeftRadius             : 0;
    this.topRightRadius = topRightRadius !== undefined ? topRightRadius          : 0;
    this.bottomLeftRadius = bottomLeftRadius !== undefined ? bottomLeftRadius    : 0;
    this.bottomRightRadius = bottomRightRadius !== undefined ? bottomRightRadius : 0;
  }

  configureStyle(receiver: (style: StyleConfig) => void): Rectangle {
    receiver(this.style);
    return this;
  }
}