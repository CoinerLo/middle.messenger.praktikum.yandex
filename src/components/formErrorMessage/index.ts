import Block from '../../utils/Block';
import template from './formErrorMessage.pug';

interface FormErrorMessageProps {
  inputId: string,
  message?: string,
}

class FormErrorMessage extends Block {
  constructor(props: FormErrorMessageProps) {
    super('span', props);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.element!.dataset.for = this.props.inputId;
    if (!props.message) this.hide();
  }

  render() {
    if (this.props.message) this.show();
    return this.compile(template, this.props);
  }
}

export default FormErrorMessage;
