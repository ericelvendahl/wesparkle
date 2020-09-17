import React, { Component } from "react";
import { connect } from "react-redux";
import LinkShortener from "../LinkShortener/LinkShortener";
import LinkList from "../LinkList/LinkList";
import FeedbackCarousel from "../FeedbackCarousel/FeedbackCarousel";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import LinkToMain from "../LinkToMain/LinkToMain";

class AdvancedLanding extends Component {
//  list of componentes to render upon logged in user accesing home
  render() {
    return (
      <div className="landing">
        <LinkShortener />
        <LinkList />
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

export default connect(mapStateToProps)(AdvancedLanding);
