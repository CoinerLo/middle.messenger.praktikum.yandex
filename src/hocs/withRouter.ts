import Block from '../utils/Block';
import { router } from '../router';
import { _TFixTsAny } from '../typings';

export interface PropsWithRouter {
  router: typeof router;
}

interface ComponentConstructable<P extends Record<string, _TFixTsAny>> {
  new(props: P): Block<P>
}

export function withRouter(Component: ComponentConstructable<_TFixTsAny>) {
  type Props = typeof Component extends ComponentConstructable<infer P> ? P : _TFixTsAny;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router });
    }
  };
}
