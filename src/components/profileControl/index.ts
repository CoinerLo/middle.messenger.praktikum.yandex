import Block from '../../utils/Block';
import template from './profileControl.pug';

class ProfileControl extends Block {
  constructor() {
    super('div');
    this.element?.classList.add('profile_control');
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfileControl;
