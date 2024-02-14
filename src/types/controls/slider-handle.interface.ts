export interface SliderHandle {
  setValue(value: number): SliderHandle;
  setMinMax(min: number, max: number): SliderHandle;
  setText(text: string): SliderHandle;
}