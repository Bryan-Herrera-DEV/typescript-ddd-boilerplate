import { makeApp, HookFn, Application } from '@/_lib/Application';

type BootFn<T extends Record<string | symbol, any>> = (arg: Context<T>) => Promise<void | HookFn>;

type Module<T extends Record<string | symbol, any>, F extends BootFn<T> = BootFn<any>> = {
  name: string;
  fn: F;
};

type ContextApp = Omit<Application, 'start' | 'onBooting'>;

type Context<T extends Record<string | symbol, any>> = {
  app: ContextApp;
  bootstrap: <M extends Module<T>[]>(...modules: M) => Promise<void>;
} & T;

type ContextOptions = {
  shutdownTimeout: number;
  logger: Pick<Console, 'info' | 'error' | 'warn'>;
};

const defaultOptions: ContextOptions = {
  shutdownTimeout: 5000,
  logger: console,
};

const makeContext = <T extends Record<string | symbol, any>>(localContext: T, opts: Partial<ContextOptions> = {}) => {
  const { shutdownTimeout, logger } = { ...defaultOptions, ...opts };

  const moduleKey = Symbol();

  const app = makeApp({ shutdownTimeout, logger });

  const bootstrap = async (...modules: any): Promise<void> => {};
};
