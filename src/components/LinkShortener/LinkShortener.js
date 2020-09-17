import shortId from "shortid";
import React, { Component } from "react";
import { connect } from "react-redux";
import QRCode from "qrcode.react";
import Button from "@material-ui/core/Button";
import parse from "url-parse";
import validUrl from "valid-url";

class LinkShortener extends Component {
  componentDidUpdate() {
    if (this.state.baseUrl === "") {
      this.setState({
        baseUrl: this.props.reduxState.baseUrl.url,
      });
    }
  }

  state = {
    inputUrl: "",
    shortenedUrl: "",
    copySuccess: "",
    urlIsValid: true,
    baseUrl: "",
  };

  copyClicked = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    // Next two lines from example code:
    // "This is just personal preference.
    // I prefer to not show the whole text area selected."
    e.target.focus();
    this.setState({
      copySuccess: "Link copied!",
      inputUrl: "",
      // Don't reset short url since we want shortened link and
      // QR code to persist after copy
    });
  }; // end copyClicked()

  generateClicked = () => {
    // Only generate if they have entered a URL
    if (this.state.inputUrl != "") {
      // Use url-parse library (as 'parse') to clean input URL
      let cleanUrl = this.state.inputUrl;

      // Use parse to create the parsed object, forcing any URL
      // to the http (not https) protocol
      cleanUrl = parse(cleanUrl, {
        host: "",
        hostname: "",
        href: cleanUrl,
        origin: "",
        password: "",
        pathname: "",
        port: "",
        protocol: "http:",
        query: "",
        slashes: true,
        username: "",
      });

      // Check if URL generated above is valid. If not, show error.
      if (validUrl.isUri(cleanUrl.href)) {
        this.setState({
          urlIsValid: true,
        });

        // Base URL goes in this variable
        // This can be changed to a custom domain later,
        // if needed.

        const shortString = shortId.generate();
        this.setState({
          shortenedUrl: this.state.baseUrl + shortString,
          copySuccess: "",
        });
        this.props.dispatch({
          type: "ADD_LINK",
          payload: {
            //variable names changed here to match names on '/' POST route
            long_url: cleanUrl.href,
            short_url: shortString,
          },
        });
      } else {
        this.setState({
          urlIsValid: false,
        });
      }
    }
  }; // end generateClicked()

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; // end handleInputChangeFor()

  render() {
    return (
      <div className="container link-shortener">
        <h2 id="landingHeader">
          Shorten Links For Free and Support Small Businesses
        </h2>

        {/* If the user submits an invalid URL, show error */}
        {this.state.urlIsValid ? (
          <div />
        ) : (
          <span>Please enter a valid URL</span>
        )}
        <textarea
          type="text"
          className="text-area short"
          id="outlined-link-input"
          placeholder="Type link here"
          name="link"
          margin="normal"
          variant="outlined"
          value={this.state.inputUrl}
          onChange={this.handleInputChangeFor("inputUrl")}
        />
        <Button
          id="generate"
          className="big short"
          onClick={this.generateClicked}
          variant="outlined"
          color="default"
        >
          Generate
        </Button>

        <textarea
          type="text"
          className="text-area short"
          ref={(textArea) => (this.textArea = textArea)}
          name="shorturl"
          defaultValue={this.state.shortenedUrl}
          placeholder="Your shortened link"
        />
        {/* From example at: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard */}
        <div className="qr-div short">
          {
            /* Logical shortcut for only displaying the 
            button if the copy command exists */
            document.queryCommandSupported("copy") && (
              <div>
                <Button
                  id="copy"
                  className="big short"
                  onClick={this.copyClicked}
                  variant="outlined"
                  color="primary"
                >
                  Copy Shortened Link
                </Button>
                <center className="link-copied">
                  {this.state.copySuccess}
                </center>
              </div>
            )
          }

          {/* Render QR code only if URL has been submitted */}
          <div>
            {this.state.shortenedUrl !== "" ? (
              <center>
                <QRCode className="qr" value={this.state.shortenedUrl} />
                <br />
                Right click or long press to save image
              </center>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    ); // end return
  } // end render
} // end class

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(LinkShortener);
