import Block from '../../utils/Block';
import template from './input.pug';

interface InputProps {
  id: string,
  name: string,
  type: string,
  value?: string,
  placeholder?: string,
  classInput: string,
  events: {
    blur: () => void;
    focus: () => void;
  }
}

class Input extends Block {
  constructor(props: InputProps) {
    super('input', props);
    const {
      id, name, type, value, classInput,
    } = props;
    const elem = this.element as HTMLInputElement;
    if (elem) {
      elem.setAttribute('type', type);
      elem.setAttribute('name', name);
      if (props.placeholder) elem.setAttribute('placeholder', props.placeholder);
      elem.id = id;
      elem.classList.add(classInput);
      elem.value = value ?? '';
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
