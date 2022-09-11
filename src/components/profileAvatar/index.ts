import Block from '../../utils/Block';
import template from './profileAvatar.pug';

interface ProfileAvatarProps {
  name?: string,
  events?: {
    click: () => void,
  }
}

export class ProfileAvatar extends Block<ProfileAvatarProps> {
  constructor(props: ProfileAvatarProps) {
    super('div', props);
    this.element?.classList.add('profile_avatar');
    this.setProps({
      events: {
        // eslint-disable-next-line no-console
        click: () => console.log('Открываем модальное окно загрузки фото'),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
