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

  const start = memo(async () => {
    if (appState !== AppState.IDLE) throw new Error('La aplicación ya ha comenzado.');

    logger.info('Inicio de la aplicación');

    try {
      await promiseChain([
        status(AppState.STARTING),
        transition(Lifecycle.BOOTING),
        transition(Lifecycle.BOOTED),
        transition(Lifecycle.READY),
        transition(Lifecycle.RUNNING),
        started,
      ]);
    } catch (err) {
      logger.error(err);

      await stop();
    }
  });

  const stop = memo(async () => {
    if (appState === AppState.IDLE) throw new Error('La aplicación no se está ejecutando.');

    if (release) {
      release();
      release = null;
    }

    logger.info('Stopping application');

    await promiseChain([
      status(AppState.STOPPING),
      transition(Lifecycle.DISPOSING),
      transition(Lifecycle.DISPOSED),
      status(AppState.STOPPED),
    ]);

    setTimeout(() => {
      logger.warn(
        'El proceso de "stop" ha terminado pero algo impide que la aplicación salga.'
      );
    }, 5000).unref();
  });


  let forceShutdown = false;

  const shutdown = (code: number) => async () => {
    process.stdout.write('\n');

    setTimeout(() => {
      logger.error('Ok, my patience is over! #ragequit');
      process.exit(code);
    }, shutdownTimeout).unref();

    if ((appState === AppState.STOPPING || appState === AppState.STOPPED) && code === 0) {
      if (forceShutdown) {
        process.kill(process.pid, 'SIGKILL');
      }

      logger.warn('The application is yet to finishing the shutdown process. Repeat the command to force exit');
      forceShutdown = true;
      return;
    }

    try {
      await stop();
    } catch (err) {
      logger.error(err);
    }

    process.exit(code);
  };
};



export { makeApp };
export type { HookFn, Application };
