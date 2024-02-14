import { ButtonHandle } from './button-handle.interface';
import { SliderHandle } from './slider-handle.interface';

export interface ControlRegistry {
  registerButton(name: string, onClick: () => void): ButtonHandle | null;
  registerSlider(name: string, onChange: (value: number) => void): SliderHandle | null;
}