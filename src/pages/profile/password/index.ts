import { BackButton } from '../../../components/backButton';
import { ProfileAvatar } from '../../../components/profileAvatar';
import { ProfilePassword } from '../../../components/profilePassword';
import Block from '../../../utils/Block';
import template from '../profile.pug';

export class PasswordProfile extends Block {
  constructor() {
    super('section');
    this.element?.classList.add('profile');
  }

  init() {
    this.children.back_button = new BackButton({
      href: '/profile',
    });
    this.children.profile_avatar = new ProfileAvatar({});

    this.children.profile_content = new ProfilePassword();
  }

  render() {
    return this.compile(template, this.props);
  }
}
