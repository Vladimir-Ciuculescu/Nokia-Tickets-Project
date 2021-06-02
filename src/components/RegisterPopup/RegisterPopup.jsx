import './RegisterPopup.css';
import React, {useState} from "react";
import Axios from  'axios';
import axios from 'axios';
import Select from 'react-select';

const options = [
    { value: 'M', label: 'M' },
    { value: 'F', label: 'F' },
   
];
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
    const [GenderError, SetGenderError] = useState('gol');
    const [UsernameError,SetUsernameError] = useState('');
    const [ParolaError, SetParolaError] = useState('');
    const [ReParolaError, SetReParolaError] = useState('');
    const [culoare, setCuloare] = useState('white');


    const register = () => {


        var check = true;

        //Validare nume
        if (nameReg == "") {
            SetNameError("* Acest camp trebuie completat!");
            check = false;
        } else if (nameReg != "") {
            if ((/^([a-zA-Z]{3,})$/).test(nameReg) === false) {
                check = false;
                SetNameError("* Nume invalid!");
            }
            else if ((/^([a-zA-Z]{3,})$/).test(nameReg)) {
                SetNameError("");
            }
        }

        //Validare prenume
        if (surnameReg == "") {
            SetSurnameError("* Acest camp trebuie completat!");
            check = false;
        } else if (surnameReg != "") {
            if ((/^([a-zA-Z]{3,})$/).test(surnameReg) === false) {
                check = false;
                SetSurnameError("* Prenume invalid!");
            }
            else if ((/^([a-zA-Z]{3,})$/).test(surnameReg)) {
                SetSurnameError("");
            }
        }

        //Validare email
        
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


        if (emailReg == "") {
            SetEmailError("* Emailul nu poate fi gol !");
            check = false;
        } else if (emailReg != "") {
            if (emailRegex.test(emailReg) === false) {
                check = false;
                SetEmailError("Email invalid");
            }
            else if (emailRegex.test(emailReg)) {
                SetEmailError("");
            }
        }

        //Validare adresa

        if (addressReg == "") {
            check = false;
            SetAddressError("* Adresa nu poate fi gol !");
            check = false;
        } else if (addressReg != "") {
            SetAddressError("");
        }

        //Validare data nastere

        if (birthReg == "") {
            check = false;
            SetBirthDateError("* Selectati va rog data de nastere !");
        } else if (birthReg != "") {
            SetBirthDateError("");
        }

        //Validare Gen
        if (genderReg == "") {
            check = false;
            SetGenderError("* Va rugam selectati genul !")
            setCuloare("red");
        } else if (genderReg != "") {
            SetGenderError("gol");
            setCuloare("white");
        }

        //Validare username
        if (usernameReg == "") {
            check = false;
            SetUsernameError("* Va rugam completati username-ul !");
        } else if (usernameReg != "") {
            SetUsernameError("");
        }

        //Validare parola
        if (passwordReg == "") {
            check = false;
            SetParolaError("* Parola nu poate fi goala !");
        } else if (passwordReg != "") {
            if ((/^([a-zA-Z0-9]{6,})$/).test(passwordReg) === false) {
                check = false;
                SetParolaError("* Parola trebuie sa continta minimum 6 caractere !");
            }
            else if((/^([a-zA-Z0-9]{6,})$/).test(passwordReg)) {
                SetParolaError("");
            }
        }
        
        //Validare parola2
        if (repasswordReg == "") {
            check = false;
            SetReParolaError("* Parola nu poate fi goala !");
        } else if (passwordReg != "") {
            if ((/^([a-zA-Z0-9]{6,})$/).test(repasswordReg) === false) {
                check = false;
                SetReParolaError("* Parola trebuie sa continta minimum 6 caractere !");
            }
            else if((/^([a-zA-Z0-9]{6,})$/).test(repasswordReg)) {
                SetReParolaError("");
            }
        }

        if (passwordReg != repasswordReg) {
            if (passwordReg.length >= 6) {
                check = false;
                SetParolaError("* Cele 2 parole nu corespund !");
                SetReParolaError("* Cele 2 parole nu corespund");
            }
        }

        if(check){

            //Adaugam notificare pentru creearea unui cont nou;
            var payload = new FormData();
            payload.append('Mesaj', "A fost creat un cont nou cu numele de utilizator: " + usernameReg);
            payload.append('Priority', 5);
            payload.append('Utilizator', "");
            axios.post('http://localhost/NOKIA-entire-project/php/team4/adauga_notificare.php', payload);


            
      
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
        SetGenderError("gol");
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
        
        <input type="text" placeholder="Name" className="box1" onChange={(e)=>{setNameReg(e.target.value)}}></input>
                <text style={{ color:  "red" }}>{NameError}</text>
        <input type="text" placeholder="Surname" className="box2" onChange={(e)=>{setSurnameReg(e.target.value);console.log(surnameReg)}}></input>
                <text style={{ color:  "red" }}>{SurnameError}</text>
        <input type="text" placeholder="E-mail" onChange={(e)=>{setEmailReg(e.target.value);console.log(emailReg)}}></input>
                <text style={{ color: "red" }}>{EmailError}</text>
                <input type="text" placeholder="Phone number" onChange={(e) => { setTelephoneReg(e.target.value); console.log(telephoneReg) }}></input>
                <text style={{ color: "red" }}>{TelephoneError}</text>
        <input type="text" placeholder="Address" onChange={(e)=>{setAddressReg(e.target.value);console.log(addressReg)}}></input>
                <text style={{ color: "red" }}>{AddressError}</text>
        <input type="date" placeholder="Name" className="box1" onChange={(e)=>{setBirthReg(e.target.value);console.log(birthReg)}}></input>
                <text style={{ color: "red" }}>{BirthdateError}</text>
        <Select placeholder = "Gen" options = {options} onChange = {(e) => {setGenderReg(e.value)}} className = "select"></Select>
                <text style={{color: culoare }}>{GenderError}</text>
        <input className = "user-input-field" type="text" placeholder="Username" onChange={(e) => { setUsernameReg(e.target.value); console.log(usernameReg) }}></input>
                <text style={{ color: "red" }}>{UsernameError}</text>
        <input className = "password-input" type="password" placeholder="Password" onChange={(e)=>{setPasswordReg(e.target.value);console.log(passwordReg)}}></input>
                <text style={{ color:  "red" }}>{ParolaError}</text>
        <input className = "password-input-2" type="text" placeholder="Confirm password" onChange = {(e) => {setRePasswordReg(e.target.value)}}></input>
                <text style={{ color: "red" }}>{ReParolaError}</text>
        <button  className="register" onClick={register}>Sign up</button>
        </div>
        
    </div>}
    </React.Fragment>
);
}

export default Popup;