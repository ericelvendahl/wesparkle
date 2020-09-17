import React, { Component } from "react";
import { connect } from "react-redux";
import "./FeedbackForm.css";
import * as EmailValidator from "email-validator";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


class FeedbackForm extends Component {

  // this is the animation displaying positive user feedback quotes
  // built with react-responsive-carousel
  
  state = {
    userEmail: "",
    userName: "",
    emailBody: "",
    emailValid: false,
    emailError: false,
  };

  prepareToSendEmail = () => {
    if (EmailValidator.validate(this.state.userEmail)) {
      // set booleans for conditional rendering of email verification on DOM
      this.setState({ emailValid: true });
      this.setState({ emailError: false });

      this.props.dispatch({
        type: "FETCH_FEEDBACK",
        payload: {
          emailBody: this.state.emailBody,
          userEmail: this.state.userEmail,
          userName: this.state.userName,
        },
      });
      // clear inputs after submit
      this.setState({
        emailBody: "",
        userEmail: "",
        userName: "",
      });
    } else {
      // set booleans for conditional rendering of email verification on DOM
      this.setState({ emailValid: false });
      this.setState({ emailError: true });
    }
  };

  // deal with all user input changes
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <>
        <center>
          <h2>Feedback</h2>
          <div className="feedback-input">
            <TextField
              id="outlined-name-input"
              label="Name"
              type="text"
              name="name"
              margin="normal"
              variant="outlined"
              value={this.state.userName}
              onChange={this.handleInputChangeFor("userName")}
            />
            <div id="sign-in-spacer"></div>
            <TextField
              id="outlined-email-input"
              label="Email"
              type="text"
              name="email"
              margin="normal"
              variant="outlined"
              value={this.state.userEmail}
              onChange={this.handleInputChangeFor("userEmail")}
            />
          </div>
          <textarea
            className="feedback text-area"
            placeholder="Type your message here..."
            value={this.state.emailBody}
            onChange={this.handleInputChangeFor("emailBody")}
          >  
          </textarea>
          <div>
            <Button
              className="feedbackButton"
              variant="outlined"
              color="secondary"
              id="delete"
              onClick={this.prepareToSendEmail}
            >
              Submit
            </Button>
          </div>
          
          {/* email is on its way? */}
          {this.state.emailValid ? <p>E-mail sent successfully</p> : <p></p>}
          
          {/* user's entered a bad email address? */}
          {this.state.emailError ? (
            <p>Error: invalid email address</p>
          ) : (
            <p></p>
          )}

        </center>
      </>
    ); // end return
  } // end render
} // end class

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(FeedbackForm);
