export interface ButtonHandle {
  setActive(state: boolean): ButtonHandle;
  isActive(): boolean;
  setText(text: string): ButtonHandle;
}