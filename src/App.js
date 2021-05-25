import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Homepage from './pages/HomePage/HomePage.jsx';
import DashBoardPage from './pages/DashBoardPage/DashBoardPage.jsx'
import ReactNotification from 'react-notifications-component'
import WelcomePage from "./pages/WelcomePage/WelcomePage.jsx";
import React, { Component } from "react";
import Menu from "./components/Menu/Menu.jsx";
import fb from './Firebase';
import firestore from '@firebase/firestore';


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



  render() {



    console.log(this.state.LoginStatus);


    return (
      <div className="App">

        <Router>

          <Switch>
            <Route exact path="/">
              <Homepage></Homepage>
            </Route>
            <Route exact path="/welcome" render={() => this.state.LoginStatus ? (<WelcomePage></WelcomePage>) : (<Redirect to="/"></Redirect>)}></Route>
          </Switch>

        </Router>


      </div>
    );
  }

}

