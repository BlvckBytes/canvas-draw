export interface SliderHandle {
  setValue(value: number): SliderHandle;
  getValue(): number;
  setMinMax(min: number, max: number): SliderHandle;
  setStep(step: number): SliderHandle;
  setText(text: string): SliderHandle;
}