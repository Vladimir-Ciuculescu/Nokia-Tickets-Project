import React from 'react';
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChartLine, faUsersCog, faUserTie, faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { BiLogOut } from 'react-icons/bs';

export default class Menu extends React.Component {


    render() {
        return (

            <div className="Dashboard">
                <div className = "outer-container">
                    <div className = "sidebar-left">
                        <div className = "logo-dash" style={{ background: `url(${process.env.PUBLIC_URL}/logo.png`, "background-size": "cover" }}>
                           
                        </div>
                        <ul className="menu">
                            <li><a href="/welcome"><FontAwesomeIcon icon={faHome} /> Home</a></li>
                            <li><a href="/welcome/grafice"><FontAwesomeIcon icon={faChartLine} /> Grafice</a></li>
                            <li><a href="/welcome/notificari"><FontAwesomeIcon icon={faBell} /> Notificări</a></li>
                            <li><a href = "/welcome/setari"><FontAwesomeIcon icon = {faCog}></FontAwesomeIcon> Setari</a></li>
					    </ul>
                    </div>
                </div>

                
                
           </div>
        )
    }

}