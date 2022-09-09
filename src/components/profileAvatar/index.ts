import Block from '../../utils/Block';
import template from './profileAvatar.pug';

interface ProfileAvatarProps {
  name?: string,
}

class ProfileAvatar extends Block {
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

export default ProfileAvatar;
