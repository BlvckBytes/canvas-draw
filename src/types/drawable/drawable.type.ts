import { Typography } from './typography.interface';
import { BezierCurve } from './bezier-curve.interface';
import { Circle } from './circle.interface';
import { CustomPath } from './custom-path.interface';
import { DrawableComposite } from './drawable-composite.interface';
import { DrawnImage } from './drawn-image.interface';
import { Ellipse } from './ellipse.interface';
import { Line } from './line.interface';
import { QuadraticCurve } from './quadratic-curve.interface';
import { Rectangle } from './rectangle.interface';

export type Drawable = Line | BezierCurve | QuadraticCurve | Circle | Ellipse |
            CustomPath | Typography | DrawableComposite | Rectangle | DrawnImage;