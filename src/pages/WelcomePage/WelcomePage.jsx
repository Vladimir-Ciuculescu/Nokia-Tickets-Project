import React from 'react';
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";

import './WelcomePage.css';
import SettingsPage from '../SettingsPage/SettingsPage';
import NotificationsPage from '../NotificationsPage/NotificationsPage';
import Graphs from '../Graphs/Graphs'
import NotificationsContainer from '../../components/NotificationsContainer/NotificationsContainer';

export default class WelcomePage extends React.Component {


    constructor(props) {
        super(props);

        const token = localStorage.getItem("user");

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }

        this.state = {
            loggedIn:loggedIn,
        }
        
    }

    

    render() {

        if (this.state.loggedIn === false) {
            return <Redirect to ="/" />
        }

        return (


            
            <div className = "welcome-page-container">
                    
                        <Menu></Menu>
                        <Header></Header>
                        <NotificationsContainer></NotificationsContainer>
               
                    
                
               

                <BrowserRouter>
                    <Switch>
                        <Route path = "/welcome/notificari" component = {NotificationsPage}></Route>
                        <Route path="/welcome/setari" component={SettingsPage} />
                        <Route path ="/welcome/grafice" component = {Graphs} />
                    </Switch>
                </BrowserRouter>

            </div>
                

            
        )
    }
}