import { ContactsData } from '../../pages/chat';
import Block from '../../utils/Block';
import Contact from './contact';
import template from './contactList.pug';

interface ContactListProps {
  contacts: ContactsData[],
}

class ContactList extends Block {
  constructor(props: ContactListProps) {
    super('div', props);
    this.element?.classList.add('contactList');
  }

  init() {
    this.children.contacts = this.props.contacts.map((i: ContactsData) => {
      const { messages, name, timeLastMessage } = i;
      return new Contact({
        lastMessage: messages[0],
        messages,
        name,
        timeLastMessage,
        numUnreadMessages: i.numUnreadMessages ?? undefined,
      });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ContactList;
