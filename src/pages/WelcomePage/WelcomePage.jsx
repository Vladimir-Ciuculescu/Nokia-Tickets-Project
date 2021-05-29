import React from 'react';
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";

import './WelcomePage.css';
import SettingsPage from '../SettingsPage/SettingsPage';
import NotificationsPage from '../NotificationsPage/NotificationsPage';
import Graphs from '../Graphs/Graphs'
import NotificationsContainer from '../../components/NotificationsContainer/NotificationsContainer';
import MainPage from '../MainPage/MainPage';


export default class WelcomePage extends React.Component {


    constructor(props) {
        super(props);

        const token = localStorage.getItem("user");
        

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }

        this.state = {
            loggedIn: loggedIn,
           
        }
        
    }

    componentDidUpdate() {
        
        this.setState({ name: this.props.name });
    }

    render() {

        console.log(this.props.name);

        if (this.state.loggedIn === false) {
            return <Redirect to ="/" />
        }

        return (


            
            
            <div className = "welcome-page-container">
                    
                        <Menu></Menu>
                        <Header></Header>
                        <NotificationsContainer></NotificationsContainer>
                        <MainPage></MainPage>
               
                    
                
               

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