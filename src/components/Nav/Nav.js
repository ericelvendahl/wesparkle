import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav root">
    <Link to="/home">
      <img className="nav-logo" src="/images/wsLogo.png" alt="We Sparkle logo" />
    </Link>

    <div className="nav-right">
      {/* Show the basic features vs. logged in features main page */}
      {props.user.id ? 
      ( <button className="nav-link"><Link to="/home">Home</Link></button>) 
      :
      (<Link className="nav-link" to="/login">Login/Register</Link>)}

      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <LogOutButton className="nav-link"/>
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
