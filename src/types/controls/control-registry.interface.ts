import { ButtonHandle } from './button-handle.interface';
import { SliderHandle } from './slider-handle.interface';

export interface ControlRegistry {
  registerButton(
    onSetup: (button: ButtonHandle) => void,
    onClick: (button: ButtonHandle) => void
  ): ButtonHandle;

  registerSlider(
    onChange: (button: SliderHandle) => void,
    onSetup: (button: SliderHandle) => void,
  ): SliderHandle;
}