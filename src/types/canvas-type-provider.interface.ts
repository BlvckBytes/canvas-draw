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

export interface StylableOptions {
  style?: StyleConfig;
}

// ------------------------------------------------------------
// Drawable
// ------------------------------------------------------------

export interface CircleOptions extends StylableOptions {
  startAngle?: number;
  endAngle?: number;
}

export interface DrawnImageOptions extends StylableOptions {
  width?: number | null;
  height?: number | null;
  centerRotationOrigin?: boolean;
  applyScaling?: boolean;
}

export interface EllipseOptions extends StylableOptions {
  startAngle?: number;
  endAngle?: number;
}

export interface RectangleOptions extends StylableOptions {
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
}

export interface TypographyOptions extends StylableOptions {
  fontFamily?: string;
  fontSize?: number;
  alignment?: TextAlignment;
  baseline?: TextBaseline;
}

// ------------------------------------------------------------
// Custom
// ------------------------------------------------------------

export interface CoordinateSystemOptions {
  xStepSize?: number;
  yStepSize?: number;
  axisColor?: ColorSupplier | null;
  gridColor?: ColorSupplier | null;
}

export interface CircleSliceOptions extends StylableOptions {
  angleOffset?: number;
}

export interface GraphedCurveOptions {
  xStart?: number;
  xEnd?: number;
  stepSize?: number;
  curveStrokeWidth?: number;
}

export interface PolygonOptions extends StylableOptions {
  vertexCallback?: VertexCallback | null;
}

// ------------------------------------------------------------
// Miscellaneous
// ------------------------------------------------------------

export interface TexRendererOptions {
  color?: string | null;
  backgroundColor?: string | null;
  fontSize?: number | null;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
}

export interface TexDrawnImageOptions extends TexRendererOptions, DrawnImageOptions {}

export interface CanvasTypeProvider {

  // ------------------------------------------------------------
  // Drawable
  // ------------------------------------------------------------

  makeBezierCurve(
    start: Vector2,
    firstControlPoint: Vector2,
    secondControlPoint: Vector2,
    end: Vector2,
    options?: StylableOptions,
  ): BezierCurve;

  makeCircle(
    origin: Vector2,
    radius: number,
    options?: CircleOptions,
  ): Circle;

  makeCustomPath(
    members: CustomPathMember[],
    options?: StylableOptions,
  ): CustomPath;

  makeDrawnImage(
    origin: Vector2,
    source: string,
    options?: DrawnImageOptions,
  ): DrawnImage;

  makeEllipse(
    origin: Vector2,
    radiusX: number,
    radiusY: number,
    options?: EllipseOptions,
  ): Ellipse;

  makeLine(
    start: Vector2,
    end: Vector2,
    options?: StylableOptions,
  ): Line;

  makeQuadraticCurve(
    start: Vector2,
    controlPoint: Vector2,
    end: Vector2,
    options?: StylableOptions,
  ): QuadraticCurve;

  makeRectangle(
    origin: Vector2,
    width: number,
    height: number,
    options?: RectangleOptions,
  ): Rectangle;

  makeTypography(
    location: Vector2,
    text: string,
    options?: TypographyOptions,
  ): Typography;

  // ------------------------------------------------------------
  // Custom
  // ------------------------------------------------------------

  makeCoordinateSystem(
    width: number,
    height: number,
    origin: Vector2,
    options?: CoordinateSystemOptions,
  ): CoordinateSystem;

  makeCircleSlice(
    origin: Vector2,
    radius: number,
    angle: number,
    options?: CircleSliceOptions,
  ): CustomPath;

  makeGraphedCurve(
    origin: Vector2,
    curveColor: ColorSupplier,
    curve: (x: number) => number,
    options?: GraphedCurveOptions,
  ): GraphedCurve;

  makePolygon(
    numberOfEdges: number,
    radius: number,
    origin: Vector2,
    options?: PolygonOptions,
  ): Polygon;

  // ------------------------------------------------------------
  // Miscellaneous
  // ------------------------------------------------------------

  makeVector2(x: number, y: number): Vector2;

  makeCssColorSupplier(
    variableName: string,
    fallbackColor?: Color,
  ): ColorSupplier;

  makeTexDrawnImage(
    expression: string,
    origin: Vector2,
    options?: TexDrawnImageOptions,
  ): DrawnImage;
}