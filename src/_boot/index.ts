import { withContext } from "@/context"
import { Container } from "@/container"
import { asValue } from "awilix";
import { ContextApp } from "@/_lib/Context";

type MainRegistry = {
  app: ContextApp;
  container: Container;
};

const main = withContext(async ({ app, container, config, bootstrap }) => {
  container.register({
    app: asValue(app),
    config: asValue(config)
  });

  await bootstrap();
})

export { main }
export type { MainRegistry };
