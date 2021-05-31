import React from 'react';
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChartLine, faUsersCog, faUserTie, faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { BiLogOut } from 'react-icons/bi';
import { BsFillPersonLinesFill } from 'react-icons/bs';

export default class Menu extends React.Component {


    constructor(props) {
        super(props);
    }

    removeUser() {
        localStorage.removeItem("user");
    }

    render() {
        return (

            <div className="Dashboard">
                <div className = "outer-container">
                    <div className = "sidebar-left">
                        <div className = "logo-dash">
                           
                        </div>
                        <ul className="menu">
                            <li><a href="/welcome"><FontAwesomeIcon  className = "ICON" icon={faHome} />Mainpage</a></li>
                            <li><a href = "/welcome/profile"><BsFillPersonLinesFill className = "ICON"></BsFillPersonLinesFill>Profil</a></li>
                            <li><a href="/welcome/grafice"><FontAwesomeIcon  className = "ICON" icon={faChartLine} /> Grafice</a></li>
                            <li><a href="/welcome/notificari"><FontAwesomeIcon  className = "ICON" icon={faBell} /> Notificări</a></li>
                            <li><a href = "/welcome/setari"><FontAwesomeIcon  className = "ICON" icon = {faCog}></FontAwesomeIcon>Setari</a></li>
                            <li><Link to="/" onClick={() => this.removeUser()}><BiLogOut  className = "ICON"></BiLogOut>Logout</Link></li>
                            
					    </ul>

                        
                    </div>

                    
                </div>

                
                
           </div>
        )
    }

}