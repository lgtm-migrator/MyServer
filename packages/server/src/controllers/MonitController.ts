import getProcess, {Process} from '../services/getProcess';

const MonitController = {
    item: (processId: number) => {
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
    cpu: (processId: number) => {
        return new Promise(async (resolve, reject)=> {

            let process: Process[] = await getProcess(processId) as Process[];

            resolve({
                pm_id: process[0].pm_id,
                cpu: process[0].monit?.cpu,
            });
        })
    },
    memory: (processId: number) => {
        return new Promise(async (resolve, reject)=> {

            let process: Process[] = await getProcess(processId) as Process[];

            resolve({
                pm_id: process[0].pm_id,
                memory: process[0].monit?.memory,
            });
        })
    },
    heap: (processId: number) => {
        return new Promise(async (resolve, reject)=> {

            let process: Process[] = await getProcess(processId) as Process[];

            resolve({
                pm_id: process[0].pm_id,
                size: process[0].axm_monitor?.["Heap Size"],
                usage: process[0].axm_monitor?.["Heap Usage"],
                usedSize: process[0].axm_monitor?.["Used Heap Size"]
            });
        })
    },
    active: (processId: number) => {
        return new Promise(async (resolve, reject)=> {

            let process: Process[] = await getProcess(processId) as Process[];

            resolve({
                pm_id: process[0].pm_id,
                handles: process[0].axm_monitor?.["Active handles"],
                requests: process[0].axm_monitor?.["Active requests"]
            });
        })
    },
    eventLoop: (processId: number) => {
        return new Promise(async (resolve, reject)=> {

            let process: Process[] = await getProcess(processId) as Process[];

            resolve({
                pm_id: process[0].pm_id,
                p95Latency: process[0].axm_monitor?.["Event Loop Latency p95"],
                latency: process[0].axm_monitor?.["Event Loop Latency"]
            });
        })
    },
    http: (processId: number) => {
        return new Promise(async (resolve, reject)=> {

            let process: Process[] = await getProcess(processId) as Process[];

            resolve({
                pm_id: process[0].pm_id,
                meanLatency: process[0].axm_monitor?.["HTTP Mean Latency"],
                p95Latency: process[0].axm_monitor?.["HTTP P95 Latency"],
                http: process[0].axm_monitor?.HTTP
            });
        })
    }
}

export default MonitController;

