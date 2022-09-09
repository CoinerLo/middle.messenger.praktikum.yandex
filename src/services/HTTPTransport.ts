import queryStringify from '../utils/queryStringify';

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface Options {
  method: METHOD,
  data?: Record<string, string>,
  headers?: Record<string, string>,
  timeout?: number
}

class HTTPTransport {
  defaultOptions = {
    method: METHOD.GET,
    timeout: 5000,
  };

  get = (url: string, options = {}) => (
    this.request(url, { ...options, method: METHOD.GET }));

  post = (url: string, options = {}) => (
    this.request(url, { ...options, method: METHOD.POST }));

  put = (url: string, options = {}) => (
    this.request(url, { ...options, method: METHOD.PUT }));

  delete = (url: string, options = {}) => (
    this.request(url, { ...options, method: METHOD.DELETE }));

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
      const isGet = method === METHOD.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

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

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
