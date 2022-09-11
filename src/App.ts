import Block from './utils/Block';
import template from './app.pug';
import { Header } from './components/header';
import routes from './utils/routes';

class App extends Block {
  constructor() {
    super('div');
    this.element?.classList.add('container');
  }

  init() {
    const path = document.location.pathname;

    const PageClass = routes[path];

    this.children.header = new Header();

    this.children.main = new PageClass();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default App;
