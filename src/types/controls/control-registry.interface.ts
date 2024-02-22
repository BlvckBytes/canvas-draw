import { ButtonHandle } from './button-handle.interface';
import { SliderHandle } from './slider-handle.interface';

export interface ControlRegistry {
  registerButton(
    onSetup: (button: ButtonHandle) => void,
    onClick: (button: ButtonHandle) => void
  ): ButtonHandle;

  registerSlider(
    onSetup: (button: SliderHandle) => void,
    onChange: (button: SliderHandle) => void,
  ): SliderHandle;
}