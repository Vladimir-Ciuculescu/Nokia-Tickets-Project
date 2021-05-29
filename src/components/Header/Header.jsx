import React from 'react';
import './Header.css';
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from 'react-icons/cg';
import { BsFillXCircleFill,BsFillInfoCircleFill } from 'react-icons/bs'
import { AiFillWarning } from 'react-icons/ai';
import axios from 'axios';
import NotificationsContainer from '../NotificationsContainer/NotificationsContainer';
import fb from '../../Firebase.js';
import firestore from '@firebase/firestore';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { name} from '../../pages/HomePage/HomePage';

var variables = fb
	.firestore()
	.collection("NOKIA")
	.doc('variables');

var nume;

export default class Header extends React.Component {

  /*
  state = {
    row: [],
    toggleNotifications: false,
    nume: localStorage.getItem('name'),
    prenume: localStorage.getItem('surname'),
      
    }
    */

    constructor(props) {
      super(props);
      
      const name = localStorage.getItem("name");

    this.state = {
    row: [],
    toggleNotifications: false,
      
    }

      variables.onSnapshot(doc => {
        this.setState({
          toggleNotifications:doc.data().toggleNotifications
        })
      })
      
    
  }
  
    componentDidMount()
    {
        axios.get('http://localhost/react-php/citeste_notificare.php')
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
  
  showNotificationsContainer() {
   
    
    
    variables.update({
					toggleNotifications:!this.state.toggleNotifications
				});
  }

 
  render() {
      
   

    console.log(localStorage);

        
        return (

            <div className="header-container">
                
                <div className = "account-section">

              
              
                    <NotificationBadge className ="notifications-number" count={4} /><IoMdNotifications className = "icon notification-icon" onClick = {() => this.showNotificationsContainer()}></IoMdNotifications>
                    <text className="profile-name">{`${localStorage.getItem("name")} ${localStorage.getItem("surname")}`}</text>
              
                    <CgProfile className = "icon profile-icon"></CgProfile>
                  
               
                    
                    
                   
                    

                       
                    </div>
                </div>

            
        )
    }
}