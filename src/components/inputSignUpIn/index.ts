import Block from '../../utils/Block';
import template from './inputSignUpIn.pug';

interface InputSignUpInProps {
  id: string,
  name: string,
  type: string,
  value?: string,
  events: {
    blur: () => void;
    focus: () => void;
  }
}

class InputSignUpIn extends Block {
  constructor(props: InputSignUpInProps) {
    super('input', props);
    const {
      id, name, type, value,
    } = props;
    const elem = this.element as HTMLInputElement;
    if (elem) {
      elem.setAttribute('type', type);
      elem.setAttribute('name', name);
      elem.id = id;
      elem.value = value ?? '';
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default InputSignUpIn;
