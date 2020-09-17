import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LinkDetails from "../LinkDetails/LinkDetails";
import Home from "../Home/Home";
import "./App.css";
import "../../../node_modules/react-vis/dist/style.css";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
    this.props.dispatch({ type: "FETCH_BASE_URL" });
  }

  render() {
    return (
      <Router>
        <div className="root">
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home 
            This is a route anyone can see, no login necessary */}
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <ProtectedRoute exact path="/details/:id" component={LinkDetails} />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
