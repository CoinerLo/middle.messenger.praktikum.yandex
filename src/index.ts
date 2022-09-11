/* eslint-disable @typescript-eslint/no-non-null-assertion */
import App from './App';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')!;
  const page = new App();

  root.append(page.getContent()!);
  page.dispatchComponentDidMount();
});
