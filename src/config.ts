import { MainConfig } from '@/_boot';
import { environment, EnvironmentConfig, envNumber, envString } from '@/_lib/Environment';

type Configuration = MainConfig & EnvironmentConfig;

const config: Configuration = {
  appName: 'node-api-boilerplate',
  cli: process.argv.includes('--cli'),
  environment: environment(),
  repl: {
    port: envNumber('REPL_PORT', 5010),
  },
  http: {
    host: envString('HOST', 'localhost'),
    port: envNumber('PORT', 5000),
  },
  swagger: {
    title: 'Prueba',
    version: '1.0.0',
    basePath: '/api',
    docEndpoint: '/api-docs',
  },
  mongodb: {
    database: envString('DB_NAME', 'TESTING_BOILERPLATE'),
    host: envString('DB_HOST', 'mongodb://localhost:27017'),
    username: envString('DB_USER', ''),
    password: envString('DB_PASS', ''),
  },
};

export { config };
export type { Configuration };
