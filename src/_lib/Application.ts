type HookFn = () => Promise<void>;

type HookStore = {
  get: (lifecycle: any) => HookFn[];
  append: (lifecycle: any, ...fn: HookFn[]) => void;
  prepend: (lifecycle: any, ...fn: HookFn[]) => void;
};

enum AppState {
  IDLE = 'IDLE',
  STARTING = 'STARTING',
  STARTED = 'STARTED',
  STOPPING = 'STOPPING',
  STOPPED = 'STOPED',
}

const makeHookStore = (): HookStore => {
  const hooks = new Map<any, HookFn[]>();

  const get = (lifecycle: any) => hooks.get(lifecycle) || [];

  const append = (lifecycle: any, ...fn: HookFn[]) => hooks.set(lifecycle, [...get(lifecycle), ...fn]);

  const prepend = (lifecycle: any, ...fn: HookFn[]) => hooks.set(lifecycle, [...fn, ...get(lifecycle)]);

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
