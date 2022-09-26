import { User } from '../typings';
import BaseApi from './BaseApi';

export interface SignIpData {
  login: string,
  password: string,
}

export interface SignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  signIn(data: SignIpData) {
    return this.http.post('/signin', { data });
  }

  signUp(data: SignUpData) {
    return this.http.post('/signup', { data });
  }

  readUser(): Promise<User> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}

export default new AuthApi();
