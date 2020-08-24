import { Request, Response } from 'express';
import connection from '../database/connection';
import generateToken from '../utils/generateToken';


export default {
    index: async (req: Request, res: Response) => {
        let listServersListens = await connection('servers_listen')
            .select('id', 'name', 'endpoint', 'status');

        return res.json(listServersListens);
    },
    create: async (req: Request, res: Response) => {
        let { name, endpoint, token } = req.body;

        const [id] = await connection('servers_listen')
            .insert({
                name,
                endpoint,
                token,
                status: true
            });

        res.json({ id, name, endpoint, status: true });
    },
    edit: async (req: Request, res: Response) => {
        let { id } = req.params;
        let { name, endpoint, status } = req.body;

        await connection('servers_listen')
            .where({ id })
            .update({name, endpoint, status})

        res.json({name, endpoint, status});
    },
    delete: async (req: Request, res: Response) => {
        let { id } = req.params;

        await connection('servers_listen')
            .where({id})
            .delete();

        res.status(204).send();
    },
    auth: async (req: Request, res: Response) => {
        let { id } = req.params;

        let serverListen = await connection('servers_listen')
            .where({id})
            .first();

        let params = {
            type: 1
        }

        serverListen.token = generateToken(params, 3600, serverListen.token);

        res.json(serverListen);
    },
    monit: async (req: Request, res: Response) => {
        res.json({message: 'Monit Server'})
    }
}