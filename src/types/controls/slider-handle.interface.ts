export interface SliderHandle {
  setValue(value: number): SliderHandle;
  getValue(): number;
  setMinMax(min: number, max: number): SliderHandle;
  setText(text: string): SliderHandle;
}