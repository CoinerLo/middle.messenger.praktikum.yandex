import Block from '../../utils/Block';
import template from './profileContent.pug';

interface ProfileContentProps {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
}

export class ProfileContent extends Block<ProfileContentProps> {
  constructor(props: ProfileContentProps) {
    super('div', props);
    this.element?.classList.add('profile_content');
  }

  render() {
    return this.compile(template, this.props);
  }
}
