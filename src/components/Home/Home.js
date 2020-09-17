import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdvancedLanding from '../AdvancedLanding/AdvancedLanding';
import Landing from '../Landing/Landing';

class Home extends Component {
  
// chooses which component tree to render based on log-in status
  render() {
    return (
      <>
        { this.props.reduxState.user.id ? (<AdvancedLanding />) : (<Landing />)}
        
        {/* Reroutes back to login if error on login */}
        { this.props.reduxState.errors.loginMessage !== "" ? 
         this.props.history.push('/login')
        :
        <></>
 }
 </>
    ) // end return
  } // end render
} // end class

// Instead of taking everything from state, we just want the user info.
const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(Home);
  