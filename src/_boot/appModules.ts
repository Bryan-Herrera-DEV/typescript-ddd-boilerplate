import { UserRegistry, userModule } from '@/Apps/users';

// eslint-disable-next-line @typescript-eslint/ban-types
type AppModulesConfig = {};

const appModules = [userModule, ];

type AppModulesRegistry = UserRegistry;

export { appModules };
export type { AppModulesConfig, AppModulesRegistry };
