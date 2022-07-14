import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPassController from '../controllers/ForgotPassController';
import ResetPassController from '../controllers/ResetPassController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPassController();
const resetPasswordController = new ResetPassController();

passwordRouter
  .post(
    '/forgot',
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      }
    }),
    forgotPasswordController
      .create);

passwordRouter
  .post(
    '/reset',
    celebrate({
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().min(6).max(20).required(),
        passwordConfirmation: Joi.string().min(6).max(20).required().valid(Joi.ref('password')),
      }
    }),
    resetPasswordController
      .create);


export default passwordRouter;
