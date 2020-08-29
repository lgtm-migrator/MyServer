import jwt from 'jsonwebtoken';

interface Params {
  id: number;
  type: number;
  email: string;
}
interface ParamsListen {
  type: number;
}

export const generateTokenListen = (
  params: ParamsListen,
  expiresIn = 86400,
  key = process.env.HASH_1_SECRET as string
): string => {
  return jwt.sign(params, key, {
    expiresIn
  });
};

export default (
  params: Params,
  expiresIn = 86400,
  key = process.env.HASH_1_SECRET as string
): string => {
  return jwt.sign(params, key, {
    expiresIn
  });
};
