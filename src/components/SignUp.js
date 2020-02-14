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

  componentDidUpdate(prevProps) {
    const { authenticated, history } = this.props;
    if (authenticated !== prevProps.authenticated) {
      history.push("/");
      console.log(authenticated);
    }
  }

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
    const { authenticated, user } = this.props;
    return (
      <div className='signup-container'>
        <h2>Sign Up</h2>
        {authenticated && (
          <>
            <span>(logged in as {user.email})</span>
            <br />
          </>
        )}
        <div className='email-pass'>
          <h4>Sign in with email</h4>
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
        <h4>OR</h4>
        <br />
        <div className='google-signin'>
          <button onClick={this.handleGoogleSignIn}>Sign In with google</button>
        </div>
        <h4>OR</h4>
        <br />
        <div className='fb-signin'>
          <button onClick={this.handleFB}>Sign in with FB</button>
        </div>
        <h4>OR</h4>
        <br />
        <div className='phone-signin'>
          <PhoneSignIn />
        </div>
        <h1>{error.message}</h1>
      </div>
    );
  }
}

export default withRouter(SignUp);
