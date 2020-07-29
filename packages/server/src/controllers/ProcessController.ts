import {Request, Response} from 'express';
import pm2, {ProcessDescription} from 'pm2';

import getProcess, {Process} from '../services/getProcess';

const ProcessController = {
    index: async (req: Request, res: Response) => {
        
        let listProcess: Process[] = await getProcess() as Process[];

        return res.status(200).json(listProcess);
    },
    getItem: async (req: Request, res: Response) => {

        let processId: number = parseInt(req.params.id);
        
        let listProcess: Process[] = await getProcess(processId) as Process[];

        return res.status(200).json(listProcess[0]);
    },
    monit: async (req: Request, res: Response) => {
        
        let listProcess: Process[] = await getProcess() as Process[];

        return res.status(200).json(listProcess.map(process => ({
            pm_id: process.pm_id,
            monit: process.monit,
            axm_monitor: process.axm_monitor,
            restart_time: process.restart_time,
            status: process.status
        })));
    },
    monitItem: async (req: Request, res: Response) => {
        
        let processId: number = parseInt(req.params.id);

        let process: Process[] = await getProcess(processId) as Process[];

        return res.status(200).json({
            pm_id: process[0].pm_id,
            monit: process[0].monit,
            axm_monitor: process[0].axm_monitor,
            restart_time: process[0].restart_time,
            status: process[0].status
        });
    },
    restart: async (req: Request, res: Response) => {
        
        let processId: number = parseInt(req.params.id);

        pm2.restart(processId, (err, describe) => {
            if (err) {
                console.warn('PM2 list error', err);
                return res.status(401).json({});
            };
            return res.status(200).json({processId});
        })

    },
    start: async (req: Request, res: Response) => {
        
        let processId: number = parseInt(req.params.id);

        pm2.restart(processId, (err, describe) => {
            if (err) {
                console.warn('PM2 list error', err);
                return res.status(401).json({});
            };
            return res.status(200).json({processId});
        })

    },
    stop: async (req: Request, res: Response) => {
        
        let processId: number = parseInt(req.params.id);

        pm2.stop(processId, (err, describe) => {
            if (err) {
                console.warn('PM2 list error', err);
                return res.status(401).json({});
            };
            return res.status(200).json({processId});
        })

    },
}

export default ProcessController;

