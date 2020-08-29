import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import connection from '../database/connection';
import generateToken from '../utils/generateToken';

export default {
  index: async (req: Request, res: Response): Promise<Response> => {
    const users = await connection('user');

    return res.json(users);
  },
  register: async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;
    const { email } = body;
    try {
      if ((await connection('user').where({ email })).length !== 0) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: '"user" already in use',
          validation: { source: 'body', keys: ['email'] }
        });
      }

      body.password = await bcrypt.hash(body.password, 10);

      const [id] = await connection('user').insert({
        ...body,
        type: '3',
        created: new Date()
      });

      body.password = undefined;

      return res.status(200).json({
        user: { id, ...body, type: 3 },
        token: generateToken({ id, email, type: 3 })
      });
    } catch (err) {
      return res
        .status(400)
        .json({ statusCode: 400, error: 'Bad Request', message: err.message });
    }
  },
  authenticate: async (req: Request, res: Response): Promise<Response> => {
    const { password, email } = req.body;
    try {
      const userData = await connection('user').where({ email }).first();

      if (!userData) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'user not found',
          validation: { source: 'body', keys: ['email'] }
        });
      }

      if (!(await bcrypt.compare(password, userData.password))) {
        return res.status(403).json({
          statusCode: 403,
          error: 'Forbidden',
          message: 'access denied',
          validation: { source: 'body', keys: ['password'] }
        });
      }

      userData.password = undefined;

      return res.status(200).json({
        user: { ...userData },
        token: generateToken({
          id: userData.id,
          email: userData.email,
          type: userData.type
        })
      });
    } catch (err) {
      return res
        .status(400)
        .json({ statusCode: 400, error: 'Bad Request', message: err.message });
    }
  }
};
