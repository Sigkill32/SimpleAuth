import React, { Component } from "react";
import app from "firebase";

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) this.setState(user);
    });
  }

  render() {
    const { children } = this.props;
    const { user } = this.state;
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
  }
}

export default AuthProvider;
