import React from 'react'
import './ProfilePage.css';
import { BsFillPersonFill, BsFillHouseDoorFill } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';
import { FaPhone,FaBirthdayCake } from 'react-icons/fa';
export default class ProfilePage extends React.Component {

    render() {
        return (
            
            <div className = "profile-page">
                
                <div className = "profile-header">
                    <text className = "profile-title">Date personale</text>
                </div>

                <div className = "info">

                    <div className = "profile-name">
                        <BsFillPersonFill></BsFillPersonFill>
                        <text className = "name-info">{ localStorage.getItem("name") + " " + localStorage.getItem("surname")}</text>
                    </div>

                    <div className = "profile-mail">
                        <HiMail className = "mail-icon"></HiMail>
                        <text className="mail-info">{localStorage.getItem("mail")}</text>
                    </div>

                    <div className = "profile-phone">
                        <FaPhone className = "phone-icon"></FaPhone>
                        <text className = "phone-info">{localStorage.getItem("phone")}</text>
                    </div>

                    <div className = "profile-address">
                        <BsFillHouseDoorFill className = "address-icon"></BsFillHouseDoorFill>
                        <text className = "address-info">{localStorage.getItem("address")}</text>
                    </div>

                    <div className = "profile-birth">
                        <FaBirthdayCake className = "birth-icon"></FaBirthdayCake>
                        <text className="birth-info">{localStorage.getItem('birth')}</text>
                    </div>
                    


                </div>

            </div>
        )
    }


}