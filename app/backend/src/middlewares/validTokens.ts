import { Request, Response, NextFunction } from 'express';
import TokenJWT from '../utils/tokenJWT';

export default class validJwt {
  static async validTokens(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const validToken = TokenJWT.verify(token);
      res.locals.usuario = validToken;
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  }
}
