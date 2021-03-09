import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Addcomp from './pages/Addcomp';
import Addof from './pages/Addof';
import Auth from './pages/Auth';
class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
          <Route path="/" component={Addof} exact></Route>
          <Route path="/ADDOf" component={Addof} exact></Route>
          <Route path="/addcomp" component={Addcomp} exact></Route>
          <Route path="/authentification" component={Auth} exact></Route>
        </Switch>
        </div>

      </Router>
    );
  }
}

export default App;