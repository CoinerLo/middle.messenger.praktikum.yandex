import HTTPTransport from '../services/HTTPTransport';

export default abstract class BaseApi {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(id?: string): Promise<unknown>;

  public abstract update?(id: string, data: unknown): Promise<unknown>;

  public abstract delete?(id: string): Promise<unknown>;
}
