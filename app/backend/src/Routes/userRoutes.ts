import { Request, Router, Response } from 'express';
import UserController from '../controller/UserController';
import validToken from '../middlewares/validTokens';
import validLogin from '../middlewares/validLogin';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/login', validLogin.login, (req: Request, res: Response) =>
  userController.login(req, res));

userRoutes.get('/login/role', validToken.validTokens, (req: Request, res: Response) =>
  res.status(200).json({ role: res.locals.usuario.role }));

export default userRoutes;
