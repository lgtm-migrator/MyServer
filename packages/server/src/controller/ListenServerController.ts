import { Request, Response } from 'express';

export default {
    index: async (req: Request, res: Response) => {
        res.json({message: 'List Server'});
    },
    create: async (req: Request, res: Response) => {
        let body = req.body;

        res.json({message: 'Create Server', body});
    },
    edit: async (req: Request, res: Response) => {
        res.json({message: 'Edit Server'});
    },
    delete: async (req: Request, res: Response) => {
        res.json({message: 'Delete Server'});
    },
    auth: async (req: Request, res: Response) => {
        res.json({message: 'Auth Server'});
    },
    monit: async (req: Request, res: Response) => {
        res.json({message: 'Monit Server'})
    }
}