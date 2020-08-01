import {Request, Response} from 'express';
import pm2, {ProcessDescription} from 'pm2';

import getProcess, {Process} from '../services/getProcess';

const ProcessController = {
    index: () => {
        return new Promise(async (resolve, reject)=> {
            let listProcess: Process[] = await getProcess() as Process[];

            resolve(listProcess);
        })
    },
    getItem: (processId: number) => {
        return new Promise(async (resolve, reject)=> {
            
            let listProcess: Process[] = await getProcess(processId) as Process[];

            resolve(listProcess[0]);
        })
    },
    monit: () => {
        return new Promise(async (resolve, reject)=> {
            let listProcess: Process[] = await getProcess() as Process[];

            resolve(listProcess.map(process => ({
                pm_id: process.pm_id,
                monit: process.monit,
                axm_monitor: process.axm_monitor,
                restart_time: process.restart_time,
                status: process.status
            })));
        })
    },
    monitItem: (processId: number) => {
        return new Promise(async (resolve, reject)=> {

            let process: Process[] = await getProcess(processId) as Process[];

            resolve({
                pm_id: process[0].pm_id,
                monit: process[0].monit,
                axm_monitor: process[0].axm_monitor,
                restart_time: process[0].restart_time,
                status: process[0].status
            });
        })
    },
    restart: (processId: number) => {
        return new Promise(async (resolve, reject)=> {

            pm2.restart(processId, (err, describe) => {
                if (err) {
                    resolve({});
                };
                resolve({processId});
            })
        })

    },
    start: (processId: number) => {
        return new Promise(async (resolve, reject)=> {

            pm2.restart(processId, (err, describe) => {
                if (err) {
                    resolve({});
                };
                resolve({processId});
            })
        })

    },
    stop: (processId: number) => {
        return new Promise(async (resolve, reject)=> {
    
            pm2.stop(processId, (err, describe) => {
                if (err) {
                    resolve({});
                };
                resolve({processId});
            })
        })

    },
}

export default ProcessController;

