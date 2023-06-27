import { Request, Response, NextFunction } from 'express';
import TokenJWT from '../utils/tokenJWT';

export default class validJwt {
  static async validTokens(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Token not found' });
    }
    const validToken = TokenJWT.verify(token);
    res.locals.usuario = validToken;
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
      next();
    }
  }
}
