import React, {useEffect} from 'react';
import './HomePage.css';
import axios from 'axios';
import { useHistory, Link, Redirect } from 'react-router-dom';
import Popup from '../../components/RegisterPopup/RegisterPopup';
import fb from '../../Firebase'
import firestore from '@firebase/firestore';
import {reactLocalStorage} from 'reactjs-localstorage';



var variables = fb
	.firestore()
	.collection("NOKIA")
	.doc('variables');

var NOKIA = fb.firestore().collection("NOKIA");

export var name;


export default class Homepage extends React.Component {

	constructor(props) {
		super(props);

		const token = localStorage.getItem("user");
		

		let loggedIn = true
        if (token == null) {
            loggedIn = false
        }

		this.state = {
		usernameReg:'',
		passwordReg:'',
		nameReg:'',
		surnameReg:'',
		emailReg:'',
		telephoneReg:'',
		addressReg:'',
		birthReg:'',
		genderReg:'',
		showPopup:false,
		username:'',
		password:'',
		loggedIn: loggedIn,
		logStatus: '',
		nume: '',
		prenume:'',
		adresa: "",
		subject: "",
		content: "",
		user: "",
		error_message: "",
		incercari:0,
		}

		this.onChange = this.onChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		
	}

	handleLogin(event) {

		

		event.preventDefault();
		var parameters = new FormData();
		parameters.append('username', this.state.username);
		parameters.append('password', this.state.password);
		axios.post('http://localhost/nokia/login.php', parameters).then((response) => {

			this.setState({ logStatus: response.data });
			
			const { logStatus } = this.state;

			if (logStatus === "You are logged in" && this.state.incercari < 5) {



				//Adaugam notificare ca persoana s-a logat cu success;


			
				axios.post('http://localhost/nokia/getEmail.php', parameters).then((response) => {
					
					console.log("MAIL " + response.data);
					this.props.parentCallback({ adresa: response.data })
					reactLocalStorage.set("mail", response.data);
					localStorage.setItem('mail', response.data);
					this.setState({ adresa: response.data });



					var payload = new FormData();
					payload.append('Mesaj', "Userul " + response.data + " a reusit sa se autentifice cu succes");
					payload.append('Priority', 4);
					payload.append('Utilizator', response.data);
					axios.post('http://localhost/NOKIA-entire-project/php/team4/adauga_notificare.php', payload);
					
				});

				

				this.setState({ subject: "Succes" });
				this.setState({ content: "Utilizatorul " + localStorage.getItem("mail") + " a reusit sa se autentifice !" });

				//Trimite mail 
				var parameters_2 = new FormData();
				parameters_2.append('mail', localStorage.getItem("mail"));
				parameters_2.append('subject', this.state.subject);
				parameters_2.append('content', this.state.content);
				axios.post('http://localhost/NOKIA-entire-project/php/team4/email.php', parameters_2).then((response) => {
					
					
				})

				localStorage.setItem("user", true);
				localStorage.setItem("name", this.state.nume);
				localStorage.setItem("surname", this.state.prenume);
				this.setState({ loggedIn: true });
		

				//Primteste numele
				axios.post('http://localhost/nokia/getNume.php', parameters).then((response) => {
			
					this.props.parentCallback({ name: response.data })
					reactLocalStorage.set("name", response.data);
					localStorage.setItem('name', response.data);
				
				})

				//Primeste prenumele
				axios.post('http://localhost/nokia/getPrenume.php', parameters).then((response) => {
				
					this.props.parentCallback({ prenume: response.data })
					reactLocalStorage.set("surname", response.data);
					localStorage.setItem('surname', response.data);
				
				})

				//Primeste telefon

				axios.post('http://localhost/nokia/getPhone.php', parameters).then((response) => {
				
					this.props.parentCallback({ phone: response.data })
					reactLocalStorage.set("phone", response.data);
					localStorage.setItem('phone', response.data);
				
				})

				//Primeste adresa
				axios.post('http://localhost/nokia/getAddress.php', parameters).then((response) => {
				
					this.props.parentCallback({ address: response.data })
					reactLocalStorage.set("address", response.data);
					localStorage.setItem('address', response.data);
				
				})
				//Primeste data nastere
				axios.post('http://localhost/nokia/getBirthdate.php', parameters).then((response) => {
				
					this.props.parentCallback({ birth: response.data })
					reactLocalStorage.set("birth", response.data);
					localStorage.setItem('birth', response.data);
				
				})
				
			}
			else {
				this.setState({ error_message: "Datele nu sunt valide" });
				this.setState({ incercari: this.state.incercari + 1 });
			}

			if (this.state.incercari === 6) {

				var payload2 = new FormData();
					payload2.append('Mesaj', "Cineva a incercat de 5 ori sa se autentifice cu username-ul: " + this.state.username);
					payload2.append('Priority', 6);
					payload2.append('Utilizator', "");
					axios.post('http://localhost/NOKIA-entire-project/php/team4/adauga_notificare.php', payload2);

				this.setState({ incercari: 1});
			}
			

		},  
		)
	}

	 handlePopup = (childData) => {
		 this.setState({ showPopup: childData })
	}

	onChange(e) {
	
		this.setState({
			[e.target.name]:e.target.value
		})
	}	
	render(){

		
		
		if (this.state.loggedIn) {
			return <Redirect to = "/welcome"></Redirect>
		}

			return (
				<div className="App">
        			
                <div className="container">
                <div className="logoAndCreateContainer">
				<img className="logoNokia" src="https://i.ibb.co/QJ1JWZ9/staff.png" alt="staff" border="0" />
							<a onClick={() => this.setState({ showPopup: true })} className="create-account">Create new account</a>
							
                </div>
                <div className="signInDiv">
                <div className="borderLeft">
								<form onSubmit = {this.handleLogin}>
									<h1>Sign In</h1>
									<div className="error-message">
										<text>{this.state.error_message}</text>
									</div>
									<input type="text"
										placeholder="Username"
										className="textbox"
										onChange={(e) => { this.setState({ username: e.target.value }); }} />
									<input type="password"
										placeholder="Password"
										className="textbox1"
                       					onChange={(e)=>{this.setState({password:e.target.value});}}/>
								<input type = "submit" className = "login" value = "Login"></input>
									
								</form>
								<text>Incercari: {this.state.incercari}</text>
                <h2>{this.state.loginStatus}</h2>
                </div>
                </div>
                </div>
					
					<Popup parentcallback={this.handlePopup} displayProperty={this.state.showPopup}></Popup>
					

					
					
            </div>
			)
		}
}