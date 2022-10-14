import { BuildResolverOptions, createContainer } from "awilix";
import { makeInitialize } from "./Initialize";
import { MainRegistry } from "./_boot";

type Registry = MainRegistry;

const container = createContainer<Registry>();
const initialize = makeInitialize<Registry, BuildResolverOptions<any>>(container.build);


type Container = typeof container;
type Initialize = typeof initialize;

export { container, initialize }
export type { Container, Registry, Initialize }
