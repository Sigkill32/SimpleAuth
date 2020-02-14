import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import app from "./config/firebaseConf";
import ProtectedRoute from "./components/ProtectedRoute";

class App extends Component {
  state = {
    authenticated: false,
    user: null
  };

  componentDidMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) this.setState({ authenticated: true, user: user });
      else this.setState({ authenticated: false });
    });
  }

  render() {
    const { authenticated, user } = this.state;
    return (
      <div>
        <h1>Hello world</h1>
        <BrowserRouter>
          <Nav />
          {/* <Route exact path='/' component={Home} /> */}
          <ProtectedRoute
            exact
            path='/'
            component={Home}
            authenticated={authenticated}
            user={user}
          />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;