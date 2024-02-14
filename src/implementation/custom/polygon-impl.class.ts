import { Polygon } from '../../types/custom/polygon.interface';
import { CustomPathMember } from '../../types/drawable/custom-path.interface';
import { Drawable } from '../../types/drawable/drawable.type';
import { StyleConfig } from '../../types/style-config.interface';
import { Vector2 } from '../../types/vector2.interface';
import { CustomPathImpl } from '../drawable/custom-path-impl.class';
import { LineImpl } from '../drawable/line-impl.class';
import { StyleConfigImpl } from '../style-config-impl.class';
import { Vector2Impl } from '../vector2-impl.class';

export type VertexCallback = (index: number, position: Vector2, drawableList: Drawable[]) => void;

export class PolygonImpl implements Polygon {

  type: 'drawable-composite' = 'drawable-composite';

  public style: StyleConfig;
  public vertexCallback: VertexCallback | null;

  constructor(
    public numberOfEdges: number,
    public radius: number,
    public origin: Vector2,
    vertexCallback?: VertexCallback | null,
    style?: StyleConfig,
  ) {
    this.style = style !== undefined ? style : new StyleConfigImpl();
    this.vertexCallback = vertexCallback !== undefined ? vertexCallback : null;
  }

  configureStyle(receiver: (style: StyleConfig) => void): Polygon {
    receiver(this.style);
    return this;
  }

  compose(): Drawable[] {
    const drawables: Drawable[] = [];
    const polygonLines: CustomPathMember[] = [];

    let firstPosition: Vector2 | null = null;
    let lastPosition: Vector2 | null = null;

    for (let i = 0; i < this.numberOfEdges; i++) {
      const angle = 2 * Math.PI * i / this.numberOfEdges;
      const position = new Vector2Impl(
        this.origin.x + this.radius * Math.cos(angle),
        this.origin.y + this.radius * Math.sin(angle)
      );

      if (this.vertexCallback)
        this.vertexCallback(i, position, drawables);

      if (firstPosition === null || lastPosition === null) {
        firstPosition = position;
        lastPosition = position;
        continue;
      }

      let line = new LineImpl(lastPosition, position);
      polygonLines.push(line);

      // Cycle back around and close the shape
      if (i == this.numberOfEdges - 1) {
        let closeLine = new LineImpl(position, firstPosition);
        polygonLines.push(closeLine);
      }

      lastPosition = position;
    }

    const polygon = new CustomPathImpl(polygonLines);
    polygon.style = this.style;

    drawables.push(polygon);
    return drawables;
  }
}