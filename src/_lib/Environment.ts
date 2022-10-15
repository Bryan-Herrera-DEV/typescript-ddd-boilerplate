import dotenv from 'dotenv';
import { existsSync } from 'fs';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env'
      : existsSync(`.env.${process.env.NODE_ENV}.local`)
      ? `.env.${process.env.NODE_ENV}.local`
      : `.env.${process.env.NODE_ENV}`,
});

const environments = ['development', 'production', 'test'] as const;

type EnvironmentTypes = typeof environments[number];

type EnvironmentConfig = {
  environment: EnvironmentTypes;
};

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

const envString = (variable: string, defaultValue?: string): string => {
  const value = process.env[variable] || defaultValue;

  if (value == null) {
    throw new TypeError(`La variable de entorno requerida ${variable} no está definida y no tiene valor por defecto`);
  }

  return value;
};

const envNumber = (variable: string, defaultValue?: number): number => {
  const value = Number(process.env[variable]) || defaultValue;

  if (value == null) {
    throw new TypeError(`La variable de entorno requerida ${variable} no está definida y no tiene valor por defecto`);
  }

  return value;
};

export { environment, envString, envNumber };
export type { EnvironmentConfig };
