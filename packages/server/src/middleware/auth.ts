/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import jwt, { DecodeOptions } from 'jsonwebtoken';

export interface RequestAuth extends Request {
  userAuthenticate?: UserAuthenticateB;
}

interface UserAuthenticateB {
  id: string;
  user: string;
  type: string;
}

interface UserAuthenticate extends DecodeOptions {
  id: string;
  user: string;
  type: string;
}

export default (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): NextFunction | Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'No token provided'
    });

  const parts = authHeader.split(' ');

  if (parts.length !== 2)
    return res
      .status(401)
      .json({ statusCode: 401, error: 'Unauthorized', message: 'Token error' });

  const [scheme, token] = parts;

  if (!/Bearer$/i.test(scheme))
    return res.status(401).json({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Token unformatted'
    });

  jwt.verify(token, process.env.HASH_1_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Token invalid'
      });

    req.userAuthenticate = decoded as UserAuthenticate;

    return next();
  });
};
