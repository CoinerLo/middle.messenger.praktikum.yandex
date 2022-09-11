import Block from '../../utils/Block';
import template from './contactList.pug';
import { Contact } from './contact';
import { ContactsData } from '../../pages/chat';

interface ContactListProps {
  contacts: ContactsData[],
}

export class ContactList extends Block<ContactListProps> {
  constructor(props: ContactListProps) {
    super('div', props);
    this.element?.classList.add('contactList');
  }

  init() {
    this.children.contacts = this.props.contacts.map((contactData: ContactsData) => {
      const { messages, name, timeLastMessage } = contactData;
      return new Contact({
        lastMessage: messages[0],
        messages,
        name,
        timeLastMessage,
        numUnreadMessages: contactData.numUnreadMessages ?? undefined,
      });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
