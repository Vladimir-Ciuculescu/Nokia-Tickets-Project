import './ForgotPassword.css';
import React, {useState} from "react";
import Axios from  'axios';


function ForgotPassword(props) {

    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [repasswordReg, setRePasswordReg] = useState('');

    const [EmailError, SetEmailError] = useState(''); 
    const [ParolaError, SetParolaError] = useState('');
    const [ReParolaError, SetReParolaError] = useState('');
    
    const changePassword = () => {


        var check = true;

        //Email eroare
        if (EmailError == "") {
            SetEmailError("Acest camp trebuie completat")
             check = false;
            
        }
   
        //Parola eroare
        if (ParolaError == "") {
            SetParolaError("Acest camp trebuie completat")
             check = false;
            
        }

        //Reparola eroare
        if (ReParolaError == "") {
            SetReParolaError("Acest camp trebuie completat")
             check = false;
            
        }
    }

    function changeDisplay(e) {

        props.parentcallback(!props.displayProperty);
        SetEmailError("");
        SetParolaError("");
        SetReParolaError("");
      }

return (
    <React.Fragment>
    {props.displayProperty && <div className="ForgotPassword1">
        <div id="overlay"></div>
        <div className="containerForgotPassword">
            <button className="closeButton" onClick={()=>{changeDisplay()}}>x</button>
        <h1>Change Password</h1>
        
        <input type="text" placeholder="E-mail" onChange={(e)=>{setEmailReg(e.target.value);console.log(emailReg)}}></input>
                <text style={{ color: emailReg ? "white" : "red" }}>{EmailError}</text>
    
        <input type="password" placeholder="New Password" onChange={(e)=>{setPasswordReg(e.target.value);console.log(passwordReg)}}></input>
                <text style={{ color: passwordReg ? "white" : "red" }}>{ParolaError}</text>
        <input type="text" placeholder="Confirm new password" onChange = {(e) => {setRePasswordReg(e.target.value)}}></input>
                <text style={{ color: repasswordReg ? "white" : "red" }}>{ReParolaError}</text>
        <button  className="changePassword" onClick={changePassword}>Change Password</button>
        </div>
        
    </div>}
    </React.Fragment>
);
}

export default ForgotPassword;