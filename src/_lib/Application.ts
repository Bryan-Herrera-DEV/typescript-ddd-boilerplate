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


const makeApp = ({ logger, shutdownTimeout }: any) => {
  let appState: AppState = AppState.IDLE;
  let release: null | (() => void);

  const hooks = makeHookStore();
}

export { makeApp }
