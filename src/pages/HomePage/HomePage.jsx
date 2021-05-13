import React from 'react';
import './HomePage.css';

export default class Homepage extends React.Component {

    render() {
    
        return (
            <div className="auth-content">
			<div className="space-options"></div>
			<h2 className="title">Opțiuni disponibile:</h2>
			<div className="space-options-reg"></div>
			<center>
				<a href="/auth/login" className="big-btn">Autentificare</a>
				<a href="/auth/register" className="big-btn btn-red">Înregistrare</a>
				<a href="/welcome" className="big-btn btn-green">Dashboard</a>
			</center>
				
			
		</div>
        )
    }
}