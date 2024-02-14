export interface Vector2 {
  x: number;
  y: number;

  copy(): Vector2;
  multiply(factor: number): Vector2;
  divide(factor: number): Vector2;
  add(other: Vector2): Vector2;
  addValues(x: number, y: number): Vector2;
  subtract(other: Vector2): Vector2;
  subtractValues(x: number, y: number): Vector2;
  lengthSquared(): number;
  length(): number;
  normalizeAndReturnPreviousLength(): number;
}