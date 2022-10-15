import { makeModule } from "@/context";

const userModule = makeModule('users', async ({ container: { register }, initialize }) => {

})

type UserRegistry = {}

export { userModule };
export type { UserRegistry }
