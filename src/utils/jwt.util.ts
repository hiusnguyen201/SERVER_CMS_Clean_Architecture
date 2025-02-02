import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';

export const generateToken = (payload: JwtPayload, expiresIn?: string) => {
  return sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn || process.env.JWT_EXPIRES_IN || '7d',
  } as SignOptions);
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET);
};
