import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Homepage from './pages/HomePage/HomePage.jsx';
import DashBoardPage from './pages/DashBoardPage/DashBoardPage.jsx'
import ReactNotification from 'react-notifications-component'
import WelcomePage from "./pages/WelcomePage/WelcomePage.jsx";
import React, { Component } from "react";
import Menu from "./components/Menu/Menu.jsx";
import fb from './Firebase';
import firestore from '@firebase/firestore';
import NotFound from "./pages/NotFound/NotFound.jsx";
import './App.css'
import Graphs from "./pages/Graphs/Graphs.jsx";


var variables = fb
  .firestore()
  .collection("NOKIA")
  .doc('variables');


export default class App extends Component {

  state = {
    LoginStatus: false,
   
  }

  constructor(props) {
    super(props);


    variables.onSnapshot(doc => {
      this.setState({
        LoginStatus: doc.data().LoginStatus
      })
    })

  }


  handleCallback = (childData) => {
      this.setState({userinfo:childData});
  }

  render() {

    


    console.log(this.state.LoginStatus);


    return (
      <div className="App">

        

        <Router>

          <Switch>
            
            <Route exact path="/" component={() => <Homepage parentCallback = {this.handleCallback}  />} />
            <Route path="/welcome" component= {() => <WelcomePage name = {this.state.name}></WelcomePage>} />
            
          
            
          </Switch>

        </Router>


      </div>
    );
  }

}


