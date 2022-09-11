import Block from '../../../utils/Block';
import template from './chatWindowHead.pug';

interface ChatWindowHeadProps {
  contactName: string,
  contactImg?: string,
}

export class ChatWindowHead extends Block<ChatWindowHeadProps> {
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
