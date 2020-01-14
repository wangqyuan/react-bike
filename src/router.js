import React, {Component} from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App';
import Login from './pages/login'

class ERoute extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login}/>
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

export default ERoute;
