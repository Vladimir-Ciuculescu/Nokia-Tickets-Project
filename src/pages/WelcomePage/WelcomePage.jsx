import React from 'react';
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import { store } from 'react-notifications-component';
import './WelcomePage.css';
import SettingsPage from '../SettingsPage/SettingsPage';
import NotificationsPage from '../NotificationsPage/NotificationsPage';
import Graphs from '../Graphs/Graphs'
import NotificationsContainer from '../../components/NotificationsContainer/NotificationsContainer';
import MainPage from '../MainPage/MainPage';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import axios from 'axios';

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
            showNotifications:false,
           
        }
        
    }

   

   

    showNotificationsContainer = (data) => {
        
        this.setState({ showNotifications: data });
        
    }

    render() {

       

        setInterval(function () {
            
            axios.get('http://localhost/NOKIA-entire-project/php/team4/getLastNotification.php')
                .then(response => {

                    var durata = Math.floor(response.data / 10);
                    
                    var priority = response.data % 10;
                    
                    
                    if (Number.isInteger(durata)) {
                        if (priority === 0) {
                            {
                        
                         store.addNotification({
                            title: "Avertisment",
                            message: "S-a adaugat un ticket de prioritate 0",
                            type: 'danger',
                            container: 'top-center',
                            insert: 'bottom',
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "zoomOut"],
                        
                            dismiss: {
                                duration: 3000,
                                showIcon:true,
            }
            })
                    }
                        }
                        else if (priority === 1) {
                            {
                        console.log("Prioritate"+priority);
                         store.addNotification({
                            title: "Avertisment",
                            message: "S-a adaugat un ticket de prioritate 1",
                            type: 'warning',
                            container: 'top-center',
                            insert: 'bottom',
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "zoomOut"],
                        
                            dismiss: {
                                duration: 3000,
                                showIcon:true,
            }
            })
                    }
                        }
                        else if (priority === 2) {
                            {
                        console.log("Prioritate"+priority);
                         store.addNotification({
                            title: "Avertisment",
                            message: "S-a adaugat un ticket de prioritate 2",
                            type: 'info',
                            container: 'top-center',
                            insert: 'bottom',
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "zoomOut"],
                        
                            dismiss: {
                                duration: 3000,
                                showIcon:true,
            }
            })
                    }
                        }
                        else if (priority === 3) {
                            {
                        console.log("Prioritate"+priority);
                         store.addNotification({
                            title: "Avertisment",
                            message: "S-a adaugat un ticket de prioritate 3",
                            type: 'info',
                            container: 'top-center',
                            insert: 'bottom',
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "zoomOut"],
                        
                            dismiss: {
                                duration: 3000,
                                showIcon:true,
            }
            })
                    }
                        }
                         else if (priority === 4) {
                            {
                        console.log("Prioritate"+priority);
                         store.addNotification({
                             title: "Success",
                            message: "Un utilizator s-a autentifat cu succes!",
                            type: 'success',
                            container: 'top-center',
                            insert: 'bottom',
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "zoomOut"],
                        
                            dismiss: {
                                duration: 3000,
                                showIcon:true,
            }
            })
                    }
                        }
                    }
                    
                })

        },10000)

       

        if (this.state.loggedIn === false) {
            return <Redirect to ="/" />
        }

        return (


            
            
            <div className = "welcome-page-container">
                    
                        <Menu></Menu>
                        <Header SHOW = {this.showNotificationsContainer}></Header>
                        <NotificationsContainer showNotifications = {this.state.showNotifications}></NotificationsContainer>
                        <MainPage></MainPage>
               
                        <ReactNotification></ReactNotification>
                
               

                <BrowserRouter>
                    <Switch>
                        
                        <Route path="/welcome/mainpage" component={MainPage}></Route>
                        <Route path = "/welcome/notificari" component = {NotificationsPage}></Route>
                        <Route path="/welcome/setari" component={SettingsPage} />
                        <Route path ="/welcome/grafice" component = {Graphs} />
                    </Switch>
                </BrowserRouter>

            </div>
                

            
        )
    }
}