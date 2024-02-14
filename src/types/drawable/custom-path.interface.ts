import { Stylable } from '../stylable.interface';
import { BezierCurve } from './bezier-curve.interface';
import { Circle } from './circle.interface';
import { Ellipse } from './ellipse.interface';
import { Line } from './line.interface';
import { QuadraticCurve } from './quadratic-curve.interface';

export type CustomPathMember = Line | BezierCurve | QuadraticCurve | Circle | Ellipse;

export interface CustomPath extends Stylable<CustomPath> {
  members: CustomPathMember[];
}