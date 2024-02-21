import { TexRendererOptions } from './canvas-type-provider.interface';

export interface TexRenderer {
  renderTexExpressionToImageDataUrl(
    expression: string,
    options?: TexRendererOptions,
  ): string;
}