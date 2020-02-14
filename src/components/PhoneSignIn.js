import React, { Component } from "react";
import firebase from "firebase";
import app from "../config/firebaseConf";

class PhoneSignIn extends Component {
  state = {
    number: "",
    code: ""
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
    // const phone = "+919894616092";
    await app
      .auth()
      .signInWithPhoneNumber(number, window.recaptchaVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
      })
      .catch(error => console.log(error));
  };

  handleCode = e => {
    const { value: code } = e.target;
    this.setState({ code });
  };

  handleVerify = () => {
    const { code } = this.state;
    if (window.confirmationResult) {
      const credential = new firebase.auth.PhoneAuthProvider.credential(
        window.confirmationResult.verificationId,
        code
      );
      app.auth().signInWithCredential(credential);
    }
  };

  render() {
    return (
      <div>
        <input type='number' onChange={this.handleChange} />
        <button id='button' onClick={this.onSignInSubmit}>
          SignIn with phone
        </button>
        {window.confirmationResult && (
          <div>
            <input type='text' onChange={this.handleCode} placeholder='OTP' />
            <button onClick={this.handleVerify}>Verify</button>
          </div>
        )}
      </div>
    );
  }
}

export default PhoneSignIn;
