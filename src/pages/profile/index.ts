import { BackButton } from '../../components/backButton';
import { ProfileAvatar } from '../../components/profileAvatar';
import { ProfileContent } from '../../components/profileContent';
import { ProfileControl } from '../../components/profileControl';
import Block from '../../utils/Block';
import template from './profile.pug';

export const data = {
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'Иван',
  phone: '+79099673030',
};

export class Profile extends Block {
  constructor() {
    super('section');
    this.element?.classList.add('profile');
  }

  init() {
    this.children.back_button = new BackButton({
      href: '/',
    });
    this.children.profile_avatar = new ProfileAvatar({
      name: data.display_name,
    });
    this.children.profile_content = new ProfileContent({
      email: data.email,
      login: data.login,
      first_name: data.first_name,
      second_name: data.second_name,
      display_name: data.display_name,
      phone: data.phone,
    });
    this.children.profile_control = new ProfileControl();
  }

  render() {
    return this.compile(template, this.props);
  }
}
