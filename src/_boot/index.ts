import { withContext } from "@/context"
import { Container, Initialize } from "@/container"
import { asValue } from "awilix";
import { ContextApp } from "@/_lib/Context";
import { AppModulesConfig, AppModulesRegistry } from "./appModules";
import { Logger } from "@/_lib/logger";

type MainRegistry = {
  app: ContextApp;
  container: Container;
  initialize: Initialize;
  startedAt: Date;
  logger: Logger;
  config: RTCConfiguration;
} & AppModulesRegistry ;

type MainConfig = AppModulesConfig;

const main = withContext(async ({ app, container, config, bootstrap, logger, initialize}) => {
  container.register({
    app: asValue(app),
    initialize: asValue(initialize),
    container: asValue(container),
    logger: asValue(logger),
    startedAt: asValue(new Date()),
    config: asValue(config),
  });

  await bootstrap();
})

export { main }
export type { MainRegistry, MainConfig };
