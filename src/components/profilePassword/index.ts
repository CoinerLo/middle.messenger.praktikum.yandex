import Block from '../../utils/Block';
import Form from '../form';
import template from './profilePassword.pug';

class ProfilePassword extends Block {
  static labels = [
    { oldPass: 'Старый пароль' },
    { password: 'Новый пароль' },
    { confirmPass: 'Повторите новый пароль' },
  ];

  static inputs = [{
    id: 'oldPass',
    name: 'oldPass',
    type: 'password',
  }, {
    id: 'password',
    name: 'password',
    type: 'password',
  }, {
    id: 'confirmPass',
    name: 'confirmPass',
    type: 'password',
  }];

  constructor() {
    super('section');
    this.element?.classList.add('profile_password');
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    const data = (this.children.password_form as Form).getData();
    // eslint-disable-next-line no-console
    console.log(data); // выводим в консоль данные формы, если валидация пройдена
  }

  init() {
    this.children.password_form = new Form({
      inputsMetaData: ProfilePassword.inputs,
      labels: ProfilePassword.labels,
      button: 'Сохранить',
      events: {
        submit: this.submit.bind(this),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfilePassword;
