import { Drawable } from './drawable.type';

export interface DrawableComposite {
  type: 'drawable-composite';
  compose(): Drawable[];
}