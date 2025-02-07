import { ONE_MOUNCE } from '../constants/index.js';
import * as services from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MOUNCE),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MOUNCE),
  });
};

export const registerUserController = async (req, res) => {
  const user = await services.registerUser(req.body);

  setupSession(res, user);

  res.status(201).json({
    status: 201,
    message: 'Syccessfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await services.loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successufuly logged in',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logOutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await services.logOutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshTokenController = async (req, res) => {
  const session = await services.refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Seccessfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const sendResetEmailController = async (req, res) => {
  await services.requestResetToken(req.body.email);
  res.status(200).json({
    message: 'Reset password email has been successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await services.resetPassword(req.body);
  res.status(200).json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
