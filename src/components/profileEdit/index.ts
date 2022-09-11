import Block from '../../utils/Block';
import template from './profileEdit.pug';
import { Form } from '../form';
import { data } from '../../pages/profile';

export class ProfileEdit extends Block {
  static labels = [
    { email: 'Почта' },
    { login: 'Логин' },
    { first_name: 'Имя' },
    { second_name: 'Фамилия' },
    { display_name: 'Имя в чате' },
    { phone: 'Телефон' },
  ];

  static inputs = [{
    id: 'email',
    name: 'email',
    type: 'email',
  }, {
    id: 'login',
    name: 'login',
    type: 'text',
  }, {
    id: 'first_name',
    name: 'first_name',
    type: 'first_name',
  }, {
    id: 'second_name',
    name: 'second_name',
    type: 'second_name',
  }, {
    id: 'display_name',
    name: 'display_name',
    type: 'text',
  }, {
    id: 'phone',
    name: 'phone',
    type: 'phone',
  }];

  constructor() {
    super('section');
    this.element?.classList.add('profile_edit');
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    const dataSub = (this.children.form as Form).getData();
    // eslint-disable-next-line no-console
    console.log(dataSub); // выводим в консоль данные формы, если валидация пройдена
  }

  init() {
    this.children.form = new Form({
      inputsMetaData: ProfileEdit.inputs,
      labels: ProfileEdit.labels,
      button: 'Сохранить',
      data,
      events: {
        submit: this.submit.bind(this),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
