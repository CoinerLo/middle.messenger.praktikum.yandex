import { ChatData } from '../../pages/chat';
import Block from '../../utils/Block';
import template from './chatWindow.pug';
import { ChatWindowContent } from './chatWindowContent';
import { ChatWindowForm } from './chatWindowForm';
import { ChatWindowHead } from './chatWindowHead';

interface ChatWindowProps {
  chatData?: ChatData,
}

const messages = [{
  content: 'Круто!',
  isMyMess: true,
  time: '12:00',
}, {
  content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории - НАСА в какой-то момент попросила Хассульблад адаптировать модель',
  isMyMess: false,
  time: '11:56',
}, {
  content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории - НАСА в какой-то момент попросила Хассульблад адаптировать модель',
  isMyMess: false,
  time: '11:56',
}];

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super('section', props);
    this.element?.classList.add('chat_window');
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    const form = this.children.form as ChatWindowForm;
    const message = form.getData();
    // eslint-disable-next-line no-console
    console.log(message); // пока выводим в консоль
  }

  init() {
    this.children.head = new ChatWindowHead({
      contactName: this.props.chatData?.contactName ?? 'Unknown',
    });

    this.children.content = new ChatWindowContent({
      messagesData: messages,
    });

    this.children.form = new ChatWindowForm({
      events: {
        submit: this.submit.bind(this),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
