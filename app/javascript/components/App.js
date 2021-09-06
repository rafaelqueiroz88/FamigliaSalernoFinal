import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

/**
 * Local Or Custom components here
 */
import NavigationBar from './Layout/NavigationBar'
import Auth from './Auth'
import Pizzas from './Pizzas'
import PizzaForm from './Pizzas/PizzaForm'
import PizzaAttachment from './Pizzas/PizzaAttachment'
import Pizza from './Pizzas/Pizza'
import Addresses from './Addresses'
import AddressForm from './Addresses/AddressForm'
import Orders from './Orders'
import OrderForm from './Orders/OrderForm'

const App = () => {

    return(
        <Fragment>
            <NavigationBar />
            <Switch>
                <Route exact path="/" component={Pizzas} />
                <Route exact path="/pizzas" component={Pizzas} />
                <Route exact path="/entrar" component={Auth} />
                <Route exact path="/pizzas/nova" component={PizzaForm} />
                <Route exact path="/pizzas/anexo/:slug" component={PizzaAttachment} />
                <Route exact path="/pizzas/:slug" component={Pizza} />
                <Route exact path="/pizzas/atualizar/:slug" component={PizzaForm} />
                <Route exact path="/enderecos/novo/" component={AddressForm} />
                <Route exact path="/enderecos/:slug" component={Addresses} />
                <Route exact path="/pedidos/novo" component={OrderForm} />
                <Route exact path="/pedidos/:slug" component={Orders} />
            </Switch>
        </Fragment>
    )
}

export default App