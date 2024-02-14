import { CustomPath, CustomPathMember } from '../../types/drawable/custom-path.interface';
import { StyleConfig } from '../../types/style-config.interface';
import { StyleConfigImpl } from '../style-config-impl.class';

export class CustomPathImpl implements CustomPath {

  public style: StyleConfig;

  constructor(
    public members: CustomPathMember[],
    style?: StyleConfig,
  ) {
    this.style = style !== undefined ? style : new StyleConfigImpl();
  }

  configureStyle(receiver: (style: StyleConfig) => void): CustomPath {
    receiver(this.style);
    return this;
  }
}