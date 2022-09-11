import queryStringify from '../utils/queryStringify';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface Options {
  method: Method,
  data?: Record<string, string>,
  headers?: Record<string, string>,
  timeout?: number
}

class HTTPTransport {
  defaultOptions = {
    method: Method.GET,
    timeout: 5000,
  };

  get = (url: string, options = {} as Options) => {
    const data = options?.data;
    const urlWithData = data ? `${url}${queryStringify(data)}` : url;
    this.request(urlWithData, { ...options, method: Method.GET });
  };

  post = (url: string, options = {}) => (
    this.request(url, { ...options, method: Method.POST }));

  put = (url: string, options = {}) => (
    this.request(url, { ...options, method: Method.PUT }));

  delete = (url: string, options = {}) => (
    this.request(url, { ...options, method: Method.DELETE }));

  request(
    url: string,
    options: Options = this.defaultOptions,
  ): Promise<XMLHttpRequest> {
    const {
      headers = {},
      method,
      data,
      timeout,
    } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout ?? this.defaultOptions.timeout;
      xhr.ontimeout = reject;

      if (!data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
