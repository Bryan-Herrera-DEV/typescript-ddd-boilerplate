import { makeModule } from '@/context';
import cors, { CorsOptions } from 'cors';

type ServerConfig = {
  http: {
    host: string;
    port: number;
    cors?: boolean | CorsOptions;
  };
};

const server = makeModule('server', async () => {

})

export { server };
