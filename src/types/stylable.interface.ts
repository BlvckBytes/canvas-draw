import { StyleConfig } from './style-config.interface';

export interface Stylable<T> {
  style: StyleConfig;
  configureStyle(receiver: (style: StyleConfig) => void): T;
}