import React, { Component } from 'react';
import {connect} from 'react-redux';
import { TextField } from '@material-ui/core';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('/home')
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className='container landing'>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className="login form" onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            
              <TextField
                id="outlined-username-input"
                label="Username"
                className='text-field'
                type="text"
                margin="normal"
                variant="outlined"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            
          </div>
          <div>
            
              <TextField
                id="outlined-password-input"
                label="Password"
                className='text-field'
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
           
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
        <button
            type="button"
            className="link-button"
            onClick={() => {this.props.history.push('/login')}}
          >
            Login
          </button>
          
        </center>

      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

