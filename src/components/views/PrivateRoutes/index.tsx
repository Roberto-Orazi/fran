import { Route, Switch } from 'react-router-dom'
import { AgencyCarView } from './AgencyCar'
import { AgencyCarForm } from './AgencyCar/Form/Form'
import { Layout } from '../../layouts/Layout'
import { ELinks } from '../../routes/links'
import { AgencyCar } from './AgencyCar/AgencyCar'
import { RentalApartments } from './RentalAppart/index'
import { ApartmentView } from './RentalAppart/AppartmentView'
import { AddApartment } from './RentalAppart/Form/AddAppart'
import { AddExpense } from './RentalAppart/Form/AddExpenses'
import { AddApartmentRent } from './RentalAppart/Form/AddRent'
import { AparmentsRentedView } from './RentalAppart/RentedApartmentView'
import { AparmentsRented } from './RentalAppart/RentedApartments'

const Routes = () => (
  <Layout>
    <Switch>
      <Route
        component={AgencyCarView}
        exact
        path={ELinks.agencyCars}
      />
      <Route
        component={AgencyCarForm}
        exact
        path={ELinks.agencyCarForm}
      />
      <Route
        component={AgencyCar}
        exact
        path={`${ELinks.agencyCar}/:id`}
      />
      <Route
        component={RentalApartments}
        exact
        path={`${ELinks.apartments}`}
      />
      <Route
        component={ApartmentView}
        exact
        path={`${ELinks.apartmentsView}/:id`}
      />
      <Route
        component={AddApartment}
        exact
        path={`${ELinks.apartmentsForm}`}
      />      <Route
        component={AddExpense}
        exact
        path={`${ELinks.apartmentsExpense}`}
      />
      {/* <Route
        component={AddApartmentRent}
        exact
        path={`${ELinks.apartmentsRentalForm}/:id`}
      /> */}
      <Route
        component={AparmentsRentedView}
        exact
        path={`${ELinks.apartmentsRented}`}
      />
      {/* <Route
        component={AparmentsRented}
        exact
        path={`${ELinks.apartmentsRental}/:id`}
      /> */}
    </Switch>
  </Layout>
)

export default Routes
