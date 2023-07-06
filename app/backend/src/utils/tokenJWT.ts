import {
  sign,
  verify,
  JwtPayload,
  Secret,
  SignOptions,
} from 'jsonwebtoken';

export default class TokenJWT {
  private static secret: Secret = process.env.JWT_SECRET || '';

  private static jwtConfig: SignOptions = {
    expiresIn: '10d',
    algorithm: 'HS256',
  };

  static sign(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  static verify(token: string): JwtPayload | string {
    return verify(token, this.secret);
  }
}
