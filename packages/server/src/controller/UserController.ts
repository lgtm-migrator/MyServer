import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import connection from '../database/connection';
import generateToken from '../utils/generateToken';
import generateNumberCode from '../utils/generateNumberCode';

// Send email api
import SendEmail from '../utils/sendEmail';

export default {
  index: async (request: Request, response: Response): Promise<Response> => {
    const users = await connection('user');

    return response.json(users);
  },
  register: async (request: Request, response: Response): Promise<Response> => {
    const { body } = request;
    const { email } = body;
    try {
      if ((await connection('user').where({ email })).length !== 0) {
        return response.status(400).json({
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

      return response.status(200).json({
        user: { id, ...body, type: 3 },
        token: generateToken({ id, email, type: 3 })
      });
    } catch (err) {
      return response
        .status(400)
        .json({ statusCode: 400, error: 'Bad Request', message: err.message });
    }
  },
  authenticate: async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { password, email } = request.body;
    try {
      const userData = await connection('user').where({ email }).first();

      if (!userData) {
        return response.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'user not found',
          validation: { source: 'body', keys: ['email'] }
        });
      }

      if (!(await bcrypt.compare(password, userData.password))) {
        return response.status(403).json({
          statusCode: 403,
          error: 'Forbidden',
          message: 'access denied',
          validation: { source: 'body', keys: ['password'] }
        });
      }

      userData.password = undefined;

      return response.status(200).json({
        user: { ...userData },
        token: generateToken({
          id: userData.id,
          email: userData.email,
          type: userData.type
        })
      });
    } catch (err) {
      return response
        .status(400)
        .json({ statusCode: 400, error: 'Bad Request', message: err.message });
    }
  },
  getNewPassword: async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { type, access } = request.body;

    try {
      const userData = await connection('user')
        .where({ [type]: access })
        .first();

      if (!userData)
        return response.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: `user not found with this ${type}`,
          validation: { source: 'body', keys: ['access'] }
        });

      const token = await bcrypt.genSalt(10);
      const code = generateNumberCode(6);

      await connection('reset_password').where('idUser', userData.id).delete();

      await connection('reset_password').insert({
        idUser: userData.id,
        token,
        code: await bcrypt.hash(`${code}`, 10)
      });

      console.log('Email', code);

      const sendEmail = new SendEmail();
      sendEmail.noReplay({
        to: userData.email,
        subject: 'Recuperar Senha',
        html: `<p>Use o código <strong>${code}</strong> para redefinir a sua senha.<br/><a href="https://myserver.mh4sh.dev/password#!${token}">https://myserver.mh4sh.dev/password#!${token}</a></p>`,
        text: `Use o código ${code} para redefinir a sua senha. \n https://myserver.mh4sh.dev/password#!${token}`
      });

      return response.status(200).json({ statusCode: 200, token });
    } catch (err) {
      return response
        .status(400)
        .json({ statusCode: 400, error: 'Bad Request', message: err.message });
    }
  },
  setNewPassword: async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { token, code, password } = request.body;

    try {
      const resetPassword = await connection('reset_password')
        .where({ token })
        .first();

      if (!(await bcrypt.compare(`${code}`, resetPassword.code)))
        return response.status(403).json({
          statusCode: 403,
          error: 'Forbidden',
          message: 'Wrong code',
          validation: { source: 'body', keys: ['code'] }
        });

      const hash = await bcrypt.hash(password, 10);
      const trx = await connection.transaction();
      await trx('user').where('id', resetPassword.idUser).update({
        password: hash
      });

      const userData = await trx('user')
        .where('id', resetPassword.idUser)
        .first();

      await trx('reset_password')
        .where('idUser', resetPassword.idUser)
        .delete();

      await trx.commit();

      userData.password = undefined;

      return response.status(200).json({
        user: { ...userData },
        token: generateToken({
          id: userData.id,
          email: userData.email,
          type: userData.type
        })
      });
    } catch (err) {
      return response
        .status(400)
        .json({ statusCode: 400, error: 'Bad Request', message: err.message });
    }
  }
};
