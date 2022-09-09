import Block from '../../utils/Block';
import template from './errorMixin.pug';

interface ErrorMixinProps {
  error: string,
  descript: string
}

class ErrorMixin extends Block {
  constructor(props: ErrorMixinProps) {
    super('section', props);
    this.element?.classList.add('error');
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ErrorMixin;
