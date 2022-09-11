import Block from '../../utils/Block';
import template from './header.pug';

export class Header extends Block {
  constructor() {
    super('header');
    this.element?.classList.add('header');
  }

  render() {
    return this.compile(template, this.props);
  }
}
