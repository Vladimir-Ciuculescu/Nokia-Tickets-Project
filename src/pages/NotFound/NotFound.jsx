import React from 'react';
import './NotFound.css';

export default class NotFound extends React.Component {

    render() {
        return (
            
            <div className = "page-not-found">

                <div className = "message">
                    <text>Ne pare rau, <br></br>pagina pe care incercati sa o accesati nu exista !</text>
                </div>

                <img className = "img" src="https://i.ibb.co/xCh0knb/NOT-FOUND.png"
                        alt="NOT-FOUND"
                        border="0">
                    </img>

            </div>
        )
    }
}