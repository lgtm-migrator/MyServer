import {Server} from "http";
import ProcessController from '../controllers/ProcessController';
import socketio from "socket.io";
//https://medium.com/swlh/socket-io-games-the-right-way-using-nodejs-and-react-not-a-chat-app-part-1-e7a49d2f3f51
const ProcessSocker = (server: Server) => {
    const io = socketio.listen(server, {
        path: '/socket/process'
    });

    console.log('Started listening!');

    io.on("connection", function(socket: any) {

        console.log("a user connected");

        let update = setInterval(async ()=>{
            socket.emit("process:list", await ProcessController.index());
        }, 30000);


        socket.on("process:setTime", function(message: any) {

            clearInterval(update);
            update = setInterval(async ()=>{
                socket.emit("process:list", await ProcessController.index());
            }, message*1000);

        })


        socket.on("process:start", async function(message: any) {
            console.log(message);
            socket.emit("process:start", await ProcessController.start(message));
            socket.broadcast.emit("process:list", await ProcessController.index());
            socket.emit("process:list", await ProcessController.index());
        });
        socket.on("process:stop", async function(message: any) {
            console.log(message);
            socket.emit("process:stop", await ProcessController.stop(message));
            socket.broadcast.emit("process:list", await ProcessController.index());
            socket.emit("process:list", await ProcessController.index());
        });
        socket.on("process:restart", async function(message: any) {
            console.log(message);
            socket.emit("process:restart", await ProcessController.restart(message));
            socket.broadcast.emit("process:list", await ProcessController.index());
            socket.emit("process:list", await ProcessController.index());
        });
        socket.on("process:list", async function(message: any) {
            console.log(message);
            socket.emit("process:list", await ProcessController.index());
        });
    });
}


export default ProcessSocker;