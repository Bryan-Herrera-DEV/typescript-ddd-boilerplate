import { userModule, UserRegistry } from '@/Apps/users';
type AppModulesConfig = {};

const appModules = [userModule];
type AppModulesRegistry = UserRegistry;

export { appModules };
export type { AppModulesConfig, AppModulesRegistry }
