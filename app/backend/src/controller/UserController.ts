import { Request, Response } from 'express';
import User from '../service/user.service';

export default class UserController {
  constructor(private user = new User()) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const response = await this.user.login(req.body);

    if (response.status === 'INVALID_DATA') {
      return res.status(401).json(response.data);
    }
    if (response.status === 'NOT_FOUND') {
      return res.status(401).json(response.data);
    }
    return res.status(200).json(response.data);
  }
}
