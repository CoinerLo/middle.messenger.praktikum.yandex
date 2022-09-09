import Block from '../../utils/Block';
import Search from '../search';
import template from './contactHead.pug';

class ContactHead extends Block {
  constructor() {
    super('div');
    this.element?.classList.add('contactList_head');
  }

  init() {
    this.children.search = new Search({
      events: {
        change: this.change.bind(this),
      },
    });
  }

  change() {
    const data = (this.children.search as Search).getData();
    // eslint-disable-next-line no-console
    console.log(data); // выводим в консоль данные запроса на поиск
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ContactHead;