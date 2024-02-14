import { StyleConfig } from '../../types/style-config.interface';
import { TextAlignment, TextBaseline, Typography } from '../../types/drawable/typography.interface';
import { Vector2 } from '../../types/vector2.interface';
import { StyleConfigImpl } from '../style-config-impl.class';

export class TypographyImpl implements Typography {

  public style: StyleConfig;
  public fontFamily: string;
  public fontSize: number;
  public alignment: TextAlignment;
  public baseline: TextBaseline;

  constructor(
    public location: Vector2,
    public text: string,
    fontFamily?: string,
    fontSize?: number,
    alignment?: TextAlignment,
    baseline?: TextBaseline,
    style?: StyleConfig,
  ) {
    this.style = style !== undefined ? style : new StyleConfigImpl();
    this.fontFamily = fontFamily !== undefined ? fontFamily : 'sans-serif';
    this.fontSize = fontSize !== undefined ? fontSize       : 1;
    this.alignment = alignment !== undefined ? alignment    : 'start';
    this.baseline = baseline !== undefined ? baseline       : 'alphabetic';
  }

  configureStyle(receiver: (style: StyleConfig) => void): Typography {
    receiver(this.style);
    return this;
  }
}