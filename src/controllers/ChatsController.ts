import API, {
  ChatsApi,
} from '../api/ChatsApi';
import { ReadChatUsers } from '../api/ChatsApi/ChatsApiTypes';
import UserApi from '../api/UserApi';
import store from '../store';
import logger from '../utils/logger';
import MessageController from './MessageController';

interface UserFromChat {
  chatId: number,
  login: string
}

export class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = API;
  }

  async fetchChats() {
    try {
      const chats = await this.api.getChats();
      store.set('chats', chats);
    } catch (e) {
      logger.error(e);
    }
  }

  async createChat(name: string) {
    try {
      const { id } = await this.api.createChat(name);
      store.set('currentChatId', id);
      store.set(`messanges.${id}`, []);
      this.fetchChats();
    } catch (e) {
      logger.error(e);
      throw new Error(e as string);
    }
  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChatById(id);
      store.set('currentChatId', null);
      store.set(`messanges.${id}`, []);
      store.set(`pages.${id}`, {});
      MessageController.deleteSocket(id);
      this.fetchChats();
    } catch (e) {
      logger.error(e);
      throw new Error(e as string);
    }
  }

  async updateChatAvatar(id: number, data: FormData) {
    try {
      await this.api.updateChatAvatar(id, data);
      this.fetchChats();
    } catch (e) {
      logger.error(e);
      throw new Error(e as string);
    }
  }

  async fetchNewMessageCount(id: number) {
    try {
      await this.api.getNewMessagesCount(id);
    } catch (e) {
      logger.error(e);
      throw new Error(e as string);
    }
  }

  async fetchTokenByChatId(id: number) {
    try {
      const token = await this.api.getToken(id);
      return token;
    } catch (e) {
      logger.error(e);
      throw new Error(e as string);
    }
  }

  // Далее работа с Users выбранного по id чата

  async fetchChatUsers(id: number, data: ReadChatUsers) {
    try {
      await this.api.getChatUsers(id, data);
    } catch (e) {
      logger.error(e);
      throw new Error(e as string);
    }
  }

  async addUsersToChat(data: UserFromChat) {
    try {
      const { chatId, login } = data;
      const user = await UserApi.searchUser({ login });
      if (user) {
        await this.api.addUsersToChat({ chatId, users: [user[0].id] });
      }
    } catch (e) {
      logger.error(e);
      throw new Error(e as string);
    }
  }

  async deleteUsersFromChat(data: UserFromChat) {
    try {
      const { chatId, login } = data;
      const user = await UserApi.searchUser({ login });
      if (user) {
        await this.api.deleteUsersFromChat({ chatId, users: [user[0].id] });
      }
    } catch (e) {
      logger.error(e);
      throw new Error(e as string);
    }
  }
}

export default new ChatsController();
