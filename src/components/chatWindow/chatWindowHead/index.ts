import Block from '../../../utils/Block';
import template from './chatWindowHead.pug';

interface ChatWindowHeadProps {
  contactName: string,
  contactImg?: string,
}

class ChatWindowHead extends Block {
  constructor(props: ChatWindowHeadProps) {
    super('div', props);
    this.element?.classList.add('chat_window_head');
  }

  init() {
    // здесь будет кнопка в будущих версиях
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatWindowHead;
