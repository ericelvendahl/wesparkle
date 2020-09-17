import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./LinkTags.css";

class LinkTags extends Component {
  // sets initial state to what's in redux
  state = {
    tags: this.props.reduxState.details.tags,
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
  
  //this removes a tag, either by clicking the x or backspace
  removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags }, () => {
      this.saveTags();
    });
  };

  //accounts for a tag added or removed
  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      this.setState({ tags: [...this.state.tags, val.toLowerCase()] }, () => {
        this.saveTags();
      });
      this.tagInput.value = null;
    } else if (e.key === "Backspace" && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  };

  //called whenever a tag is added or removed
  //sends the tags in state with the details for that link
  saveTags = () => {
    const tags = this.state.tags;
    const details = this.props.reduxState.details;
    this.props.dispatch({
      type: "SAVE_TAGS",
      payload: { tags, details },
    });
  };

  render() {
    const { tags } = this.state;
    return (
      <div className="input-tag">
        <ul className="input-tag__tags">
          {tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button
                type="button"
                onClick={() => {
                  this.removeTag(i);
                }}
              >
                +
              </button>
            </li>
          ))}
          <li className="input-tag__tags__input">
            <input
              type="text"
              placeholder="add here..."
              onKeyDown={this.inputKeyDown}
              ref={(c) => {
                this.tagInput = c;
              }}
            />
          </li>
        </ul>
      </div>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect(mapReduxStateToProps)(LinkTags));