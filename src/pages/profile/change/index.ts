import { Link } from '../../../components/link';
import { ProfileAvatar } from '../../../components/profileAvatar';
import { ProfileEdit } from '../../../components/profileEdit';
import Block from '../../../utils/Block';
import template from '../profile.pug';

export class ChangeProfile extends Block {
  constructor() {
    super('section');
    this.element?.classList.add('profile');
  }

  init() {
    this.children.back_button = new Link({
      className: 'backButton',
      url: '/settings',
    });
    this.children.profile_avatar = new ProfileAvatar({});
    this.children.profile_content = new ProfileEdit({});
  }

  render() {
    return this.compile(template, this.props);
  }
}
