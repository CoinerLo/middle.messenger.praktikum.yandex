import Form from '../../components/form';
import Block from '../../utils/Block';
import template from './signUp.pug';

class SignUp extends Block {
  static labels = [
    { email: 'Почта' },
    { login: 'Логин' },
    { first_name: 'Имя' },
    { second_name: 'Фамилия' },
    { phone: 'Телефон' },
    { password: 'Пароль' },
    { confirmPass: 'Пароль (еще раз)' },
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
    id: 'phone',
    name: 'phone',
    type: 'phone',
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
    this.element?.classList.add('signUp');
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    const data = (this.children.loginForm as Form).getData();
    // eslint-disable-next-line no-console
    console.log(data); // выводим в консоль данные формы, если валидация пройдена
  }

  init() {
    this.children.loginForm = new Form({
      button: 'Зарегистрироваться',
      title: 'Регистрация',
      redirect: '/signIn',
      redirectTitle: 'Войти',
      inputsMetaData: SignUp.inputs,
      labels: SignUp.labels,
      events: {
        submit: this.submit.bind(this),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default SignUp;
