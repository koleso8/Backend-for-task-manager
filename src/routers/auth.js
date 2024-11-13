import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as controllers from '../controllers/auth.js';
import * as validation from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(validation.registerUserSchema),
  ctrlWrapper(controllers.registerUserController)
);

authRouter.post(
  '/login',
  validateBody(validation.loginUserSchema),
  ctrlWrapper(controllers.loginUserController)
);

authRouter.post('/logout', ctrlWrapper(controllers.logOutUserController));

authRouter.post('/refresh', ctrlWrapper(controllers.refreshTokenController));

authRouter.post(
  '/send-reset-email',
  validateBody(validation.sendResetEmailSchema),
  ctrlWrapper(controllers.sendResetEmailController)
);

authRouter.post(
  '/reset-pwd',
  validateBody(validation.resetPasswordSchema),
  ctrlWrapper(controllers.resetPasswordController)
);

export default authRouter;
