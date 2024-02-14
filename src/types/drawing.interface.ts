import { CanvasEventHandler } from './canvas-event-handler.interface';
import { CanvasHandle } from './canvas-handle.interface';
import { Drawable } from './drawable/drawable.type';

export interface Drawing extends CanvasEventHandler {

  onFrameDraw(canvas: CanvasHandle): Drawable[];

  getTimeMsPerFrame(): number | null;

  // Get the maximum x,y bounds that are going to be reserved for in the canvas
  getMaxBounds(): [number, number];

}