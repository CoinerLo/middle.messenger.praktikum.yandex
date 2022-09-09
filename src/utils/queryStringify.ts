function queryStringify(data: Record<string, string | number>): string {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => (`${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`), '?');
}

export default queryStringify;
