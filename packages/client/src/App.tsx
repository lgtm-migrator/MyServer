import React, {useState} from 'react';
import './App.css';

import Navbar from './components/Navbar';


import Login from './view/Login';


import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

interface RouteProps {
    location: {
        pathname: string;
    };
}

function App(){

    const [progressBar, setProgressBar] = useState({ loading: false, position: '20%'})

    async function componentDidMount(){
        //await AltenticarService.login({mail: 'marcon@mh4sh.dev', pass: 'asd'});
    }

    return (
        <div className="App">
            <Router>
                <Route path={'/'} component={(props: RouteProps) => <Navbar {...props} progressBar={progressBar.position} />} />
            
                <Switch>
                    <Route path={'/login/'} exact component={() => <Login />} />
                    {/* <Route path={'/servidor/'} component={(props) => <Servers {...props} />} />
                    <Route path={'/servidores/'} component={(props) => <Servers {...props} />} />
                    <Route path={'/nodequery/'} component={(props) => <NodeQuery {...props} />}  /> */}
                </Switch>
            </Router>
        </div>
    );
}

export default App;