import './RegisterPopup.css';
import React, {useState} from "react";
import Axios from  'axios';

function Popup(props) {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [repasswordReg, setRePasswordReg] = useState('');
    const [nameReg, setNameReg] = useState('');
    const [surnameReg, setSurnameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [telephoneReg, setTelephoneReg] = useState('');
    const [addressReg, setAddressReg] = useState('');
    const [birthReg, setBirthReg] = useState('');
    const [genderReg, setGenderReg] = useState('');

    //Variabile pentru mesajele de eroare

    const [NameError, SetNameError] = useState('');
    const [SurnameError, SetSurnameError] = useState('');
    const [EmailError, SetEmailError] = useState('');    
    const [TelephoneError, SetTelephoneError] = useState('');
    const [AddressError, SetAddressError] = useState('');
    const [BirthdateError, SetBirthDateError] = useState('');
    const [GenderError, SetGenderError] = useState('');
    const [UsernameError,SetUsernameError] = useState('');
    const [ParolaError, SetParolaError] = useState('');
    const [ReParolaError, SetReParolaError] = useState('');


    const register = () => {


        var check = true;

        //Nume eroare
        if (NameError == "") {
            SetNameError("Acest camp trebuie completat")
            check = false;

        }
        //Prenume eroare
        if (SurnameError == "") {
            SetSurnameError("Acest camp trebuie completat")
            check = false;
            
        }

        //Email eroare
        if (EmailError == "") {
            SetEmailError("Acest camp trebuie completat")
             check = false;
            
        }

        //Telefon eroare
        if (TelephoneError== "") {
            SetTelephoneError("Acest camp trebuie completat")
             check = false;
            
        }

        //Adresa eroare
        if (AddressError == "") {
            SetAddressError("Acest camp trebuie completat")
             check = false;
           
        }

        //Data de nastere eroare
        if (BirthdateError == "") {
            SetBirthDateError("Acest camp trebuie completat")
             check = false;
            
        }

        //Gen eroare
        if (GenderError == "") {
            SetGenderError("Acest camp trebuie completat")
             check = false;
            
        }

        //Username eroare
        if (usernameReg == "") {
            SetUsernameError("Acest camp trebuie completat")
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



        if(check){
            
      
              let parameters = new FormData();
        parameters.append('name',nameReg);
            parameters.append('surname',surnameReg);
          parameters.append('email',emailReg);
          parameters.append('telephone',telephoneReg);
          parameters.append('address',addressReg);
          parameters.append('username',usernameReg);
        parameters.append('password', passwordReg);
          parameters.append('birth',birthReg);
          parameters.append('gender',genderReg);
        Axios.post('http://localhost/nokia/register.php',
                parameters
            ).then((response) => {
            
            });
            
        }

      
      };

    function changeDisplay(e) {

        props.parentcallback(!props.displayProperty);
        SetNameError("");
        SetSurnameError("");
        SetEmailError("");
        SetTelephoneError("");
        SetAddressError("");
        SetBirthDateError("");
        SetGenderError("");
        SetUsernameError("");
        SetParolaError("");
        SetReParolaError("");
      }

      
    

return (
    <React.Fragment>
    {props.displayProperty && <div className="Popup1">
        <div id="overlay"></div>
        <div className="containerPop">
            <button className="closeButton" onClick={()=>{changeDisplay()}}>x</button>
        <h1>Registration</h1>
        
        <input type="text" placeholder="Name" className="box1" onChange={(e)=>{setNameReg(e.target.value);console.log(nameReg)}}></input>
                <text style={{ color: nameReg ? "white" : "red" }}>{NameError}</text>
        <input type="text" placeholder="Surname" className="box2" onChange={(e)=>{setSurnameReg(e.target.value);console.log(surnameReg)}}></input>
                <text style={{ color: surnameReg ? "white" : "red" }}>{SurnameError}</text>
        <input type="text" placeholder="E-mail" onChange={(e)=>{setEmailReg(e.target.value);console.log(emailReg)}}></input>
                <text style={{ color: emailReg ? "white" : "red" }}>{EmailError}</text>
                <input type="text" placeholder="Phone number" onChange={(e) => { setTelephoneReg(e.target.value); console.log(telephoneReg) }}></input>
                <text style={{ color: telephoneReg ? "white" : "red" }}>{TelephoneError}</text>
        <input type="text" placeholder="Address" onChange={(e)=>{setAddressReg(e.target.value);console.log(addressReg)}}></input>
                <text style={{ color: addressReg ? "white" : "red" }}>{AddressError}</text>
        <input type="date" placeholder="Name" className="box1" onChange={(e)=>{setBirthReg(e.target.value);console.log(birthReg)}}></input>
                <text style={{ color: birthReg ? "white" : "red" }}>{BirthdateError}</text>
        <input type="text" placeholder="Gender" className="box2" onChange={(e)=>{setGenderReg(e.target.value);console.log(genderReg)}}></input>
                <text style={{ color: genderReg ? "white" : "red" }}>{GenderError}</text>
                <input type="text" placeholder="Username" onChange={(e) => { setUsernameReg(e.target.value); console.log(usernameReg) }}></input>
                <text style={{ color: usernameReg ? "white" : "red" }}>{UsernameError}</text>
        <input type="password" placeholder="Password" onChange={(e)=>{setPasswordReg(e.target.value);console.log(passwordReg)}}></input>
                <text style={{ color: passwordReg ? "white" : "red" }}>{ParolaError}</text>
        <input type="text" placeholder="Confirm password" onChange = {(e) => {setRePasswordReg(e.target.value)}}></input>
                <text style={{ color: repasswordReg ? "white" : "red" }}>{ReParolaError}</text>
        <button  className="register" onClick={register}>Sign up</button>
        </div>
        
    </div>}
    </React.Fragment>
);
}

export default Popup;