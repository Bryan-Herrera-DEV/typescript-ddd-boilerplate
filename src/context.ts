import { makeContext } from "./_lib/Context";
import { config } from "@/config"

const { withContext, makeModule } = makeContext({ config }, {});

export { withContext, makeModule }
