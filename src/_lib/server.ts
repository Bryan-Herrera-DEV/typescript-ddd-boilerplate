import cors, { CorsOptions } from 'cors';

type ServerConfig = {
  http: {
    host: string;
    port: number;
    cors?: boolean | CorsOptions;
  };
};

const server = () => {}

export { server };
