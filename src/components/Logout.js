import React, { Component } from "react";
import firebase from "firebase";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  state = {};

  handleLogout = () => {
    const { history } = this.props;
    firebase.auth().signOut();
    history.push("/");
  };

  render() {
    return (
      <button className='logout-button' onClick={this.handleLogout}>
        sign Out
      </button>
    );
  }
}

export default withRouter(Logout);
