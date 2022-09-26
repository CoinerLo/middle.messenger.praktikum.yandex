import Block from '../utils/Block';
import store, { StoreEvents } from '.';
import { State } from '../typings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ComponentConstructable<P extends Record<string, any>> {
  new(props: P): Block<P>
}

export function withStore<K>(mapStateToProps: (state: State) => K) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function wrap<P extends Record<string, any>>(Component: ComponentConstructable<K & P>) {
    let previousState: K;

    return class WithStore extends Component {
      constructor(props: P) {
        previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          previousState = stateProps;

          this.setProps(({ ...props, ...stateProps }));
        });
      }
    };
  };
}
