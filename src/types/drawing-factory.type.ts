import { CanvasHandle } from './canvas-handle.interface';
import { CanvasTypeProvider } from './canvas-type-provider.interface';
import { Drawing } from './drawing.interface';

declare global {
  interface Window { LastLoadedDrawingFactory: DrawingFactory | null; }
}

export type DrawingFactory = (canvas: CanvasHandle, provider: CanvasTypeProvider) => Drawing;