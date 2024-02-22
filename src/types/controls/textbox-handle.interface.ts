export interface TextboxHandle {
  setText(text: string): TextboxHandle;
  setValue(value: string): TextboxHandle;
  getValue(): string;
  setPlaceholder(placeholder: string): TextboxHandle;
  getPlaceholder(): string;
  setInvalidityMessage(message: string | null): TextboxHandle;
  isValid(): boolean;
}