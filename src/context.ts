import { makeContext } from "./_lib/Context";
import { config } from "@/config"
import { container } from "@/container"


const { withContext, makeModule } = makeContext({ config, container }, {});

export { withContext, makeModule }
