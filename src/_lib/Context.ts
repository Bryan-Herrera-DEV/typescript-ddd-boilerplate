import { Application, HookFn, makeApp } from '@/_lib/Application';

type EntrypointFn<T extends Record<string | symbol, any>> = (arg: Context<T>) => Promise<void>;

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

type ContextProvider<T extends Record<string | symbol, any>> = {
  makeModule: <F extends BootFn<T>, M extends Module<F>>(name: string, fn: F) => M;
  withContext: <F extends EntrypointFn<T>>(fn: F) => () => Promise<void>;
};

type ContextOptions = {
  shutdownTimeout: number;
  logger: Pick<Console, 'info' | 'error' | 'warn'>;
};

const defaultOptions: ContextOptions = {
  shutdownTimeout: 5000,
  logger: console,
};

const makeContext = <T extends Record<string | symbol, any>>(
  localContext: T,
  opts: Partial<ContextOptions> = {}
): ContextProvider<T> => {
  const { shutdownTimeout, logger } = { ...defaultOptions, ...opts };
  const moduleKey = Symbol();

  const app = makeApp({ shutdownTimeout, logger });

  const bootstrap = async <M extends Module<T>[]>(...modules: M): Promise<void> => {
    if (!modules.every((module) => module[moduleKey])) {
      const foreignModules = modules.filter((module) => !module[moduleKey]).map((module) => module.name);
      throw new Error(`Módulo(s) proporcionado(s) para la función bootstrap: ${foreignModules.join(', ')}`);
    }

    const bootOrder = modules.map(({ name, fn }) => async () => {
      logger.info(`Lanzando Modulo ${name} module.`);

      const result = await fn(
        Object.freeze({
          ...context,
          app: app.decorateHooks((lifecycle, fn) => async () => {
            const isArray = Array.isArray(fn);

            logger.info(`Corriendo ${lifecycle.toLowerCase()} hook${isArray ? 's' : ''} desde el ${name}.`);

            return (Array.isArray(fn) ? fn : [fn]).reduce(
              (chain, hook) =>
                chain.then(() =>
                  hook().catch((err) => {
                    logger.error(
                      `Error durante la realización de ${lifecycle.toLowerCase()} hook${isArray ? 's' : ''} desde el ${name}.`
                    );
                    logger.error(err);
                  })
                ),
              Promise.resolve()
            );
          }),
        })
      );

      if (typeof result === 'function') {
        app.onDisposing(async () => {
          logger.info(`Eliminando modulo ${name}.`);

          return result().catch((err) => {
            logger.error(`Error al eliminar el módulo ${name}. Intentando reanudar el desmontaje`);
            logger.error(err);
          });
        }, 'prepend');
      }
    });

    app.onBooting(bootOrder);

    return app.start();
  };

  const context: Context<T> = {
    ...localContext,
    app,
    bootstrap,
  };

  return {
    makeModule: <F extends BootFn<T>, M extends Module<F>>(name: string, fn: F): M =>
      ({
        [moduleKey]: true,
        name,
        fn,
      } as unknown as M),
    withContext:
      <F extends EntrypointFn<T>>(fn: F): (() => Promise<void>) =>
      () =>
        fn(Object.freeze(context)),
  };
};

export { makeContext };
export type { ContextApp };
