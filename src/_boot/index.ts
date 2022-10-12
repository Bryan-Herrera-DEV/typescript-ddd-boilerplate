import { withContext } from "@/context"
import { Container } from "@/container"
import { asValue } from "awilix";
const main = withContext(async ({ app, container }) => {
  container.register({
    app: asValue(app)
  });
})

export { main }
