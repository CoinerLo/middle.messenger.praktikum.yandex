/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from '../utils/Block';
import { router } from '../router';

export interface PropsWithRouter {
  router: typeof router;
}

interface ComponentConstructable<P extends Record<string, any>> {
  new(props: P): Block<P>
}

export function withRouter(Component: ComponentConstructable<any>) {
  type Props = typeof Component extends ComponentConstructable<infer P> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router });
    }
  };
}
