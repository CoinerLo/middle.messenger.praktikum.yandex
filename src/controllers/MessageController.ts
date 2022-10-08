import ChatsApi from '../api/ChatsApi';
import WSSTransport from '../services/WSSTransport';
import store from '../store';
import { MessageI, StateI, _TFixTsAny } from '../typings';
import logger from '../utils/logger';

export class MessageController {
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
      logger.error(e);
    }
  }

  addMessage(data: MessageI[] | MessageI) {
    const { currentChatId, messanges } = store.getState() as StateI;

    if (Array.isArray(data)) {
      store.set(`messanges.${currentChatId}`, data);
    } else if (currentChatId) {
      const newData = [data, ...messanges[currentChatId]];
      store.set(`messanges.${currentChatId}`, newData);
    }
  }

  sendMessage(data: Record<string, _TFixTsAny>, chat_id: number) {
    const socket = this.managerSockets[chat_id];

    if (socket) {
      const status = socket.getStatus();
      if (status === 1) {
        socket.send(JSON.stringify(data));
      } else if (status === 3) {
        const state = store.getState() as StateI;
        const { id } = state.user;
        this.connect(id, chat_id);
        socket.send(JSON.stringify(data));
      }
    }
  }

  deleteSocket(id: number) {
    this.managerSockets[id].close('Вы вышли');
    delete this.managerSockets[id];
  }
}

export default new MessageController();
