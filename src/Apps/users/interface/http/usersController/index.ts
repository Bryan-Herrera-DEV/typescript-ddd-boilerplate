import { Router } from 'express';

type Dependencies = {
  apiRouter: Router;
};

const makeUsersController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  /**
   * @swagger
   */
  router.get('/prueba', (req, res) => {
    res.send('Funciona')
  });

  apiRouter.use(router);
};

export { makeUsersController };
