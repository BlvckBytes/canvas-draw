export interface ButtonHandle {
  setActive(state: boolean): ButtonHandle;
  setText(text: string): ButtonHandle;
}