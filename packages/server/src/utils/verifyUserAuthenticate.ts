import { Response } from 'express';
import { RequestAuth } from '../middlewares/auth'

export const authorizationUserIsAdmin = (request: RequestAuth, response: Response) => {
	if(!verifyUserIsAdmin(request))
		return response.status(403).json({statusCode: 403, error: "Forbidden", message: "access denied"});

	return true;
};

const verifyUserIsAdmin = (request: RequestAuth) => {
	let TypeUserAuthenticate =  request._userAuthenticate?.type;
	return TypeUserAuthenticate=='1';
};