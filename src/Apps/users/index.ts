import { makeModule } from "@/context";
import { toContainerValues } from "@/_lib/di/containerAdapters";
import { withMongoProvider } from "@/_lib/MongoProvider";
import { makeUsersController } from "./interface/http/usersController";

const userModule = makeModule('users', async ({ container: { register }, initialize }) => {
  const [collections] = await initialize(
    withMongoProvider({
    })
  );

  register({
    ...toContainerValues(collections)
  })

  await initialize(makeUsersController);
})

type UserRegistry = {}

export { userModule };
export type { UserRegistry }
