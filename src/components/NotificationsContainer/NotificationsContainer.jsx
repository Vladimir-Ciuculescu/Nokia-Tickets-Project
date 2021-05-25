import React from 'react';
import './NotificationsContainer.css';
import fb from '../../Firebase.js';
import firestore from '@firebase/firestore';
import axios from 'axios';
import { AiFillCloseCircle,AiFillWarning,AiFillInfoCircle } from 'react-icons/ai';

var variables = fb
	.firestore()
	.collection("NOKIA")
	.doc('variables');

export default class NotificationsContainer extends React.Component {


    state = {
        toggleNotifications: false,
        row:[],
    }

    constructor(props) {
        super(props);

         variables.onSnapshot(doc => {
        this.setState({
          toggleNotifications:doc.data().toggleNotifications
        })
      })
    }

    componentDidMount()
    {

         axios.get('http://localhost/nokia/citeste_notificare.php')
          .then( response =>{
            console.log(response);
            this.setState({row:response.data});
          })
          .catch(function (error) {
          console.log(error);
          })
          .then(function () {

          });
    }

    renderNotifications() {
        
        return this.state.row.map((item) => {

            switch (item.MESAJ) {
                
                case "A fost creat un ticket nou de prioritate 0":
                    
                    return (
                        <div className = "notification-item">
                            <AiFillCloseCircle className = "Icon danger-icon"></AiFillCloseCircle>
                            <text>{item.MESAJ}</text>
                        </div>
                    )
                    break;
                case "A fost creat un ticket nou de prioritate 1":

                    return (
                        <div className = "notification-item">
                            <AiFillWarning className = "Icon warning-icon"></AiFillWarning>
                            <text>{item.MESAJ}</text>
                        </div>
                    )
                    break;
                case "A fost creat un ticket nou de prioritate 2":

                    return (
                        <div className = "notification-item">
                            <AiFillInfoCircle className = "Icon info-icon"></AiFillInfoCircle>
                            <text>{item.MESAJ}</text>
                        </div>
                    )
                    break;
                
                case "A fost creat un ticket nou de prioritate 3":

                    return (
                        <div className = "notification-item">
                            <AiFillInfoCircle className = "Icon info-icon"></AiFillInfoCircle>
                            <text>{item.MESAJ}</text>
                        </div>
                    )
                    break;
                
            }
        })
    }

    render() {
        return (
            
            <div style = {{display:this.state.toggleNotifications ? "block": "none"}} className = "notifications-container">
               
                <div className="notifications-Header">
                    <text onClick = {() => console.log(this.state.row)}>Notificari</text>
                </div>

                <div className = "horizontal-line"></div>

                <div className = "notifications-list">

                    {this.renderNotifications()}
                    
                </div>

           </div>
        )
    }

}