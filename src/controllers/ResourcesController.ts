/* eslint-disable no-console */
import API, { ResourcesApi } from '../api/ResourcesApi';

export class ResourcesController {
  private readonly api: ResourcesApi;

  constructor() {
    this.api = API;
  }

  async fetchData(path: string) {
    try {
      const data = await this.api.getData(path);
      console.log(data); // MEMORY: изменим при добавлении функционала отправки файлов
    } catch (e) {
      console.error(e);
      throw new Error(e as string);
    }
  }

  async loadData(data: FormData) {
    try {
      await this.api.postData(data);
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}

export default new ResourcesController();
