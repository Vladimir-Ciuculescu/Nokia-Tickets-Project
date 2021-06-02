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

 

    constructor(props) {
      super(props);
      
      const name = localStorage.getItem("name");

      this.state = {
        row: [],
        toggleNotifications: true,
        ceva:"",
        NumberNotifications:null,
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
            
            this.setState({row:response.data});
          })
          .catch(function (error) {
          
          })
          .then(function () {

          });
          axios.get('http://localhost/NOKIA-entire-project/php/team4/number_notifications.php')
          .then( res =>{
            this.setState({NumberNotifications:res.data});
          })
          .catch(function (error) {
       
          })
          .then(function () {

          });
        
  }
  
  showNotificationsContainer = () =>  {
   
    
    /*
    variables.update({
					toggleNotifications:!this.state.toggleNotifications
    });
    */
    this.setState({ toggleNotifications: !this.state.toggleNotifications });
    this.props.SHOW(this.state.toggleNotifications);
    
  }

 
  render() {

    console.log(this.state.NumberNotifications);
        
        return (

            <div className="header-container">
                
                <div className = "account-section">

              
              
              <NotificationBadge
                className="notifications-number"
                count={this.state.NumberNotifications} 
              />
              <IoMdNotifications
                className="icon notification-icon"
                onClick={this.showNotificationsContainer}
              ></IoMdNotifications>
                    <div className = "name">
                      <text className="profile-name">{`${localStorage.getItem("name")} ${localStorage.getItem("surname")}`}</text>
                    </div>              
                    <CgProfile className = "icon profile-icon"></CgProfile>
                  
               
                    
                    
                   
                    

                       
                    </div>
                </div>

            
        )
    }
}