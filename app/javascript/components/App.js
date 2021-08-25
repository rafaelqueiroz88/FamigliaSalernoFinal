import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

/**
 * Local Or Custom components here
 */
import NavigationBar from './Layout/NavigationBar'
import Auth from './Auth'
import Pizzas from './Pizzas'
import PizzaNew from './Pizzas/PizzaNew'
import PizzaAttachment from './Pizzas/PizzaAttachment'

const App = () => {

    return(
        <Fragment>
            <NavigationBar />
            <Switch>
                <Route exact path="/" component={Pizzas} />
                <Route exact path="/pizzas" component={Pizzas} />
                <Route exact path="/entrar" component={Auth} />
                <Route exact path="/pizzas/nova" component={PizzaNew} />
                <Route exact path="/pizzas/anexo/:slug" component={PizzaAttachment} />
            </Switch>
        </Fragment>
    )
}

export default App