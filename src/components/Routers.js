import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from '../pages/Home';
import Menu from '../components/Menu';
import Dashboard from '../pages/Dashboard';
import User from '../pages/User';
import Explore from '../pages/Explore';
const Routers = () => {
    return(
        <React.Fragment>
            <Router>
                <Menu/>
                <Switch>
                    <Route path="/dashboard">
                        <Dashboard/>
                    </Route>
                    <Route path="/user/:id">
                        <User/>
                    </Route>
                    <Route path="/explore">
                        <Explore/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </React.Fragment>
    )
}
export default Routers;