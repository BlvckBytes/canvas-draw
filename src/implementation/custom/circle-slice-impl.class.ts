import { CustomPath, CustomPathMember } from '../../types/drawable/custom-path.interface';
import { StyleConfig } from '../../types/style-config.interface';
import { Vector2 } from '../../types/vector2.interface';
import { CircleImpl } from '../drawable/circle-impl.class';
import { CustomPathImpl } from '../drawable/custom-path-impl.class';
import { LineImpl } from '../drawable/line-impl.class';
import { StyleConfigImpl } from '../style-config-impl.class';

export class CircleSliceImpl {

  private constructor() {}

  static make(
    origin: Vector2,
    radius: number,
    angle: number,
    angleOffset?: number,
    style?: StyleConfig,
  ): CustomPath {
    const members: CustomPathMember[] = [];
    const path = new CustomPathImpl(members, style);
    const angleOffsetValue = angleOffset !== undefined ? angleOffset : 0;

    members.push(new LineImpl(origin, origin.copy().addValues(radius * Math.cos(angleOffsetValue), radius * Math.sin(angleOffsetValue)), style));
    members.push(new CircleImpl(origin, radius, angleOffsetValue, angleOffsetValue + angle, style));
    members.push(new LineImpl(origin.copy().addValues(radius * Math.cos(angleOffsetValue + angle), radius * Math.sin(angleOffsetValue + angle)), origin, style));

    return path;
  }
}