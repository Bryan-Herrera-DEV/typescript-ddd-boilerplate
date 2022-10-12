import { environment } from "./_lib/Environment";

const config: any = {
  appName: 'typescript-ddd-boilerplate',
  cli: process.argv.includes('--cli'),
  environment: environment(),
};

export { config }
