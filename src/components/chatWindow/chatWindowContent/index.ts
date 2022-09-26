import { withStore } from '../../../store/WithStore';
import { Message as MessageI } from '../../../typings';
import Block from '../../../utils/Block';
import { isEqual } from '../../../utils/helpers';
import { Message } from '../../message';
import template from './chatWindowContent.pug';

export interface ChatWindowContentProps {
  currentChatId: number,
  messages: MessageI[],
  userId: number,
}

export class ChatWindowContentBase extends Block<ChatWindowContentProps> {
  constructor(props: ChatWindowContentProps) {
    super('div', props);
    this.element?.classList.add('chat_window_content');
  }

  init() {
    if (this.props.messages) {
      this.children.messages = this.props.messages
        .map(({ content, time, user_id }: MessageI) => new Message({
          content,
          time,
          isMyMess: user_id === this.props.userId,
        }));
    }
  }

  protected componentDidUpdate(
    oldProps: ChatWindowContentProps,
    newProps: ChatWindowContentProps,
  ): boolean {
    if (!isEqual(oldProps, newProps) && newProps.messages) {
      this.children.messages = newProps.messages
        .map(({ content, time, user_id }: MessageI) => new Message({
          content,
          time,
          isMyMess: user_id === this.props.userId,
        }));
      return true;
    }

    if (!newProps.messages) {
      this.children.messages = [];
      return true;
    }

    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChat = withStore((state) => ({
  currentChatId: state.currentChatId,
  messages: state.currentChatId && state.messanges ? state.messanges[state.currentChatId] : [],
}));

export const ChatWindowContent = withChat(ChatWindowContentBase);
