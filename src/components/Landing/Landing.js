import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkShortener from "../LinkShortener/LinkShortener";
import FeedbackCarousel from "../FeedbackCarousel/FeedbackCarousel";
import BenefitsCopy from '../BenefitsCopy/BenefitsCopy';
import LinkSupportCopy from '../LinkSupportCopy/LinkSupportCopy';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import LinkToMain from '../LinkToMain/LinkToMain';
import LoginButton from '../LoginButton/LoginButton';

class Landing extends Component {
// List of components to render upon non loged user accessing home
  render() {
    return (
      <div className='landing'>
        <LinkShortener />
        <LoginButton />
        <BenefitsCopy />
        <LinkSupportCopy />
        <FeedbackCarousel />
        <FeedbackForm />
        <LinkToMain />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Landing);
