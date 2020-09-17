import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class LoginButton extends Component {

  render() {
    return (
      <div className='container login-button'>
        <Button
          id='advanced' 
          onClick={()=> this.props.history.push('/login')}
          variant='outlined'
          >Login/Register for Advanced Features
        </Button>
      </div>
    ) // end return
  } // end render
} // end class

export default withRouter(connect()(LoginButton));