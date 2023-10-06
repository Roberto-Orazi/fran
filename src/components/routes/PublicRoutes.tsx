import { Switch, Route } from 'react-router-dom'
import React from 'react'
import Login from '../views/Basic/Login'
// Las defaultRoutes son rutas que no requieren estar autenticado ni autorizado

const BasicNavigation = () => (
  <Switch>
    {/* http://localhost:3000/auth */}
    {/* http://localhost:3000/ */}
    <Route exact path="/">
      <Login />
    </Route>
  </Switch>
)

export default BasicNavigation
