import React,{ Component } from 'react';

import {Switch,Route} from 'react-router-dom';

import Login from './pages/login';
import Admin from './pages/admin';


export default class App  extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/admin' component={Admin}/>
                    <Route path='/' component={Login}/>
                </Switch>
            </div>
        )
    }
}
