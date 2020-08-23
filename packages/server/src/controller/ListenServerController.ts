import { Request, Response } from 'express';
import connection from '../database/connection';

export default {
    index: async (req: Request, res: Response) => {
        let listServersListens = await connection('servers_listen');
        res.json(listServersListens);
    },
    create: async (req: Request, res: Response) => {
        let { name, endpoint, token } = req.body;

        const [id] = await connection('servers_listen')
            .insert({
                name,
                endpoint,
                token
            });

        res.json({ id, name, endpoint, status: true });
    },
    edit: async (req: Request, res: Response) => {
        res.json({message: 'Edit Server'});
    },
    delete: async (req: Request, res: Response) => {
        let { id } = req.params;
        await connection('servers_listen')
            .where({id})
            .delete();

        res.status(204).send();
    },
    auth: async (req: Request, res: Response) => {
        res.json({message: 'Auth Server'});
    },
    monit: async (req: Request, res: Response) => {
        res.json({message: 'Monit Server'})
    }
}