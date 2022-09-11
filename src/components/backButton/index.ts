import Block from '../../utils/Block';
import template from './backButton.pug';

interface BackButtonProps {
  href: string,
}

export class BackButton extends Block<BackButtonProps> {
  constructor(props: BackButtonProps) {
    super('a', props);
    this.element?.setAttribute('href', props.href);
  }

  render() {
    return this.compile(template, this.props);
  }
}
