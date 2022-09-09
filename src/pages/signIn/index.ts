import Form from '../../components/form';
import Block from '../../utils/Block';
import template from './signIn.pug';

class SignIn extends Block {
  static labels = [
    { login: 'Логин' },
    { password: 'Пароль' },
  ];

  static inputsMetaData = [
    {
      id: 'login',
      name: 'login',
      type: 'text',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
    },
  ];

  constructor() {
    super('section');
    this.element?.classList.add('signIn');
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    const data = (this.children.loginForm as Form).getData();
    // eslint-disable-next-line no-console
    console.log(data); // выводим в консоль данные формы, если валидация пройдена
  }

  init() {
    this.children.loginForm = new Form({
      button: 'Авторизоваться',
      title: 'Вход',
      redirect: '/signUp',
      redirectTitle: 'Нет аккаунта?',
      inputsMetaData: SignIn.inputsMetaData,
      labels: SignIn.labels,
      events: {
        submit: this.submit.bind(this),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default SignIn;
