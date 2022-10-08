import Block from '../utils/Block';
import { Route } from './Route';

export default class Router {
  // eslint-disable-next-line no-use-before-define
  private static __instance: Router;

  private currentRoute: Route | null = null;

  private rootQuery!: string;

  routes: Route[] = [];

  history = window.history;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery);

    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go('/error404');
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export const router = new Router('#app');
