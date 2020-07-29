import pm2, {ProcessDescription} from 'pm2';

interface Pm2Env {
    node_verion: string;
    versioning: string;
    version: string;
    node_version: string;
    unstable_restarts: string;
    restart_time: string;
    status: string;
    axm_monitor: string;
}

interface Monit {
    memory?: number,
    cpu?: number
}
export interface Process {
    pid?: number,
    status: string
    name?: string,
    node_version?: string,
    versioning?: string,
    version?: string,
    unstable_restarts?: string,
    restart_time?: string,
    pm_id?: number,
    monit?: Monit
    axm_monitor?: string
}

const getProcess = (processId: number | undefined = undefined) => {
    return new Promise((resolve, reject) => {
        if(processId){

            pm2.describe(processId, (err, describe: Array<ProcessDescription>) => {
                if (err) {
                    console.warn('PM2 list error', err);
                    reject(err);
                };

                const listProcess: Array<Process> = describe.map(process => {
    
                    const {pm_id, monit, pid, name} = process;
                    
    
                    if(process.pm2_env){
                        const {node_version, versioning, version, unstable_restarts, restart_time, status, axm_monitor} = (process.pm2_env as unknown) as Pm2Env;
                        return {pm_id, monit, pid, name, status, node_version, versioning, version, unstable_restarts, restart_time, axm_monitor};
                    } else {
                        return {pm_id, monit, pid, name, status};
                    }
                });
                
                resolve(listProcess);

            })
        } else {
            pm2.list((err, processDescriptionList: Array<ProcessDescription>) => {
                if (err) {
                    console.warn('PM2 list error', err);
                    reject(err);
                };
    
                const listProcess: Array<Process> = processDescriptionList.map(process => {
    
                    const {pm_id, monit, pid, name} = process;
                    
    
                    if(process.pm2_env){
                        const {node_version, versioning, version, unstable_restarts, restart_time, status, axm_monitor} = (process.pm2_env as unknown) as Pm2Env;
                        return {pm_id, monit, pid, name, status, node_version, versioning, version, unstable_restarts, restart_time, axm_monitor};
                    } else {
                        return {pm_id, monit, pid, name, status};
                    }
                });
                
                resolve(listProcess);
            });
        }
    })
};

export default getProcess;