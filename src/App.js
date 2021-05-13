import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from './pages/HomePage/HomePage.jsx';
import DashBoardPage from './pages/DashBoardPage/DashBoardPage.jsx'
import ReactNotification from 'react-notifications-component'


function App() {
  return (
    <div className="App">
      

      
         <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path = "/dashboard" component = {DashBoardPage} />
        </Switch>
      </BrowserRouter>
     

    </div>
  );
}

export default App;
