import { Server } from 'http';
import { logger } from '@/_lib/logger';
import { RequestHandler } from 'express';

type ShutdownMiddleware = {
  shutdownHook: () => Promise<void>;
  shutdownHandler: () => RequestHandler;
};

const gracefulShutdown = (server: Server, forceTimeout = 30000): ShutdownMiddleware => {
  let shuttingDown = false;

  const shutdownHook = () =>
    new Promise<void>((resolve, reject) => {
      if (!process.env.NODE_ENV?.match(/^prod/i) || !server.listening) {
        return resolve();
      }

      shuttingDown = true;

      logger.warn('Apagado del servidor');

      setTimeout(() => {
        logger.error('No se han podido cerrar las conexiones a tiempo, cerrándose a la fuerza');
        resolve();
      }, forceTimeout).unref();

      server.close((err) => {
        if (err) return reject(err);

        logger.info('Cerró las conexiones restantes.');
        resolve();
      });
    });

  return {
    shutdownHandler: () => (req, res, next) => {
      if (!shuttingDown) {
        return next();
      }

      res.set('Connection', 'close');
      res.status(503).send('El servidor está en proceso de reinicio.');
    },
    shutdownHook,
  };
};

export { gracefulShutdown };
