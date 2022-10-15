import { Router } from 'express';

type Dependencies = {
  apiRouter: Router;
};

const makeUsersController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  /**
   * @swagger
   *
   * /users/health:
   *   get:
   *     tags:
   *       - Users
   *     summary: Obtiene status del modulo PubSub de usuarios
   *     produces:
   *       - application/json
   */
  router.get('/users/health', (req, res) => {
    res.send('Funciona')
  });

  apiRouter.use(router);
};

export { makeUsersController };
