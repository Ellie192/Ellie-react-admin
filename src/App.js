import React from 'react';
import {Switch,Route} from 'react-router-dom'

import Login from './pages/login';
import Admin from './pages/admin';

export default function App() {
  return (
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/admin' component={Admin}/>
      <Route path='/' component={Admin}/>
    </Switch>
  )
}
