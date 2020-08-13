import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../config/auth';

interface TokenProps {
  iat: number;
  sub: number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new Error('Web token is missing');
  }

  const [, token] = authToken.split(' ');

  try {
    const encoded = verify(token, authConfig.jwt.secret);

    const { sub } = encoded as TokenProps;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid token');
  }
}
