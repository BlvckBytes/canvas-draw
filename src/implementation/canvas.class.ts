import { ButtonHandle } from '../types/controls/button-handle.interface';
import { CanvasHandle } from '../types/canvas-handle.interface';
import { SliderHandle } from '../types/controls/slider-handle.interface';
import { CanvasTypeProvider } from '../types/canvas-type-provider.interface';
import { CircleImpl } from './drawable/circle-impl.class';
import { Vector2Impl } from './vector2-impl.class';
import { Vector2 } from '../types/vector2.interface';
import { Drawing } from '../types/drawing.interface';
import { StyleConfig } from '../types/style-config.interface';
import { QuadraticCurve } from '../types/drawable/quadratic-curve.interface';
import { BezierCurve } from '../types/drawable/bezier-curve.interface';
import { Line } from '../types/drawable/line.interface';
import { Rectangle } from '../types/drawable/rectangle.interface';
import { Ellipse } from '../types/drawable/ellipse.interface';
import { Circle } from '../types/drawable/circle.interface';
import { DrawnImage } from '../types/drawable/drawn-image.interface';
import { CustomPath } from '../types/drawable/custom-path.interface';
import { Typography } from '../types/drawable/typography.interface';
import { LineImpl } from './drawable/line-impl.class';
import { BezierCurveImpl } from './drawable/bezier-curve-impl.class';
import { QuadraticCurveImpl } from './drawable/quadratic-curve-impl.class';
import { EllipseImpl } from './drawable/ellipse-impl.class';
import { DrawableComposite } from '../types/drawable/drawable-composite.interface';
import { Drawable } from '../types/drawable/drawable.type';
import { CustomPathImpl } from './drawable/custom-path-impl.class';
import { TypographyImpl } from './drawable/typography-impl.class';
import { RectangleImpl } from './drawable/rectangle-impl.class';
import { DrawnImageImpl } from './drawable/drawn-image-impl.class';
import { ColorSupplier } from '../types/color-supplier.interface';
import { CoordinateSystemImpl } from './custom/coordinate-system-impl.class';
import { CircleSliceImpl } from './custom/circle-slice-impl.class';
import { DrawingFactory } from '../types/drawing-factory.type';
import { COLOR_BLACK } from './style-config-impl.class';
import { GraphedCurveImpl } from './custom/graphed-curve-impl';
import { PolygonImpl } from './custom/polygon-impl.class';

const provider: CanvasTypeProvider = {
  makeBezierCurve(start, firstControlPoint, secondControlPoint, end, style) {
    return new BezierCurveImpl(start, firstControlPoint, secondControlPoint, end, style);
  },
  makeCircle(origin, radius, startAngle, endAngle, style) {
    return new CircleImpl(origin, radius, startAngle, endAngle, style);
  },
  makeCustomPath(members, style) {
    return new CustomPathImpl(members, style);
  },
  makeDrawnImage(origin, source, width, height, centerRotationOrigin, style) {
    return new DrawnImageImpl(origin, source, width, height, centerRotationOrigin, style);
  },
  makeEllipse(origin, radiusX, radiusY, startAngle, endAngle, style) {
    return new EllipseImpl(origin, radiusX, radiusY, startAngle, endAngle, style);
  },
  makeLine(start, end, style) {
    return new LineImpl(start, end, style);
  },
  makeQuadraticCurve(start, controlPoint, end, style) {
    return new QuadraticCurveImpl(start, controlPoint, end, style);
  },
  makeTypography(location, text, fontFamily, fontSize, alignment, baseline, style) {
    return new TypographyImpl(location, text, fontFamily, fontSize, alignment, baseline, style);
  },
  makeGraphedCurve(origin, curveColor, curve, xStart, xEnd, stepSize) {
    return new GraphedCurveImpl(origin, curveColor, curve, xStart, xEnd, stepSize);
  },
  makePolygon(numberOfEdges, radius, origin, vertexCallback, style) {
    return new PolygonImpl(numberOfEdges, radius, origin, vertexCallback, style);
  },
  makeVector2(x, y) {
    return new Vector2Impl(x, y);
  },
  makeCoordinateSystem(width, height, origin, xStepSize, yStepSize, axisColor, gridColor) {
    return new CoordinateSystemImpl(width, height, origin, xStepSize, yStepSize, axisColor, gridColor);
  },
  makeRectangle(origin, width, height, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius) {
    return new RectangleImpl(origin, width, height, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius);
  },
  makeCircleSlice(origin, radius, angle, angleOffset, style) {
    return CircleSliceImpl.make(origin, radius, angle, angleOffset, style);
  },
  makeCssColorSupplier(variableName, fallbackColor) {
    return {
      get() {
        const colorValue = getComputedStyle(document.body).getPropertyValue(variableName);

        if (colorValue == "") {
          console.error(`Missing color variable: ${variableName}`);
          return fallbackColor || COLOR_BLACK;
        }

        if (colorValue.startsWith('#')) {
          if (colorValue.length != 7) {
            console.error(`Invalid color variable hex color value: ${variableName}=${colorValue}`);
            return fallbackColor || COLOR_BLACK;
          }
      
          const red = parseInt(colorValue.substring(1, 1+2), 16);
          const green = parseInt(colorValue.substring(1+2, 1+2+2), 16);
          const blue = parseInt(colorValue.substring(1+2+2, 1+2+2+2), 16);
      
          if (Number.isNaN(red) || Number.isNaN(green) || Number.isNaN(blue)) {
            console.error(`Invalid color variable hex color value: ${variableName}=${colorValue}`);
            return fallbackColor || COLOR_BLACK;
          }
      
          return { r: red, g: green, b: blue, a: 1 };
        } else if (
          colorValue.startsWith('rgb') ||
          colorValue.startsWith('rgba')
        ) {
          const beginIndex = colorValue.indexOf('(');
          const endIndex = colorValue.indexOf(')');

          if (beginIndex < 0 || endIndex < 0) {
            console.error(`Invalid color variable rgb/rgba color value: ${variableName}=${colorValue}`);
            return fallbackColor || COLOR_BLACK;
          }

          const colorData = colorValue.substring(beginIndex + 1, endIndex).split(',');

          if (colorData.length < 3) {
            console.error(`Invalid color variable rgb/rgba color value: ${variableName}=${colorValue}`);
            return fallbackColor || COLOR_BLACK;
          }

          const red = parseInt(colorData[0].trim());
          const green = parseInt(colorData[1].trim());
          const blue = parseInt(colorData[2].trim());
          const alpha = colorData.length == 4 ? parseFloat(colorData[3].trim()) : 1;

          if (Number.isNaN(red) || Number.isNaN(green) || Number.isNaN(blue) || Number.isNaN(alpha)) {
            console.error(`Invalid color variable hex color value: ${variableName}=${colorValue}`);
            return fallbackColor || COLOR_BLACK;
          }

          return { r: red, g: green, b: blue, a: alpha };
        } else {
          console.error(`Invalid/Unsupported color variable value: ${variableName}=${colorValue}`);
          return fallbackColor || COLOR_BLACK;
        }
      }
    } as ColorSupplier
  },
};

// TODO: This file could really use some section comments

export class Canvas implements CanvasHandle {

  private static DEFAULT_MAX_ZOOM_LEVEL = 3;
  private static DEFAULT_MIN_ZOOM_LEVEL = .6;

  private currentlyDrawnFrameId: number | null = null;
  private activeFrameTimer: ReturnType<typeof setTimeout> | null = null;

  private lastPathLastEndVector: Vector2 | null = null;

  private isMouseInCanvas = false;
  private lastAbsoluteMousePosition = new Vector2Impl(0, 0);

  private loadedImageCache: { [key: string]: HTMLImageElement } = {};

  private drawing: Drawing;

  private canvasElement: HTMLCanvasElement;
  private renderingContext: CanvasRenderingContext2D;

  // By how much to scale coordinates, determines the real size of one unit
  private scalingFactor: number;

  // By how much the canvas should be overscaled in comparison to the DOM
  // node, so that - in effect - the node's sharpness increases
  private sharpness: number;

  private zoomLevel = 1;
  private minZoomLevel = Canvas.DEFAULT_MIN_ZOOM_LEVEL;
  private maxZoomLevel = Canvas.DEFAULT_MAX_ZOOM_LEVEL;

  private existingButtons: { [key: string]: ButtonHandle } = {};
  private existingSliders: { [key: string]: SliderHandle } = {};

  constructor(
    drawingFactory: DrawingFactory,
    canvasElement: HTMLCanvasElement,
    scalingFactor: number,
    sharpness: number,
  ) {
    this.drawing = drawingFactory(provider);

    this.canvasElement = canvasElement;
    this.renderingContext = this.canvasElement.getContext('2d')!;

    this.scalingFactor = scalingFactor;
    this.sharpness = sharpness;

    this.registerEvents();
    this.drawing.onCanvasSetup(this);
  }

  getCurrentFrameIndex(): number {
    return this.currentlyDrawnFrameId || -1;
  }

  setZoomLevel(amount: number): number {
    if (amount > this.maxZoomLevel)
      this.zoomLevel = this.maxZoomLevel;
    else if (amount < this.minZoomLevel)
      this.zoomLevel = this.minZoomLevel;
    else
      this.zoomLevel = amount;

    return this.zoomLevel;
  }

  getZoomLevel(): number {
    return this.zoomLevel;
  }

  setZoomConstraints(minimum: number, maximum: number): void {
    this.minZoomLevel = minimum;
    this.maxZoomLevel = maximum;
    this.setZoomLevel(this.getZoomLevel());
  }

  getLastMousePosition(): Vector2 {
    return this.lastAbsoluteMousePosition
      .copy()
      .divide(this.scalingFactor)
      .divide(this.zoomLevel)
  }

  draw(increaseFrameId: boolean): void {
    this.nextFrame(increaseFrameId);
  }

  start(): boolean {
    if (this.activeFrameTimer != null)
      return false;

    const timePerFrame = this.drawing.getTimeMsPerFrame();

    if (timePerFrame == null) {
      this.nextFrame();
      return true;
    }

    this.activeFrameTimer = setInterval(() => this.nextFrame(), timePerFrame);
    return true;
  }

  stop(): boolean {
    if (this.activeFrameTimer == null)
      return false;

    clearTimeout(this.activeFrameTimer);
    return true;
  }

  nextFrame(increaseFrameId = true) {
    if (this.currentlyDrawnFrameId === null) {
      this.currentlyDrawnFrameId = 0;
      this.drawCurrentFrame();
      return;
    }

    if (increaseFrameId)
      this.currentlyDrawnFrameId++;

    this.drawCurrentFrame();
  }

  previousFrame(): boolean {
    if (this.currentlyDrawnFrameId === null || this.currentlyDrawnFrameId === 0)
      return false;

    this.currentlyDrawnFrameId--;
    this.drawCurrentFrame();
    return true;
  }

  reset() {
    this.currentlyDrawnFrameId = null;
    this.clearCanvas();
  }

  private clearCanvas() {
    this.renderingContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  private applyAndExecuteStyleConfig(
    config: StyleConfig,
    strokeMethod: () => void = () => this.renderingContext.stroke(),
    fillMethod: () => void = () => this.renderingContext.fill()
  ) {
    this.renderingContext.setLineDash(config.lineDash.map(element => this.scaleForCanvas(element)));
    this.renderingContext.lineWidth = this.scaleForCanvas(config.strokeWidth);
    this.renderingContext.lineCap = config.lineCap;
    this.renderingContext.lineJoin = config.lineJoin;

    if (config.strokeColor && config.strokeWidth > 0) {
      this.renderingContext.strokeStyle = this.makeColorString(config.strokeColor);
      strokeMethod();
    }

    if (config.fillColor) {
      this.renderingContext.fillStyle = this.makeColorString(config.fillColor);
      fillMethod();
    }
  }

  public makeColorString(supplier: ColorSupplier): string {
    const color = supplier.get();
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  }

  private updateLastMoveAndCheckIfHasToMove(start: Vector2, end: Vector2, resetPath: boolean): boolean {
    if (resetPath)
      this.lastPathLastEndVector = null;

    // Don't call moveTo if the last lineTo vector "equals" (within float precision) the
    // current element's moveTo vector, so that the path isn't reset, but rather continued and
    // can be filled in later on. This also takes care of off-looking edge connections.
    let doNotMoveAgain = false;
    if (this.lastPathLastEndVector) {
      const startDelta = this.lastPathLastEndVector.copy().subtract(start);
      const lengthSquared = startDelta.lengthSquared();
      doNotMoveAgain = lengthSquared < 0.1;
    }

    this.lastPathLastEndVector = end;
    return !doNotMoveAgain;
  }

  private scaleForCanvas(coordinate: number, applyZoomLevel = true) {
    return coordinate * this.scalingFactor * this.sharpness * (applyZoomLevel ? this.zoomLevel : 1);
  }

  private unscaleFromCanvas(coordinate: number) {
    return coordinate / this.scalingFactor / this.sharpness;
  }

  private executeQuadraticCurvePath(quadraticCurve: QuadraticCurve, resetPath: boolean = true) {
    if (this.updateLastMoveAndCheckIfHasToMove(quadraticCurve.start, quadraticCurve.end, resetPath)) {
      this.renderingContext.moveTo(
        this.scaleForCanvas(quadraticCurve.start.x),
        this.scaleForCanvas(quadraticCurve.start.y)
      );
    }

    this.renderingContext.quadraticCurveTo(
      this.scaleForCanvas(quadraticCurve.controlPoint.x),
      this.scaleForCanvas(quadraticCurve.controlPoint.y),
      this.scaleForCanvas(quadraticCurve.end.x),
      this.scaleForCanvas(quadraticCurve.end.y)
    );
  }

  private executeBezierCurvePath(bezierCurve: BezierCurve, resetPath: boolean = true) {
    if (this.updateLastMoveAndCheckIfHasToMove(bezierCurve.start, bezierCurve.end, resetPath)) {
      this.renderingContext.moveTo(
        this.scaleForCanvas(bezierCurve.start.x),
        this.scaleForCanvas(bezierCurve.start.y)
      );
    }

    this.renderingContext.bezierCurveTo(
      this.scaleForCanvas(bezierCurve.firstControlPoint.x),
      this.scaleForCanvas(bezierCurve.firstControlPoint.y),
      this.scaleForCanvas(bezierCurve.secondControlPoint.x),
      this.scaleForCanvas(bezierCurve.secondControlPoint.y),
      this.scaleForCanvas(bezierCurve.end.x),
      this.scaleForCanvas(bezierCurve.end.y)
    );
  }

  private executeLinePath(line: Line, resetPath: boolean = true) {
    if (this.updateLastMoveAndCheckIfHasToMove(line.start, line.end, resetPath)) {
      this.renderingContext.moveTo(
        this.scaleForCanvas(line.start.x),
        this.scaleForCanvas(line.start.y)
      );
    }

    this.renderingContext.lineTo(
      this.scaleForCanvas(line.end.x),
      this.scaleForCanvas(line.end.y)
    );
  }

  private drawQuadraticCurve(quadraticCurve: QuadraticCurve) {
    this.executeWhileApplyingRotation(quadraticCurve.style, () => {
      this.renderingContext.beginPath();
      this.executeQuadraticCurvePath(quadraticCurve);
      this.applyAndExecuteStyleConfig(quadraticCurve.style);
    });
  }

  private drawBezierCurve(bezierCurve: BezierCurve) {
    this.executeWhileApplyingRotation(bezierCurve.style, () => {
      this.renderingContext.beginPath();
      this.executeBezierCurvePath(bezierCurve);
      this.applyAndExecuteStyleConfig(bezierCurve.style);
    });
  }

  private drawLine(line: Line) {
    this.executeWhileApplyingRotation(line.style, () => {
      this.renderingContext.beginPath();
      this.executeLinePath(line);
      this.applyAndExecuteStyleConfig(line.style);
    });
  }

  private executeRectanglePath(rectangle: Rectangle) {
    this.renderingContext.roundRect(
      this.scaleForCanvas(rectangle.origin.x),
      this.scaleForCanvas(rectangle.origin.y),
      this.scaleForCanvas(rectangle.width),
      this.scaleForCanvas(rectangle.height),
      [
        this.scaleForCanvas(rectangle.topLeftRadius),
        this.scaleForCanvas(rectangle.topRightRadius),
        this.scaleForCanvas(rectangle.bottomLeftRadius),
        this.scaleForCanvas(rectangle.bottomRightRadius)
      ]
    );
  }

  private executeEllipsePath(ellipse: Ellipse) {
    this.renderingContext.ellipse(
      this.scaleForCanvas(ellipse.origin.x),
      this.scaleForCanvas(ellipse.origin.y),
      this.scaleForCanvas(ellipse.radiusX),
      this.scaleForCanvas(ellipse.radiusY),
      0, // Rotation should be accomplished uniformly by rotating the context
      ellipse.startAngle,
      ellipse.endAngle
    );
  }

  private executeCirclePath(circle: Circle) {
    this.renderingContext.arc(
      this.scaleForCanvas(circle.origin.x),
      this.scaleForCanvas(circle.origin.y),
      this.scaleForCanvas(circle.radius),
      circle.startAngle,
      circle.endAngle
    );
  }

  private drawEllipse(ellipse: Ellipse) {
    this.executeWhileApplyingRotation(ellipse.style, () => {
      this.renderingContext.beginPath();
      this.executeEllipsePath(ellipse);
      this.applyAndExecuteStyleConfig(ellipse.style);
    });
  }

  private executeWhileApplyingRotation(config: StyleConfig, codeSequence: () => void) {
    if (config.rotation === 0) {
      codeSequence();
      return;
    }

    this.renderingContext.save();

    if (config.rotationOrigin)
      this.renderingContext.translate(this.scaleForCanvas(config.rotationOrigin.x), this.scaleForCanvas(config.rotationOrigin.y));

    this.renderingContext.rotate(config.rotation);

    if (config.rotationOrigin)
      this.renderingContext.translate(-this.scaleForCanvas(config.rotationOrigin.x), -this.scaleForCanvas(config.rotationOrigin.y));

    codeSequence();

    this.renderingContext.restore();
  }

  private drawDrawnImage(image: DrawnImage) {
    const drawImage = (htmlImage: HTMLImageElement) => {
      let finalWidth: number, finalHeight: number;
      const imageAspectRatio = htmlImage.width / htmlImage.height;

      if (image.width !== null && image.height === null) {
        const scaledWidth = this.scaleForCanvas(image.width);
        finalWidth = scaledWidth;
        finalHeight = finalWidth / imageAspectRatio;
      }

      else if (image.width === null && image.height !== null) {
        const scaledHeight = this.scaleForCanvas(image.height);
        finalHeight = scaledHeight;
        finalWidth = finalHeight * imageAspectRatio;
      }

      else if (image.width !== null && image.height !== null) {
        finalWidth = this.scaleForCanvas(image.width);
        finalHeight = this.scaleForCanvas(image.height);
      }

      else {
        finalWidth = htmlImage.width;
        finalHeight = htmlImage.height;
      }

      if (image.centerRotationOrigin && image.style.rotationOrigin) {
        image.style.rotationOrigin = image.style.rotationOrigin.copy().addValues(
          this.unscaleFromCanvas(finalWidth / 2),
          this.unscaleFromCanvas(finalHeight / 2)
        );
      }

      this.executeWhileApplyingRotation(image.style, () => {
        this.renderingContext.drawImage(
          htmlImage,
          0, 0, htmlImage.width, htmlImage.height,
          this.scaleForCanvas(image.origin.x), this.scaleForCanvas(image.origin.y),
          finalWidth, finalHeight
        );
      });
    };

    if (image.source in this.loadedImageCache) {
      drawImage(this.loadedImageCache[image.source]);
      return;
    }

    var img = new Image();

    img.onload = () => {
      this.loadedImageCache[image.source] = img;
      drawImage(img);
    }

    img.src = image.source;
  }

  private drawRectangle(rectangle: Rectangle) {
    this.executeWhileApplyingRotation(rectangle.style, () => {
      this.renderingContext.beginPath();
      this.executeRectanglePath(rectangle);
      this.applyAndExecuteStyleConfig(rectangle.style);
    });
  }

  private drawCircle(circle: Circle) {
    this.executeWhileApplyingRotation(circle.style, () => {
      this.renderingContext.beginPath();
      this.executeCirclePath(circle);
      this.applyAndExecuteStyleConfig(circle.style);
    });
  }

  private drawTypography(typography: Typography) {
    this.executeWhileApplyingRotation(typography.style, () => {
      this.renderingContext.font = `${this.scaleForCanvas(typography.fontSize)}px ${typography.fontFamily}`;
      this.renderingContext.textAlign = typography.alignment;
      this.renderingContext.textBaseline = typography.baseline;

      this.applyAndExecuteStyleConfig(
        typography.style,
        () => {
          this.renderingContext.strokeText(
            typography.text,
            this.scaleForCanvas(typography.location.x),
            this.scaleForCanvas(typography.location.y)
          );
        },
        () => {
          this.renderingContext.fillText(
            typography.text,
            this.scaleForCanvas(typography.location.x),
            this.scaleForCanvas(typography.location.y)
          );
        }
      );
    });
  }

  private drawCustomPath(path: CustomPath) {
    this.executeWhileApplyingRotation(path.style, () => {
      this.renderingContext.beginPath();

      for (let i = 0; i < path.members.length; i++) {
        const member = path.members[i];
        const isFirstMember = i == 0;

        if (member instanceof LineImpl) {
          this.executeLinePath(member, isFirstMember);
          continue;
        }

        if (member instanceof BezierCurveImpl) {
          this.executeBezierCurvePath(member, isFirstMember);
          continue;
        }

        if (member instanceof QuadraticCurveImpl) {
          this.executeQuadraticCurvePath(member, isFirstMember);
          continue;
        }

        if (member instanceof CircleImpl) {
          this.executeCirclePath(member);
          continue;
        }

        if (member instanceof EllipseImpl) {
          this.executeEllipsePath(member);
          continue;
        }
      }

      this.applyAndExecuteStyleConfig(path.style);
    });
  }

  private drawComposite(composite: DrawableComposite) {
    for (const drawable of composite.compose())
      this.drawDrawable(drawable);
  }

  private drawDrawable(drawable: Drawable) {
    if (drawable instanceof LineImpl) {
      this.drawLine(drawable);
      return;
    }

    if (drawable instanceof BezierCurveImpl) {
      this.drawBezierCurve(drawable);
      return;
    }

    if (drawable instanceof QuadraticCurveImpl) {
      this.drawQuadraticCurve(drawable);
      return;
    }

    if (drawable instanceof CircleImpl) {
      this.drawCircle(drawable);
      return;
    }

    if (drawable instanceof CustomPathImpl) {
      this.drawCustomPath(drawable);
      return;
    }

    if (drawable instanceof TypographyImpl) {
      this.drawTypography(drawable);
      return;
    }

    if (drawable instanceof EllipseImpl) {
      this.drawEllipse(drawable);
      return;
    }

    if (drawable instanceof RectangleImpl) {
      this.drawRectangle(drawable);
      return;
    }

    if (drawable instanceof DrawnImageImpl) {
      this.drawDrawnImage(drawable);
      return;
    }

    if ("type" in drawable && drawable.type === 'drawable-composite') {
      this.drawComposite(drawable);
      return;
    }
  }

  private drawCurrentFrame() {
    // const drawingStart = Date.now();

    // Scale the canvas element as well as it's DOM node before drawing
    const maxBounds = this.drawing.getMaxBounds();
    this.canvasElement.width = this.scaleForCanvas(maxBounds[0], false);
    this.canvasElement.height = this.scaleForCanvas(maxBounds[1], false);
    this.canvasElement.style.width = (this.canvasElement.width / this.sharpness) + 'px';
    this.canvasElement.style.height = (this.canvasElement.height / this.sharpness) + 'px';

    this.clearCanvas();

    if (this.currentlyDrawnFrameId === null) {
      console.error('Cannot draw a frame with id null.');
      return;
    }

    const drawables = this.drawing.onFrameDraw(this);

    for (const drawable of drawables)
      this.drawDrawable(drawable);

    // console.log(`Frame ${this.currentlyDrawnFrameId} took ${Date.now() - drawingStart}ms`);
  }

  private registerEvents() {

    const updateAndReturnIsMouseInCanvas = (event: MouseEvent) => {
      this.isMouseInCanvas = event.target === this.canvasElement;

      if (this.isMouseInCanvas) {
        this.lastAbsoluteMousePosition.x = event.offsetX;
        this.lastAbsoluteMousePosition.y = event.offsetY;
      }

      return this.isMouseInCanvas;
    };

    window.addEventListener('keydown', event => {
      if (!this.isMouseInCanvas)
        return;

      this.drawing.onCanvasKeyDown(this, event);
    });

    window.addEventListener('keyup', event => {
      if (!this.isMouseInCanvas)
        return;

      this.drawing.onCanvasKeyUp(this, event);
    });

    this.canvasElement.addEventListener('wheel', event => {
      if (!updateAndReturnIsMouseInCanvas(event))
        return;

      // Scrolling and zooming on the canvas should not affect the page
      event.preventDefault();
      event.stopImmediatePropagation();

      if (event.ctrlKey) {
        // Zoom, seems like deltaY is used to represent magnitude and direction
        this.drawing.onCanvasZoom(this, event.deltaY);
      } else {
        // Scroll
        this.drawing.onCanvasScroll(this, event.deltaX, event.deltaY);
      }
    });

    window.addEventListener('mousedown', event => {
      if (!updateAndReturnIsMouseInCanvas(event))
        return;

      this.drawing.onCanvasMouseDown(this);
    });

    window.addEventListener('mouseup', event => {
      if (!updateAndReturnIsMouseInCanvas(event))
        return;

      this.drawing.onCanvasMouseUp(this);
    });

    window.addEventListener('mousemove', event => {
      if (!updateAndReturnIsMouseInCanvas(event))
        return;

      this.drawing.onCanvasMouseMove(this);
    });

    this.canvasElement.addEventListener('unload', () => {
      this.stop();
    });
  }

  registerButton(name: string, onClick: () => void): ButtonHandle | null {
    const namePattern = /[a-zA-Z]+[_a-zA-Z0-9-]*/

    if (!namePattern.test(name)) {
      console.error(`The name ${name} is invalid!`);
      return null;
    }

    const lowerName = name.toLowerCase()

    if (this.existingButtons[lowerName]) {
      console.error(`A button by the name ${name} already exists!`);
      return null;
    }

    const baseClass = "canvas-button"
    const activeClass = "canvas-button--active"

    const buttonContainer = this.singleRootHtml(`<div class="${baseClass} ${baseClass}--${name}"></div>`)
    const textElement = this.singleRootHtml(`<p class="canvas-button__text"></p>`)

    buttonContainer.appendChild(textElement);

    buttonContainer.addEventListener('click', onClick);

    // TODO: Append this properly
    this.canvasElement.parentElement?.appendChild(buttonContainer);

    const handle = new class implements ButtonHandle {
      setActive(state: boolean): ButtonHandle {
        const hasActiveClass = buttonContainer.classList.contains(activeClass)

        if (state) {
          if (hasActiveClass)
            return this;

          buttonContainer.classList.add(activeClass);
          return this;
        }

        if (!hasActiveClass)
          return this;

        buttonContainer.classList.remove(activeClass);
        return this
      }

      setText(text: string): ButtonHandle {
        textElement.innerHTML = text;
        return this
      }
    }

    this.existingButtons[lowerName] = handle;
    return handle
  }

  registerSlider(name: string, onChange: (value: number) => void): SliderHandle | null {
    const namePattern = /[a-zA-Z]+[_a-zA-Z0-9-]*/

    if (!namePattern.test(name)) {
      console.error(`The name ${name} is invalid!`);
      return null;
    }

    const lowerName = name.toLowerCase()

    if (this.existingSliders[lowerName]) {
      console.error(`A slider by the name ${name} already exists!`);
      return null;
    }

    const baseClass = "canvas-slider"

    const sliderContainer = this.singleRootHtml(`<div class="${baseClass} ${baseClass}--${name}"></div>`)
    const sliderWrapper = this.singleRootHtml(`<div class="${baseClass}__wrapper"></div>`)
    const sliderElement = this.singleRootHtml(`<input type="range" min=1 max=1/>`) as HTMLInputElement
    const textElement = this.singleRootHtml(`<p class="canvas-slider__text"></p>`)
    const minTextElement = this.singleRootHtml(`<p class="canvas-slider__min-text"></p>`)
    const maxTextElement = this.singleRootHtml(`<p class="canvas-slider__max-text"></p>`)

    sliderWrapper.appendChild(minTextElement);
    sliderWrapper.appendChild(sliderElement);
    sliderWrapper.appendChild(maxTextElement);
    sliderContainer.appendChild(sliderWrapper);
    sliderContainer.appendChild(textElement);

    // TODO: Append this properly
    this.canvasElement.parentElement?.appendChild(sliderContainer);

    sliderElement.addEventListener('input', () => {
      onChange(parseInt(sliderElement.value));
    });

    const handle = new class implements SliderHandle {
      setText(text: string): SliderHandle {
        textElement.innerHTML = text;
        return this
      }

      setValue(value: number): SliderHandle {
        sliderElement.value = `${value}`;
        return this;
      }

      setMinMax(min: number, max: number): SliderHandle {
        const previousValue = sliderElement.value

        minTextElement.innerHTML = `${min}`;
        maxTextElement.innerHTML = `${max}`;

        sliderElement.min = `${min}`;
        sliderElement.max = `${max}`;
        this.setValue(min);

        const currentValue = sliderElement.value

        // Slider range change caused value change, as value was out of new range
        if (previousValue != currentValue)
          onChange(parseInt(currentValue));

        return this;
      }
    }

    this.existingSliders[lowerName] = handle;
    return handle
  }

  private singleRootHtml(html: string): Element {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.children[0];
  }
}