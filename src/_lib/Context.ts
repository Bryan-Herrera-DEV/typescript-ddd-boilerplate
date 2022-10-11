import { makeApp } from '@/_lib/Application';

type ContextApp = "";

type Context<T extends Record<string | symbol, any>> = {
  app: ContextApp;
} & T;

type ContextOptions = {
  shutdownTimeout: number;
  logger: Pick<Console, 'info' | 'error' | 'warn'>;
};

const defaultOptions: ContextOptions = {
  shutdownTimeout: 5000,
  logger: console,
}

const makeContext = (opts: Partial<ContextOptions> = {}) => {
  const { shutdownTimeout, logger } = { ...defaultOptions, ...opts };

  const moduleKey = Symbol();

  const app = makeApp({shutdownTimeout, logger});

  const bootstrap = async (...modules: any): Promise<void> =>{}
}
