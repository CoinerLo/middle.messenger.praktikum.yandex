import Block from '../../utils/Block';
import template from './header.pug';

class Header extends Block {
  constructor() {
    super('header');
    this.element?.classList.add('header');
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Header;
