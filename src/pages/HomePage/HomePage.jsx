import { render } from '@testing-library/react';
import React, {useEffect} from 'react';
import './HomePage.css';
import axios from 'axios';
import { useHistory, Link, Redirect } from 'react-router-dom';
import Popup from '../../components/RegisterPopup/RegisterPopup';
import fb from '../../Firebase'
import firestore from '@firebase/firestore';


var variables = fb
	.firestore()
	.collection("NOKIA")
	.doc('variables');



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
			
			const { logStatus} = this.state;

		if (logStatus === "You are logged in") {
			localStorage.setItem("user", true);
			localStorage.setItem("name", this.state.nume);
			localStorage.setItem("surname", this.state.prenume);
			this.setState({ loggedIn: true });
		}

			//Primteste numele
			axios.post('http://localhost/nokia/getNume.php', parameters).then((response) => {
			
				localStorage.setItem('name', response.data);
				console.log(localStorage);
			})

			//Primeste prenumele
			axios.post('http://localhost/nokia/getPrenume.php', parameters).then((response) => {
			
				localStorage.setItem('surname', response.data);
				console.log(localStorage);
		})
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
        			<div className="header"></div>
                <div className="container">
                <div className="logoAndCreateContainer">
				<img className="logoNokia" src="https://i.ibb.co/QJ1JWZ9/staff.png" alt="staff" border="0" />
							<a onClick={() => this.setState({ showPopup: true })} className="create-account">Create new account</a>
							<text></text>
                </div>
                <div className="signInDiv">
                <div className="borderLeft">
								<form onSubmit = {this.handleLogin}>
									 <h1>Sign In</h1>
									<input type="text"
										placeholder="Username"
										className="textbox"
										onChange={(e) => {this.setState({username:e.target.value});}}/>
									<input type="password"
										placeholder="Password"
										className="textbox1"
                       					onChange={(e)=>{this.setState({password:e.target.value});}}/>
								<input type = "submit" className = "login" value = "Login"></input>
									<ul>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>

										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>

										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>

										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
										<li>awdaw</li>
								</ul>
								</form>
                <h2>{this.state.loginStatus}</h2>
                </div>
                </div>
                </div>
					<div className="footer"></div>
					<Popup parentcallback={this.handlePopup} displayProperty={this.state.showPopup}></Popup>
					

					
					
            </div>
			)
		}
}