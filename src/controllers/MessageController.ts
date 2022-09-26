/* eslint-disable no-console */
import ChatsApi from '../api/ChatsApi';
import WSSTransport from '../services/WSSTransport';
import store from '../store';
import { Message, State } from '../typings';

export class MessageController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private managerSockets: Record<number, WSSTransport> = {};

  async connect(user_id: number, chat_id: number) {
    try {
      if (this.managerSockets[chat_id]) {
        const status = this.managerSockets[chat_id].getStatus();
        if (status !== 3) {
          return;
        }
      }

      const { token } = await ChatsApi.getToken(chat_id);

      const item = new Promise((resolve) => {
        const socket = new WSSTransport(user_id, chat_id, token);

        this.managerSockets[chat_id] = socket;
        socket.on('addMessage', this.addMessage.bind(this));
        socket.on('open', resolve);
      });
      await item;

      this.sendMessage({ type: 'get old', content: '0' }, chat_id);
    } catch (e) {
      console.error(e);
    }
  }

  addMessage(data: Message[] | Message) {
    const { currentChatId, messanges } = store.getState() as State;

    if (Array.isArray(data)) {
      store.set(`messanges.${currentChatId}`, data);
    } else if (currentChatId) {
      const newData = [data, ...messanges[currentChatId]];
      store.set(`messanges.${currentChatId}`, newData);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMessage(data: Record<string, any>, chat_id: number) {
    const socket = this.managerSockets[chat_id];

    if (socket) {
      socket.send(JSON.stringify(data));
    }
  }
}

export default new MessageController();
