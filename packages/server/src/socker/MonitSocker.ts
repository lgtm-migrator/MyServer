import {Server} from "http";
import MonitController from '../controllers/MonitController';
import socketio, { Socket } from "socket.io";

const MonitSocker = (server: Server) => {
    const io = socketio.listen(server, {
        path: '/socket/monit'
    });

    console.log('Started monit listening!');

    io.on("connection", function(socket: any) {
        let monitInterval: any;

        console.info(`Client entrou [id=${socket.id}]`);
        
        socket.on("disconnect", () => {
            clearInterval(monitInterval);
            console.info(`Client saiu [id=${socket.id}]`);
        });

        socket.on("monit:item", async function(processId: number, timestamp: number = 1000) {
            clearInterval(monitInterval);
            monitInterval = setInterval(async ()=>{
                socket.emit("monit:item", await MonitController.item(processId));
            }, timestamp);
        });

        socket.on("monit:cpu", async function(processId: number, timestamp: number = 1000) {
            clearInterval(monitInterval);
            monitInterval = setInterval(async ()=>{
                socket.emit("monit:cpu", await MonitController.cpu(processId));
            }, timestamp);
        });

        socket.on("monit:memory", async function(processId: number, timestamp: number = 1000) {
            clearInterval(monitInterval);
            monitInterval = setInterval(async ()=>{
                socket.emit("monit:memory", await MonitController.memory(processId));
            }, timestamp);
        });

        socket.on("monit:heap", async function(processId: number, timestamp: number = 1000) {
            clearInterval(monitInterval);
            monitInterval = setInterval(async ()=>{
                socket.emit("monit:heap", await MonitController.heap(processId));
            }, timestamp);
        });

        socket.on("monit:active", async function(processId: number, timestamp: number = 1000) {
            clearInterval(monitInterval);
            monitInterval = setInterval(async ()=>{
                socket.emit("monit:active", await MonitController.active(processId));
            }, timestamp);
        });

        socket.on("monit:eventLoop", async function(processId: number, timestamp: number = 1000) {
            clearInterval(monitInterval);
            monitInterval = setInterval(async ()=>{
                socket.emit("monit:eventLoop", await MonitController.eventLoop(processId));
            }, timestamp);
        });

        socket.on("monit:http", async function(processId: number, timestamp: number = 1000) {
            clearInterval(monitInterval);
            monitInterval = setInterval(async ()=>{
                socket.emit("monit:http", await MonitController.http(processId));
            }, timestamp);
        });

    });
}


export default MonitSocker;