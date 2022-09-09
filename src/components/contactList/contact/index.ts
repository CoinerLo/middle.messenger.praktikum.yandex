import Block from '../../../utils/Block';
import template from './contact.pug';

export interface ContactProps {
  name: string,
  messages: string[],
  lastMessage: string,
  timeLastMessage: string,
  numUnreadMessages?: number,
}

class Contact extends Block {
  constructor(props: ContactProps) {
    super('div', props);
    this.element?.classList.add('contact');
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Contact;
