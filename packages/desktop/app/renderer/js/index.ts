

interface Monit {
    memory: number,
    cpu: number
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
    monit: Monit,
    axm_monitor?: string,
    pm_uptime: number
}

let ulProcess = document.querySelector('ul');

const listProcess = {
    start: async () => {
        let processes: Process[] = await fetch('http://localhost:55000/process')
            .then((response => response.json()));

        let template: string = '';
        
        for await (let process of processes){
            template += `<li><span>${process.pm_id} | ${process.name} - ${process.version} - ${process.pid} - ${Math.round((new Date().getTime() - process.pm_uptime)/60000)}m - ${process.status} - ${process.monit.cpu}% - ${Math.round((((process.monit.memory)/1012)/1012)*10)/10}mb 
            - ${process.status==='online'? '<a href="#">Stop<a>': '<a href="#">Start<a>'} - <a href="#">Restart<a></span>
            `;
        }
        if(ulProcess){
            ulProcess.innerHTML = template;
        }
    }
}

export default listProcess;