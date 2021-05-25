import { render } from '@testing-library/react';
import React, {useEffect} from 'react';
import './HomePage.css';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
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

		this.state= {
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
		loginStatus:false,
		
		}
		
	}

	changeStatus(e) {
		
		
	}

	 handlePopup = (childData) => {
    this.setState({showPopup:childData})
  }
	
	render(){

		var parameters = new FormData();
		parameters.append('username', this.state.username);
		parameters.append('password', this.state.password);
		axios.post('http://localhost/NOKIA-entire-project/php/login.php', parameters).then((response) => {

			if (response.data == "You are logged in") {
				variables.update({
					LoginStatus: true,
				});
				
			}
			else {
				variables.update({
				LoginStatus:false,
			})
			}
			
			

		})

			return (
				<div className="App">
        <div className="header"></div>
                <div className="container">
                <div className="logoAndCreateContainer">
							
							<img className="logoNokia" src="https://i.ibb.co/QJ1JWZ9/staff.png" alt="staff" border="0" />
                  <a onClick={()=>this.setState({showPopup:true})} className = "create-account">Create new account</a>
                </div>
                <div className="signInDiv">
                <div className="borderLeft">
                <h1>Sign In</h1>
                  <input type="text" placeholder="Username" className="textbox"
                       onChange={(e)=>{
                           this.setState({username:e.target.value});
                       }}
                />
                  <input type="password" placeholder="Password" className="textbox1"
                       onChange={(e)=>{
                        this.setState({password:e.target.value});
                       }}
                />
								<a href="/">{this.state.loginStatus}</a>
								
								<button className = "login"><Link to ="/welcome" className = "login">Login</Link></button>
                <h2>{this.state.loginStatus}</h2>
                </div>
                </div>
                </div>
					<div className="footer"></div>
					<Popup parentcallback = {this.handlePopup} displayProperty={this.state.showPopup}></Popup>
                
            </div>
			)
		}
}