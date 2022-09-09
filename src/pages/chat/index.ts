import ChatWindow from '../../components/chatWindow';
import ContactHead from '../../components/contactHead';
import ContactList from '../../components/contactList';
import { ContactProps } from '../../components/contactList/contact';
import Block from '../../utils/Block';
import template from './chat.pug';

export type ChatData = {
  contactName: string,
  contactImg?: string,
}

const chatData = {
  contactName: 'Вадим',
  contactImg: '',
};

export type ContactsData = Omit<ContactProps, 'events' | 'lastMessage'>;

const contacts: ContactsData[] = [{
  name: 'Илья',
  messages: ['Друзья, у меня для вас особенный выпуск новостей! В нем мы разберем много нового!'],
  timeLastMessage: '15:12',
  numUnreadMessages: 4,
}, {
  name: 'тет-а-теты',
  messages: ['Миллионы россиян ежедневно проводят десятки часов своего времени в сети!'],
  timeLastMessage: 'Ср',
}];

class Chat extends Block {
  constructor() {
    super('main');
    this.element?.classList.add('chat');
  }

  init() {
    this.children.head = new ContactHead();

    this.children.window = new ChatWindow({
      chatData,
    });

    this.children.contactList = new ContactList({
      contacts,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Chat;
