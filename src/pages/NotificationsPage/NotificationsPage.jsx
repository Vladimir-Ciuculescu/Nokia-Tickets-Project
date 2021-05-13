import React, {Component} from 'react';
import './NotificationsPage.css';
import Select from 'react-select';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';
import 'animate.css/animate.compat.css';


const options = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' }
]

export default class NotificationsPage extends Component{


    constructor(props) {
        super(props);
    }

    sendEmail = (e) => {

        e.preventDefault();

         store.addNotification({
            title: "Wonderful!",
            message: "S-a adaugat un ticket de prioritate 1",
            type: 'warning',
            container: 'top-center',
            insert: 'bottom',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "zoomOut"],
          
            dismiss: {
                duration: 3000,
                showIcon:true,
            }
            })


    }


    render() {
        return (
            
            <div className="notifications-page">
                <ReactNotification />
                    <text>Notificari</text>

                    <form className="contact-form" onSubmit={this.sendEmail.bind(this)}>
                            <label>Nivel de prioritate</label>
                            <Select name = "nivel"  placeholder = {""} onChange = {(p)=> {this.setState({Priority:p.value}); this.setState({Mesaj:'A fost creat un ticket nou de prioritate ' + p.value })}} options={options} />

                            <button>Send Ticket</button>
                        </form>
                     </div>
            
        )
    }

}