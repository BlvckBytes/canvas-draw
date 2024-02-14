import { VertexCallback } from '../../implementation/custom/polygon-impl.class';
import { DrawableComposite } from '../drawable/drawable-composite.interface';
import { Stylable } from '../stylable.interface';
import { Vector2 } from '../vector2.interface';

export interface Polygon extends DrawableComposite, Stylable<Polygon> {
  numberOfEdges: number;
  radius: number;
  origin: Vector2;
  vertexCallback: VertexCallback | null;
}