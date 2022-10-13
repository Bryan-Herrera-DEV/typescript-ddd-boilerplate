import { makeModule } from "@/context";

const userModule = makeModule('article', async () => {})

type UserRegistry = {}

export { userModule };
export type { UserRegistry }
