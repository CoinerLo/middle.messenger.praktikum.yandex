import { set } from '../utils/helpers';
import EventBus from '../utils/EventBus';
import { State } from '../typings';

export enum StoreEvents {
  Updated = 'updated'
}

class Store extends EventBus {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private state: {} | State = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export default store;
