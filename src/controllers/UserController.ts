/* eslint-disable no-console */
import API, {
  UserUpdateData,
  UserApi,
  PasswordUpdateData,
  AvatarUpdateData,
  SearchUserData,
} from '../api/UserApi';
import { router } from '../router';
import AuthController from './AuthController';

export class UserController {
  private readonly api: UserApi;

  constructor() {
    this.api = API;
  }

  async updateProfile(data: UserUpdateData) {
    try {
      await this.api.updateUser(data);
      await AuthController.fetchUser();
      router.go('/settings');
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async updatePassword(data: PasswordUpdateData) {
    try {
      await this.api.updatePassword(data);
      router.go('/settings');
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async updateAvatar(data: AvatarUpdateData) {
    try {
      await this.api.updateAvatar(data);
      await AuthController.fetchUser();
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async getUserById(id: string) {
    try {
      await this.api.readUserById(id);
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async searchUsers(data: SearchUserData) {
    try {
      await this.api.searchUser(data);
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}

export default new UserController();
