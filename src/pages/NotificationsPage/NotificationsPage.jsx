import React from 'react';
import './NotificationsPage.css'
import Select from 'react-select';
import { store } from 'react-notifications-component';
import * as emailjs from 'emailjs-com';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import axios from 'axios';





const options = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' }
]



export default class NotificationsPage extends React.Component{


    constructor(props) {
        super(props);

        this.state = {
            row:[],
            Mesaj:'',
            Priority:null,
            Numar_inregistrari: 0,
        }
    }

    sendTicket = (e) =>  {
        e.preventDefault();
        console.log(this.state.Priority);


       //INTRODUCEM TICKETUL IN TABELA TICKETE
        var headers ={
            'Content-Type':'application/json'
        }
        var payload = new FormData();
        payload.append('Priority',this.state.Priority);
        axios.post('http://localhost/NOKIA-entire-project/php/team4/introduce.php',payload).then(res=>{
            this.setState({data:res.data});
        });

          //INTRODUCEM TICKET CA SI NOTIFICARE IN TABELA NOTIFICARI
        var headers ={
            'Content-Type':'application/json'
        }
        var payload = new FormData();
        payload.append('Mesaj',this.state.Mesaj);
        payload.append('Priority', this.state.Priority);
        payload.append('Utilizator', "");
        axios.post('http://localhost/NOKIA-entire-project/php/team4/adauga_notificare.php',payload).then(res=>{
            this.setState({data:res.data});
        });
       
    }

    render() {

        

        return (
            
            <React.Fragment>
                <div className = "notifications-page">
                <text className="notifications-header">Notificari</text>
                
                <div className = "butoane-container">

                    <form onSubmit = {this.sendTicket}>
                    <ReactNotification />
                        
                        <Select
                                onChange={(e) => { this.setState({Priority:e.value});this.setState({Mesaj:'A fost creat un ticket nou de prioritate ' + e.value })}}
                            placeholder="Prioritate"
                            options={options}
                        ></Select>
                        <button>Trimite ticket nou</button>
                    </form> 

                </div>

            </div>
            </React.Fragment>
        )
    }
}