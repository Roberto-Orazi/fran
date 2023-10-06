import { Switch } from 'react-router-dom'
import PrivateRoute from '../shared/PrivateRoute'
import Routes from '../views/PrivateRoutes'

export const PrivateRoutes = () => (
  <Switch>
    <PrivateRoute
      path="/admin"
      component={Routes}
      isAuth
    />
  </Switch>
)
