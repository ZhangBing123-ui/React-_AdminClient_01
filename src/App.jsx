import React, { Component } from 'react';

import {HashRouter,BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'

class App extends Component {
   
    render() {
        return (
           
              <HashRouter>

                  <Switch>

                      <Route path="/login" component={Login}></Route>
                      <Route path="/" component={Admin}></Route>
                     
                  </Switch>
              </HashRouter>
          
        );
    }
}

export default App;
