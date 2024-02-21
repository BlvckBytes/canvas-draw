import { Stylable } from '../stylable.interface';
import { Vector2 } from '../vector2.interface';

export interface DrawnImage extends Stylable<DrawnImage> {
  origin: Vector2;
  source: string;
  width: number | null;
  height: number | null;

  // Because the width and height aren't always exactly known when specifying
  // a drawing, this option will add width/2 and height/2 to the rotation origin
  // at the time of rendering the image, before applying it's rotation
  centerRotationOrigin: boolean;

  // On some occasions, the scaling factor that's used for coordinates should not
  // be applied on images. The main case for this are TeX SVGs, as they break at
  // such small font-sizes, just to be scaled back up later on.
  applyScaling: boolean;
}