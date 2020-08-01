import {Server} from "http";
import socketio from "socket.io";

const MonitSocker = (server: Server) => {
    const io = socketio.listen(server, {
        path: '/socket/monit'
    });

    console.log('Started monit listening!');

    io.on("connection", function(socket: any) {
        console.log("a user connected on monit");        
    });
}


export default MonitSocker;