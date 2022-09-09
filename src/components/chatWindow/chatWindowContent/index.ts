import Block from '../../../utils/Block';
import Message from '../../message';
import template from './chatWindowContent.pug';

interface MessagesData {
  content: string,
  time: string,
  isMyMess: boolean,
}

interface ChatWindowContentProps {
  messagesData: MessagesData[]
}

class ChatWindowContent extends Block {
  constructor(props: ChatWindowContentProps) {
    super('div', props);
    this.element?.classList.add('chat_window_content');
  }

  init() {
    this.children.messages = this.props.messagesData
      .map(({ content, time, isMyMess }: MessagesData) => new Message({
        content,
        time,
        isMyMess,
      }));
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatWindowContent;
