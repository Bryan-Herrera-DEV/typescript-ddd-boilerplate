type HookFn = () => Promise<void>;

type HookStore = {
  get: (lifecycle: Lifecycle) => HookFn[];
  append: (lifecycle: Lifecycle, ...fn: HookFn[]) => void;
  prepend: (lifecycle: Lifecycle, ...fn: HookFn[]) => void;
};

enum AppState {
  IDLE = 'IDLE',
  STARTING = 'STARTING',
  STARTED = 'STARTED',
  STOPPING = 'STOPPING',
  STOPPED = 'STOPED',
}

enum Lifecycle {
  BOOTING = 'BOOTING',
  BOOTED = 'BOOTED',
  READY = 'READY',
  RUNNING = 'RUNNING',
  DISPOSING = 'DISPOSING',
  DISPOSED = 'DISPOSED',
}
type LifecycleHooks = {
  [key in `on${Capitalize<Lowercase<keyof typeof Lifecycle>>}`]: (
    fn: HookFn | HookFn[],
    order?: 'append' | 'prepend'
  ) => void;
};

type Application = {
  getState: () => AppState;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  terminate: () => void;
  decorateHooks: (decorator?: (lifecycle: Lifecycle, fn: HookFn | HookFn[]) => HookFn | HookFn[]) => Application;
} & LifecycleHooks;

const makeHookStore = (): HookStore => {
  const hooks = new Map<Lifecycle, HookFn[]>();

  const get = (lifecycle: Lifecycle) => hooks.get(lifecycle) || [];

  const append = (lifecycle: Lifecycle, ...fn: HookFn[]) => hooks.set(lifecycle, [...get(lifecycle), ...fn]);

  const prepend = (lifecycle: Lifecycle, ...fn: HookFn[]) => hooks.set(lifecycle, [...fn, ...get(lifecycle)]);

  return {
    get,
    append,
    prepend,
  };
};

const promiseChain = <M extends HookFn[]>(hooksFns: M) => {
  return hooksFns.reduce((chain, fn) => chain.then(fn), Promise.resolve());
};

const memo = <F extends (...args: any[]) => any>(fn: F) => {
  let value: ReturnType<F>;

  return (...args: Parameters<F>): ReturnType<F> => {
    if (!value) {
      value = fn(args);
    }

    return value;
  };
};

const makeApp = ({ logger, shutdownTimeout }: any) => {
  let appState: AppState = AppState.IDLE;
  let release: null | (() => void);

  const hooks = makeHookStore();

  const started: HookFn = () =>
    new Promise<void>((resolve) => {
      logger.info('Application started');

      appState = AppState.STARTED;

      release = resolve;
    });

  const status = (newStatus: AppState) => async () => {
    appState = newStatus;
  };

  const transition = (lifecycle: Lifecycle) => () => promiseChain(hooks.get(lifecycle));


};



export { makeApp };
export type { HookFn, Application };
