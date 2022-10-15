import { makeModule } from '@/context';
import { resolve } from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

type SwaggerConfig = {
  swagger: {
    title: string;
    version: string;
    basePath: string;
    docEndpoint: string;
  };
};

const swagger = makeModule('swagger', async ({ container: { build }, config: { http, swagger } }) => {
  const options = {
    definition: {
      info: {
        title: swagger.title,
        version: swagger.version,
        description:
        "Este es un simple ejemplo de API con arquitctura Hexagonal",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html"
        },
        contact: {
          name: "Bryan-Herrrera-DEV",
          url: "https://bryan-herrera.netlify.app",
          email: "bryherrera55@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:5000/api",
        },
      ],
      basePath: swagger.basePath,
    },
    apis: [resolve(__dirname, '../**/interface/http/**/*.yaml'), resolve(__dirname, '../**/interface/http/**/*.ts')],

  };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(options);

  build(({ server }) => {
    server.use(swagger.docEndpoint, swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true, customSiteTitle: 'DDD boilerplate'}));
  });
});

export { swagger };
export type { SwaggerConfig };
