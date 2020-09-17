import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push("/home");
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  filler = () => {
    this.setState({
      username: "Prime Consulting",
      password: "Prime Consulting",
    });
  };

  render() {
    return (
      <div className="container landing">
        {this.props.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form className="login form" onSubmit={this.login}>
          <h1 onClick={this.filler}>Login</h1>
          <div>
            <TextField
              id="outlined-username-input"
              label="Username"
              type="text"
              className="text-field"
              name="username"
              margin="normal"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleInputChangeFor("username")}
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              className="text-field"
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
            />
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.history.push("/register");
            }}
          >
            Register
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
