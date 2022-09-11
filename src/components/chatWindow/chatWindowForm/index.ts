import Block from '../../../utils/Block';
import template from './chatWindowForm.pug';
import clip from '../../../../static/clip.png';
import send from '../../../../static/send.svg';
import { Input } from '../../input';
import { validator } from '../../../utils/validator';

interface ChatWindowFormProps {
  events: {
    submit: (e: SubmitEvent) => void;
  }
}

export class ChatWindowForm extends Block<ChatWindowFormProps> {
  constructor(props: ChatWindowFormProps) {
    super('form', props);
    this.element?.classList.add('chat_window_form');
  }

  isValid() {
    const input = this.children.input as Input;
    const { value } = input.element as HTMLInputElement;

    const validating = validator.message(value);
    if (validating) {
      // eslint-disable-next-line no-console
      console.log(validating);
      return false;
    }
    return value;
  }

  getData() {
    const validating = this.isValid();
    if (!validating) {
      // eslint-disable-next-line no-console
      console.log(validating);
      return false;
    }
    return validating;
  }

  init() {
    this.children.input = new Input({
      classInput: 'chat_window_form__input',
      id: 'message',
      name: 'message',
      type: 'text',
      placeholder: 'Сообщение',
      events: {
        blur: this.isValid.bind(this),
        focus: this.isValid.bind(this),
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, clip, send });
  }
}
