import { Request, Response } from 'express';
import connection from '../database/connection';
import { generateTokenListen } from '../utils/generateToken';

export default {
  index: async (req: Request, res: Response): Promise<Response> => {
    const listServersListens = await connection('servers_listen').select(
      'id',
      'name',
      'endpoint',
      'status'
    );

    return res.json(listServersListens);
  },
  create: async (req: Request, res: Response): Promise<Response> => {
    const { name, endpoint, token } = req.body;

    const [id] = await connection('servers_listen').insert({
      name,
      endpoint,
      token,
      status: true
    });

    return res.json({ id, name, endpoint, status: true });
  },
  edit: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, endpoint, status } = req.body;

    await connection('servers_listen')
      .where({ id })
      .update({ name, endpoint, status });

    return res.json({ name, endpoint, status });
  },
  delete: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    await connection('servers_listen').where({ id }).delete();

    return res.status(204).send();
  },
  auth: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const serverListen = await connection('servers_listen')
      .where({ id })
      .first();

    const params = {
      type: 1
    };

    serverListen.token = generateTokenListen(params, 3600, serverListen.token);

    return res.json(serverListen);
  },
  monit: async (req: Request, res: Response): Promise<Response> => {
    return res.json({ message: 'Monit Server' });
  }
};
