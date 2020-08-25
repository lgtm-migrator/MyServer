import React from 'react';
import logo from '../alexa.svg';

import {Link, useHistory} from 'react-router-dom';


interface NavbarProps {
    progressBar: string;
    location: {
        pathname: string;
    };
}

const Navbar: React.FunctionComponent<NavbarProps> = ({location: {pathname}}) => {
    let history = useHistory();

    function handleClick() {
        history.push("/login/");
    }


    if(pathname.startsWith('/login/') || pathname.startsWith('/register/'))
        return <></>;  

    return (
        <div className="container-fluid bg-dark shadow-sm">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
                    <Link to={"/"}>
                        <img src={logo} alt="Meu Servidor" width="30" height="30" />
                    </Link>
                    
                    <div className="navbar p-0" id="navbarNav">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className={pathname==='/' ? "nav-item active" : "nav-item"}>
                                <Link to={"/"} className="nav-link">Inicio</Link>
                            </li>
                            <li className={pathname.startsWith('/server-listen') ? "nav-item active" : "nav-item"}>
                                <Link to={"/server-listen/"} className="nav-link">Servers PM2</Link>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0 pt-2 pb-2">
                            <Link className="btn btn-outline-info my-2 my-sm-0 btn-sm" to="/servidor/adicionar/">Adicionar Servidor</Link>
                            <button className="btn btn-outline-danger my-2 my-sm-0 ml-2 btn-sm" onClick={handleClick}>Sair</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
