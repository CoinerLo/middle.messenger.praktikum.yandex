import Block from '../../utils/Block';
import template from './input.pug';

interface InputProps {
  id: string,
  name: string,
  type: string,
  value?: string,
  placeholder?: string,
  classInput?: string,
  events: {
    blur: () => void;
    focus: () => void;
  }
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
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
      if (props.placeholder) {
        elem.setAttribute('placeholder', props.placeholder);
      }
      if (props?.classInput) {
        elem.classList.add(props.classInput);
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
