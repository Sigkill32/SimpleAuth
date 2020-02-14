import React, { Component } from "react";
import app from "../config/firebaseConf";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleLogin = async () => {
    const { username, password } = this.state;
    const { history } = this.props;
    await app
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(history.push("/"))
      .catch(error => this.setState({ error }));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { error } = this.state;
    const { authenticated } = this.props;
    return (
      <div>
        {authenticated ? (
          <>
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
            <button onClick={this.handleLogin}>Login</button>
            <h1>{error.message}</h1>
          </>
        ) : (
          <h2>Already logged In</h2>
        )}
      </div>
    );
  }
}

export default withRouter(Login);
