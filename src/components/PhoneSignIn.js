import React, { Component } from "react";
import firebase from "firebase";
import app from "../config/firebaseConf";

class PhoneSignIn extends Component {
  state = {
    number: "",
    code: "",
    isSMSSent: false,
    error: ""
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
    await app
      .auth()
      .signInWithPhoneNumber(number, window.recaptchaVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        this.setState({ isSMSSent: true });
      })
      .catch(error => this.setState({ error }));
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
      this.setState({ isSMSSent: false });
    }
  };

  render() {
    const { isSMSSent, error } = this.state;
    return (
      <div className='phone-auth-container'>
        <input type='text' onChange={this.handleChange} />
        <button id='button' onClick={this.onSignInSubmit}>
          SignIn with phone
        </button>
        {isSMSSent && (
          <div className='otp-container'>
            <input type='text' onChange={this.handleCode} placeholder='OTP' />
            <button onClick={this.handleVerify}>Verify</button>
          </div>
        )}
        <h2>{error.message}</h2>
      </div>
    );
  }
}

export default PhoneSignIn;
