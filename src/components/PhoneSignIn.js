import React, { Component } from "react";
import firebase from "firebase";
import app from "../config/firebaseConf";

class PhoneSignIn extends Component {
  state = {
    number: ""
  };

  handleChange = e => {
    const { value: number } = e.target;
    this.setState({ number });
  };

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("button", {
      size: "invisible"
    });
  }

  onSignInSubmit = async () => {
    const { number } = this.state;
    const phone = "+918861741968";
    await app
      .auth()
      .signInWithPhoneNumber(phone, window.recaptchaVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <input type='number' onChange={this.handleChange} />
        <button id='button' onClick={this.onSignInSubmit}>
          SignIn with phone
        </button>
      </div>
    );
  }
}

export default PhoneSignIn;
