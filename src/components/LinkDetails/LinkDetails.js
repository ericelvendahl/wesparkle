import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import QRCode from "qrcode.react";
import copy from "clipboard-copy";
import LinkTags from "../LinkTags/LinkTags";
import Button from "@material-ui/core/Button";
import GraphOne from "../GraphOne/GraphOne";
import GraphTwo from "../GraphTwo/GraphTwo";
import GraphThree from "../GraphThree/GraphThree";

class LinkDetails extends Component {
  state = {
    copySuccess: "",
    baseUrl: "http://sprkl.es/",
  };

  componentDidMount() {
    //if no details in redux, it will call this
    //to get it from server based on id in /details/:id
    if (!this.props.reduxState.details.id) {
      this.props.dispatch({
        type: "FETCH_DETAILS",
        payload: this.props.match.params.id,
      });
    }
  }

  copyLink = () => {
    // this calls the clipboard-copy library imported above
    copy(this.state.baseUrl + this.props.reduxState.details.short_url);
    this.setState({
      copySuccess: "Link copied!",
    });
  };

  deleteLink = (link) => {
    //   deletes (disables) link and returns user to main page
    this.props.dispatch({ type: "REMOVE_LINK", payload: link });
    this.props.history.push(`/`);
  };

  render() {
    const link = this.props.reduxState.details;
    return (
      <div className="landing">
        <h1>Link Details</h1>
        <Button
          id="back"
          onClick={() => this.props.history.push("/home")}
          variant="outlined"
          color="primary"
        >
          back
        </Button>

        <div className="container link-item">
          <QRCode
            className="item-link"
            value={this.state.baseUrl + link.short_url}
          />
          <div className="item-text item-title">Long URL:</div>
          <div className="item-text item-link">
            {<a href={link.long_url}>{link.long_url}</a>}
          </div>
          <div className="item-text item-title">Short URL:</div>
          <div className="item-text item-link">
            {/* Link code changed for presentation.
            Original here:
            {<a href={this.state.baseUrl + link.short_url}>{this.state.baseUrl + link.short_url}</a>} */}
            {<a href={link.long_url}>{this.state.baseUrl + link.short_url}</a>}
          </div>
          <div className="item-text item-title">Tags:</div>
          {this.props.reduxState.details.id ? <LinkTags link={link} /> : <></>}
          <div className="link-item button">
            <Button
              id="copy"
              className="short"
              onClick={this.copyLink}
              variant="outlined"
              color="primary"
            >
              copy
            </Button>

            <Button
              id="delete"
              onClick={() => this.deleteLink(link)}
              variant="outlined"
              color="secondary"
            >
              x
            </Button>
          </div>
          <center className="link-copied">{this.state.copySuccess}</center>
        </div>
        <h1>Clicks by Day</h1>
        <div className="container graph link-item">
          <GraphOne />
        </div>
        <h1>Top Performing Links</h1>
        <div className="container graph link-item">
          <GraphTwo />
        </div>
        <h1>Links Generated</h1>
        <div className="container graph link-item">
          <GraphThree />
        </div>
      </div>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkDetails));
