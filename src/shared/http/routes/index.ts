import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/products.routes';
import usersRouter from '../../../modules/users/routes/users.routes';
import sessionsRouter from '../../../modules/users/routes/sessions.routes';
import mediaRouter from '../../../modules/users/routes/media.routes';
import passwordRouter from '../../../modules/users/routes/password.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/media', mediaRouter);
routes.use('/password', passwordRouter);
routes.use('/products', productsRouter);


export default routes;
