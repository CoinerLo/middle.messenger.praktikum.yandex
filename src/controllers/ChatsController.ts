/* eslint-disable no-console */
import API, {
  ChatsApi,
  ReadChatUsers,
} from '../api/ChatsApi';
import UserApi from '../api/UserApi';
import store from '../store';

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
      console.error(e);
    }
  }

  async createChat(name: string) {
    try {
      const { id } = await this.api.createChat(name);
      store.set('currentChatId', id);
      this.fetchChats();
    } catch (e) {
      console.error(e);
      throw new Error(e as string);
    }
  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChatById(id);
      store.set('currentChatId', null);
      this.fetchChats();
    } catch (e) {
      console.error(e);
      throw new Error(e as string);
    }
  }

  async updateChatAvatar(id: number, data: FormData) {
    try {
      await this.api.updateChatAvatar(id, data);
      this.fetchChats();
    } catch (e) {
      console.error(e);
      throw new Error(e as string);
    }
  }

  async fetchNewMessageCount(id: number) {
    try {
      await this.api.getNewMessagesCount(id);
    } catch (e) {
      console.error(e);
      throw new Error(e as string);
    }
  }

  async fetchTokenByChatId(id: number) {
    try {
      const token = await this.api.getToken(id);
      return token;
    } catch (e) {
      console.error(e);
      throw new Error(e as string);
    }
  }

  // Далее работа с Users выбранного по id чата

  async fetchChatUsers(id: number, data: ReadChatUsers) {
    try {
      await this.api.getChatUsers(id, data);
    } catch (e) {
      console.error(e);
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
      console.error(e);
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
      console.error(e);
      throw new Error(e as string);
    }
  }
}

export default new ChatsController();
