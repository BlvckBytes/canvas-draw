import { Color } from './color.interface';

export interface ColorSupplier {
  get(): Color;
}