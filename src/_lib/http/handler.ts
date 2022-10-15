import { RequestHandler } from 'express';
import { asFunction } from 'awilix';
import { AsyncHandler, runAsync } from '@/_lib/http/runAsync';

type ControllerHandler = (dependencies: any) => AsyncHandler;

const handler = (handler: ControllerHandler): RequestHandler => {
  const resolver = asFunction(handler);

  return (req: any, res, next) => {
    if (!('container' in req)) {
      throw new Error("No se encuentra el contenedor de peticiones. ¿Has registrado el middleware `requestContainer`?");
    }

    const injectedHandler = req.container.build(resolver);

    return runAsync(injectedHandler)(req, res, next);
  };
};

export { handler };
