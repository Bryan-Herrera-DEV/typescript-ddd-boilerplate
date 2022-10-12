import dotenv from 'dotenv';
import { existsSync } from 'fs';

dotenv.config({
  path:  process.env.NODE_ENV === 'production' ? '.env'
  : existsSync(`.env.${process.env.NODE_ENV}.local`)
  ? `.env.${process.env.NODE_ENV}.local`
  : `.env.${process.env.NODE_ENV}`,
})

const environments = ['development', 'production', 'test'] as const;

type EnvironmentTypes = typeof environments[number];

const environment = (defaultValue: EnvironmentTypes = 'development'): EnvironmentTypes => {
  let env: any = process.env.NODE_ENV;

  if (!env) {
    env = process.env.NODE_ENV = defaultValue;
  }

  if (!environments.includes(env)) {
    throw new TypeError(`Valor no válido para la variable NODE_ENV. Los valores aceptados son: ${environments.join(' | ')}.`);
  }

  return env;
};



export { environment };
