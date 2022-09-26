import { User } from '../typings';
import BaseApi from './BaseApi';

export interface PasswordUpdateData {
  oldPassword: string,
  newPassword: string,
}

export interface UserUpdateData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface SearchUserData {
  login: string
}

export type AvatarUpdateData = FormData;

export class UserApi extends BaseApi {
  constructor() {
    super('/user');
  }

  updateUser(data: UserUpdateData) {
    return this.http.put('/profile', { data });
  }

  updatePassword(data: PasswordUpdateData) {
    return this.http.put('/password', { data });
  }

  updateAvatar(data: AvatarUpdateData) {
    return this.http.put('/profile/avatar', { data });
  }

  readUserById(id: string) {
    return this.http.get(`/${id}`);
  }

  searchUser(data: SearchUserData): Promise<Array<Omit<User, 'password'>>> {
    return this.http.post('/search', { data });
  }

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}

export default new UserApi();
