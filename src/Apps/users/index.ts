import { makeModule } from "@/context";
import { toContainerValues } from "@/_lib/di/containerAdapters";
import { initUsersCollection, UsersCollection } from "@/Apps/users/infraestructure/UsersCollection"
import { withMongoProvider } from "@/_lib/MongoProvider";
import { makeUsersController } from "./interface/http/usersController";

const userModule = makeModule('users', async ({ container: { register }, initialize }) => {
  const [collections] = await initialize(
    withMongoProvider({
      usersCollection: initUsersCollection
    })
  );

  register({
    ...toContainerValues(collections),
  })

  await initialize(makeUsersController);
})

type UserRegistry = {
  usersCollection: UsersCollection
}

export { userModule };
export type { UserRegistry }
