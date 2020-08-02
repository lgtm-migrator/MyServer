

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

function uptime(timestamp: number){
    let seconds = Math.trunc((new Date().getTime() - timestamp)/1000);

    if(seconds<60){
        return `${seconds}s`;
    } else if(seconds>60 && seconds<3600){
        return `${Math.trunc(seconds/60)}m`;
    } else if(seconds>3600 && seconds<86400){
        let hora = Math.trunc(seconds/3600);
        return `${hora}h`;
    } else {
        let days = Math.trunc(seconds/86400);
        return `${days}D`;
    }
}

let ulProcess = document.querySelector('ul');

const App = {
    list: async (processes: Process[]) => {
        let template: string = '';

        for await (let process of processes){
            template += `<li><span>${process.pm_id} | ${process.name} - ${process.version} - ${process.pid} - ${uptime(process.pm_uptime)} - ${process.status==='online' ? '<span style="background: green">online</span>' : `<span style="background: red">${process.status}</span>`} - ${process.monit.cpu}% - ${Math.round((((process.monit.memory)/1012)/1012)*10)/10}mb 
            - ${process.status==='online'? `<a href="#"  onclick="stop(${process.pm_id})">Stop<a>`: `<a href="#" onclick="start(${process.pm_id})">Start<a>`} - <a href="#" onclick="restart(${process.pm_id})">Restart<a> - <a href="#" onclick="deleteProcess(${process.pm_id})">Delete<a></span>
            `;
        }
        if(ulProcess){
            ulProcess.innerHTML = template;
        }
    }
}

module.exports = App;