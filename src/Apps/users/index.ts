import { makeModule } from "@/context";

const userModule = makeModule('users', async () => {})

type UserRegistry = {}

export { userModule };
export type { UserRegistry }
