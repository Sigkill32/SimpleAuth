import React, { Component } from "react";
import { app } from "../config/firebaseConf";
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
      .catch(error => this.setState({ error }));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps) {
    const { authenticated, history } = this.props;
    if (authenticated !== prevProps.authenticated) {
      history.push("/");
    }
  }

  render() {
    const { error } = this.state;
    const { authenticated } = this.props;
    return (
      <div className='login-container'>
        {authenticated ? (
          <h2>Already logged IN</h2>
        ) : (
          <>
            <h2>Login</h2>
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
            <h1 style={{ color: "red", marginTop: "20px" }}>{error.message}</h1>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Login);
