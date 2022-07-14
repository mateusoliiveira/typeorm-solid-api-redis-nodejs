import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPassController from '../controllers/ForgotPassController';

const passwordRouter = Router();
const passwordController = new ForgotPassController();

passwordRouter
  .post(
    '/forgot',
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      }
    }),
    passwordController
      .create);

export default passwordRouter;
