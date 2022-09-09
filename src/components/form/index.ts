import Block from '../../utils/Block';
import FormErrorMessage from '../formErrorMessage';
import InputSignUpIn from '../inputSignUpIn';
import validator from '../../utils/validator';
import template from './form.pug';

export interface InputsMetaDataI {
  id: string,
  name: string,
  type: string
}

interface FormProps {
  title?: string,
  button?: string,
  inputsMetaData: InputsMetaDataI[],
  redirect?: string,
  redirectTitle?: string,
  labels?: Record<string, string | undefined>[],
  data?: Record<string, string>,
  events: {
    submit: (e: SubmitEvent) => void;
  }
}

class Form extends Block {
  constructor(props: FormProps) {
    super('form', props);
  }

  protected getErrorBlockByID(id: string) {
    return (this.children.errorsElem as Block[])
      .filter((el) => id === el.element?.dataset.for)[0];
  }

  protected getInputElementByID(id: string) {
    return (this.children.inputs as Block[])
      .filter((el) => id === el.element?.id)[0].element;
  }

  isValid(id: string) {
    const errorElem = this.getErrorBlockByID(id);
    const { value } = this.getInputElementByID(id) as HTMLInputElement;
    let validating;

    if (id === 'confirmPass') {
      const { value: pass } = this.getInputElementByID('password') as HTMLInputElement;
      validating = validator[id](value, pass);
    } else {
      validating = validator[id](value);
    }

    if (validating) {
      errorElem.setProps({ message: validating });
      return false;
    }

    errorElem.setProps({ message: '' });
    return value;
  }

  getData() {
    const isValidById: Record<string, boolean> = {};
    const fullData: Record<string, string> = {};

    (this.children.inputs as Block[]).forEach((i) => {
      const { value, id } = (i.element as HTMLInputElement);
      const validating = this.isValid(id);
      if (!validating) {
        isValidById[id] = false;
      } else {
        isValidById[id] = true;
        fullData[id] = value;
      }
    });
    const result = Object.values(isValidById);
    if (result.length > 0 && result.every((i) => i)) return fullData;
    return false;
  }

  init() {
    this.children.inputs = this.props.inputsMetaData
      .map((i: InputsMetaDataI) => new InputSignUpIn({
        ...i,
        value: this.props.data ? this.props.data[i.id] : undefined,
        events: {
          blur: () => this.isValid(i.id),
          focus: () => this.isValid(i.id),
        },
      }));
    this.children.errorsElem = this.props.inputsMetaData
      .map(({ id }: InputSignUpIn) => new FormErrorMessage({
        inputId: id,
      }));
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Form;
