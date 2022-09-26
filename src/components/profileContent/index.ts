import { withStore } from '../../store/WithStore';
import Block from '../../utils/Block';
import template from './profileContent.pug';

interface ProfileContentBaseProps {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string | null,
  phone: string,
}

export class ProfileContentBase extends Block<ProfileContentBaseProps> {
  constructor(props: ProfileContentBaseProps) {
    super('div', props);
    this.element?.classList.add('profile_content');
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => {
  const {
    email,
    login,
    first_name,
    second_name,
    display_name,
    phone,
  } = state.user;
  return {
    email, login, first_name, second_name, display_name, phone,
  };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProfileContent = withUser<Record<string, any>>(ProfileContentBase);
