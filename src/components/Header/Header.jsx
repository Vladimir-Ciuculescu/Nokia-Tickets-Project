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

var variables = fb
	.firestore()
	.collection("NOKIA")
	.doc('variables');



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

    this.state = {
    row: [],
    toggleNotifications: false,
      nume:localStorage.getItem('name'),
    //nume: localStorage.getItem('name'),
      prenume: localStorage.getItem('surname'),
      
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
      

        
        return (

            <div className="header-container">
                
                <div className = "account-section">

              
              
                    <IoMdNotifications className = "icon notification-icon" onClick = {() => this.showNotificationsContainer()}></IoMdNotifications>
              <text className="profile-name">{this.state.prenume +  " " +this.state.nume}</text>
                    <CgProfile className = "icon profile-icon"></CgProfile>
                    
                   
                    

                       
                    </div>
                </div>

            
        )
    }
}