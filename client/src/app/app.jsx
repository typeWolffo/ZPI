import React from 'react';
import "./app.css"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from '../features/User/Login';
import Dashboard from '../features/User/Dashboard';
import { PrivateRoute } from '../helpers/PrivateRoute';
// import Login123 from "../components/login-form/login";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact component={Login} path="/login" />
                    {/*<Route exact component={Login123} path="/login" />*/}
                    <PrivateRoute exact component={Dashboard} path="/dashboard" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;