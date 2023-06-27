import { Request, Response, NextFunction } from 'express';

export default class validLogin {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!email.match(/\S+@\S+\.\S+/)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
