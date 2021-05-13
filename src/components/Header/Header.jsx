import { render } from '@testing-library/react';
import React from 'react';
import './Header.css';
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from 'react-icons/cg';
import { BsFillXCircleFill,BsFillInfoCircleFill } from 'react-icons/bs'
import { AiFillWarning } from 'react-icons/ai';
import axios from 'axios';

export default class Header extends React.Component {


    constructor(props) {
    super(props);

    this.state = {
      row: [],
      toggleNotifications:false,
    }
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

    render() {
        
        return (

            <div className="header-container">
                
                <div className = "account-section">
                    
                    <IoMdNotifications className = "icon notification-icon"></IoMdNotifications>
                    <text className = "profile-name">John Doe</text>
                    <CgProfile className = "icon profile-icon"></CgProfile>
                    
                    
                    

                       
                    </div>
                </div>

            
        )
    }
}