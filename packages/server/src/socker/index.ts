import {Server} from "http";

import ProcessSocker from './ProcessSocker';
import MonitSocker from './MonitSocker';

const socker = (server: Server) => {
    ProcessSocker(server);
    MonitSocker(server);
}

export default socker;