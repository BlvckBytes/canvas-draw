import { Vector2 } from '../types/vector2.interface';

export class Vector2Impl implements Vector2 {

  constructor(
    public x: number,
    public y: number
  ) {}

  copy(): Vector2 {
    return new Vector2Impl(this.x, this.y);
  }

  multiply(factor: number): Vector2 {
    this.x *= factor;
    this.y *= factor;
    return this;
  }

  divide(factor: number): Vector2 {
    this.x /= factor;
    this.y /= factor;
    return this;
  }

  add(other: Vector2): Vector2 {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  addValues(x: number, y: number): Vector2 {
    this.x += x;
    this.y += y;
    return this;
  }

  subtract(other: Vector2): Vector2 {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  subtractValues(x: number, y: number): Vector2 {
    this.x -= x;
    this.y -= y;
    return this;
  }

  lengthSquared(): number {
    return (
      this.x * this.x + 
      this.y * this.y 
    );
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  normalizeAndReturnPreviousLength(): number {
    const length = this.length();
    this.divide(length);
    return length;
  }

  static fromPoints(pointA: Vector2, pointB: Vector2): Vector2 {
    return new Vector2Impl(pointB.x - pointA.x, pointB.y - pointA.y);
  }

  static interpolate(pointA: Vector2, pointB: Vector2, ratio: number): Vector2 {
    const vectorAB = this.fromPoints(pointA, pointB);
    return pointA.copy().add(vectorAB.multiply(ratio));
  }

  static rotateAboutPointClockwise(vector: Vector2, point: Vector2, angle: number): Vector2 {
    const cos = Math.cos(2*Math.PI - angle);
    const sin = Math.sin(2*Math.PI - angle);

    return new Vector2Impl(
      (cos * (vector.x - point.x)) + (sin * (vector.y - point.y)) + point.x,
      (cos * (vector.y - point.y)) - (sin * (vector.x - point.x)) + point.y
    );
  }
}