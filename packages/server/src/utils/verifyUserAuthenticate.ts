import { Response } from 'express';
import { RequestAuth } from '../middleware/auth';

const verifyUserIsAdmin = (request: RequestAuth): boolean => {
  const TypeUserAuthenticate = request.userAuthenticate?.type;
  return TypeUserAuthenticate === '1';
};

const authorizationUserIsAdmin = (
  request: RequestAuth,
  response: Response
): boolean | Response => {
  if (!verifyUserIsAdmin(request)) {
    return response
      .status(403)
      .json({ statusCode: 403, error: 'Forbidden', message: 'access denied' });
  }

  return true;
};

export default authorizationUserIsAdmin;
