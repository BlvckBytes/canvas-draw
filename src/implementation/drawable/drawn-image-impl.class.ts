import { DrawnImage } from '../../types/drawable/drawn-image.interface';
import { StyleConfig } from '../../types/style-config.interface';
import { Vector2 } from '../../types/vector2.interface';
import { StyleConfigImpl } from '../style-config-impl.class';

export class DrawnImageImpl implements DrawnImage {

  public style: StyleConfig;
  public width: number | null;
  public height: number | null;
  public centerRotationOrigin: boolean;

  constructor(
    public origin: Vector2,
    public source: string,
    width?: number | null,
    height?: number | null,
    centerRotationOrigin?: boolean,
    style?: StyleConfig,
  ) {
    this.style = style !== undefined ? style : new StyleConfigImpl();
    this.width = width !== undefined ? width                                              : null;
    this.height = height !== undefined ? height                                           : null;
    this.centerRotationOrigin = centerRotationOrigin !== undefined ? centerRotationOrigin : false;
  }

  configureStyle(receiver: (style: StyleConfig) => void): DrawnImage {
    receiver(this.style);
    return this;
  }
}