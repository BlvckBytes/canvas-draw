import { VertexCallback } from '../implementation/custom/polygon-impl.class';
import { ColorSupplier } from './color-supplier.interface';
import { Color } from './color.interface';
import { CoordinateSystem } from './custom/coordinate-system.interface';
import { GraphedCurve } from './custom/graphed-curve.interface';
import { Polygon } from './custom/polygon.interface';
import { BezierCurve } from './drawable/bezier-curve.interface';
import { Circle } from './drawable/circle.interface';
import { CustomPath, CustomPathMember } from './drawable/custom-path.interface';
import { DrawnImage } from './drawable/drawn-image.interface';
import { Ellipse } from './drawable/ellipse.interface';
import { Line } from './drawable/line.interface';
import { QuadraticCurve } from './drawable/quadratic-curve.interface';
import { Rectangle } from './drawable/rectangle.interface';
import { TextAlignment, TextBaseline, Typography } from './drawable/typography.interface';
import { StyleConfig } from './style-config.interface';
import { Vector2 } from './vector2.interface';

export interface CanvasTypeProvider {

  // ------------------------------------------------------------
  // Drawable
  // ------------------------------------------------------------

  makeBezierCurve(
    start: Vector2,
    firstControlPoint: Vector2,
    secondControlPoint: Vector2,
    end: Vector2,
    style?: StyleConfig,
  ): BezierCurve;

  makeCircle(
    origin: Vector2,
    radius: number,
    startAngle?: number,
    endAngle?: number,
    style?: StyleConfig,
  ): Circle;

  makeCustomPath(
    members: CustomPathMember[],
    style?: StyleConfig,
  ): CustomPath;

  makeDrawnImage(
    origin: Vector2,
    source: string,
    width?: number | null,
    height?: number | null,
    centerRotationOrigin?: boolean,
    style?: StyleConfig,
  ): DrawnImage;

  makeEllipse(
    origin: Vector2,
    radiusX: number,
    radiusY: number,
    startAngle?: number,
    endAngle?: number,
    style?: StyleConfig,
  ): Ellipse;

  makeLine(
    start: Vector2,
    end: Vector2,
    style?: StyleConfig,
  ): Line;

  makeQuadraticCurve(
    start: Vector2,
    controlPoint: Vector2,
    end: Vector2,
    style?: StyleConfig,
  ): QuadraticCurve;

  makeRectangle(
    origin: Vector2,
    width: number,
    height: number,
    topLeftRadius?: number,
    topRightRadius?: number,
    bottomLeftRadius?: number,
    bottomRightRadius?: number,
  ): Rectangle;

  makeTypography(
    location: Vector2,
    text: string,
    fontFamily?: string,
    fontSize?: number,
    alignment?: TextAlignment,
    baseline?: TextBaseline,
    style?: StyleConfig,
  ): Typography;

  // ------------------------------------------------------------
  // Custom
  // ------------------------------------------------------------

  makeCoordinateSystem(
    width: number,
    height: number,
    origin: Vector2,
    xStepSize?: number,
    yStepSize?: number,
    axisColor?: ColorSupplier | null,
    gridColor?: ColorSupplier | null,
  ): CoordinateSystem;

  makeCircleSlice(
    origin: Vector2,
    radius: number,
    angle: number,
    angleOffset?: number,
    style?: StyleConfig,
  ): CustomPath;

  makeGraphedCurve(
    origin: Vector2,
    curveColor: ColorSupplier,
    curve: (x: number) => number,
    xStart?: number,
    xEnd?: number,
    stepSize?: number,
  ): GraphedCurve;

  makePolygon(
    numberOfEdges: number,
    radius: number,
    origin: Vector2,
    vertexCallback?: VertexCallback | null,
    style?: StyleConfig,
  ): Polygon;

  // ------------------------------------------------------------
  // Miscellaneous
  // ------------------------------------------------------------

  makeVector2(x: number, y: number): Vector2;

  makeCssColorSupplier(
    variableName: string,
    fallbackColor?: Color,
  ): ColorSupplier;
}