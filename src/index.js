import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import { BrowserRouter as Router,Route,Redirect,Switch } from "react-router-dom";
import reducers from './reducer'
import './config';
import Login from "./container/login/login";
import Register from "./container/register/register";
import Authroute from "./component/authroute/authroute";
import  BossInfo  from "./container/bossinfo/bossinfo";
import SeekerInfo from "./container/seekerinfo/seekerinfo";
import Dashboard from "./component/dashboard/dashboard";
import Chat from "./component/chat/chat";

const store=createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f 
))
//boss seeker my msg
ReactDOM.render((<Provider store={store}>
 <Router>
  <div >
  <Authroute></Authroute>
  <Switch>

    <Route path='/seekerinfo' component={SeekerInfo}></Route>
    <Route path='/bossinfo' component={BossInfo}></Route>
    <Route path='/login' component={Login}></Route> 
    <Route path='/register' component={Register}></Route> 
    <Route path='/chat/:user' component={Chat}></Route>
    <Route component={Dashboard} ></Route>
   </Switch> 
  </div>   
 </Router>
</Provider>), document.getElementById('root'));

