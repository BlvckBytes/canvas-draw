import { Line } from '../../types/drawable/line.interface';
import { StyleConfig } from '../../types/style-config.interface';
import { Vector2 } from '../../types/vector2.interface';
import { StyleConfigImpl } from '../style-config-impl.class';

export class LineImpl implements Line {

  public style: StyleConfig;

  constructor(
    public start: Vector2,
    public end: Vector2,
    style?: StyleConfig,
  ) {
    this.style = style !== undefined ? style : new StyleConfigImpl();
  }

  configureStyle(receiver: (style: StyleConfig) => void): Line {
    receiver(this.style);
    return this;
  }
}