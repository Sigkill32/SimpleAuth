import React, { Component } from "react";
import app from "../config/firebaseConf";
import firebase from "firebase";
import PhoneSignIn from "./PhoneSignIn";
import { withRouter } from "react-router-dom";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleSignUp = async () => {
    const { username, password } = this.state;
    const { history } = this.props;
    await app
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(history.push("/"))
      .catch(error => this.setState({ error }));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await app
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const token = result.credential.accessToken;
        const user = result.user;
        console.log(user, token, result);
      })
      .catch(error => this.setState({ error }));
  };

  handleFB = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await app
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const token = result.credential.accessToken;
        const user = result.user;
        console.log(user, token, result);
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <div className='email-pass'>
          <input
            type='text'
            placeholder='username'
            name='username'
            onChange={this.handleChange}
          />
          <input
            type='password'
            placeholder='password'
            name='password'
            onChange={this.handleChange}
          />
          <button onClick={this.handleSignUp}>SignUp</button>
        </div>
        <div className='google-signin'>
          <button onClick={this.handleGoogleSignIn}>Sign In with google</button>
        </div>
        <div className='fb-signin'>
          <button onClick={this.handleFB}>Sign in with FB</button>
        </div>
        <div className='phone-signin'>
          <PhoneSignIn />
        </div>
        <h1>{error.message}</h1>
      </div>
    );
  }
}

export default withRouter(SignUp);
