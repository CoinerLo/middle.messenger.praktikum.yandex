import Block from '../../utils/Block';
import template from './form.pug';
import { FormErrorMessage } from '../formErrorMessage';
import { validator } from '../../utils/validator';
import { Input } from '../input';

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

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super('form', props);
  }

  protected getErrorBlockByID(id: string) {
    return (this.children.errorsElem as Block[])
      .find((el) => id === el.element?.dataset.for);
  }

  protected getInputElementByID(id: string) {
    return (this.children.inputs as Block[])
      .find((el) => id === el.element?.id)?.element;
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
      errorElem?.setProps({ message: validating });
      return false;
    }

    errorElem?.setProps({ message: '' });
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
    if (result.length > 0 && result.every((i) => i)) {
      return fullData;
    }
    return false;
  }

  init() {
    this.children.inputs = this.props.inputsMetaData
      .map((inputData: InputsMetaDataI) => new Input({
        ...inputData,
        value: this.props.data?.[inputData.id],
        events: {
          blur: () => this.isValid(inputData.id),
          focus: () => this.isValid(inputData.id),
        },
      }));
    this.children.errorsElem = this.props.inputsMetaData
      .map(({ id }: InputsMetaDataI) => new FormErrorMessage({
        inputId: id,
      }));
  }

  render() {
    return this.compile(template, this.props);
  }
}
