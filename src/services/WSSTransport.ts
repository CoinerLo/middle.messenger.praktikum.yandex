import EventBus from '../utils/EventBus';
import logger from '../utils/logger';

class WSSTransport extends EventBus {
  private instance: WebSocket | null = null;

  constructor(user_id: number, chat_id: number, token_value: string) {
    super();
    const url = `wss://ya-praktikum.tech/ws/chats/${user_id}/${chat_id}/${token_value}`;
    const soket = new WebSocket(url);

    soket.onmessage = this.onmessage.bind(this);
    soket.onerror = this.error.bind(this);
    soket.onclose = this.close.bind(this);
    soket.onopen = this.onopen.bind(this);

    this.instance = soket;
  }

  onopen() {
    this.send(JSON.stringify({ type: 'ping' }));
    this.emit('open');
    logger.log('open');
  }

  close(e: CloseEvent | string) {
    logger.log(e);
  }

  error(e: Event) {
    logger.log(e);
  }

  onmessage(event: MessageEvent) {
    const data = JSON.parse(event.data);
    if (Array.isArray(data) && data.length > 0) {
      this.emit('addMessage', data);
    } else if (typeof data === 'object' && !Array.isArray(data) && data.type === 'message') {
      this.emit('addMessage', data);
    }
  }

  send(data: string) {
    this.instance?.send(data);
  }

  getStatus() {
    return this.instance?.readyState;
  }
}

export default WSSTransport;
