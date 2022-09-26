// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback<C extends any[] = unknown[]> = (...args: C) => void;
type MapI<P> = P[keyof P];

class EventBus<
  E extends Record<string, string> = Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Args extends Record<MapI<E>, any[]> = Record<string, any[]>
> {
  private readonly listeners: {
    [K in MapI<E>]?: Callback<Args[K]>[]
  } = {};

  on<Event extends MapI<E>>(event: Event, callback: Callback<Args[Event]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  off<Event extends MapI<E>>(event: Event, callback: Callback<Args[Event]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]?.filter(
      (listener) => listener !== callback,
    );
  }

  emit<Event extends MapI<E>>(event: Event, ...args: Args[Event]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]?.forEach((listener) => {
      listener(...args);
    });
  }
}

export default EventBus;
