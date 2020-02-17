import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { app } from "./config/firebaseConf";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import Posts from "./components/Posts";

class App extends Component {
  state = {
    authenticated: false,
    user: null
  };

  componentDidMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ authenticated: true, user: user });
      } else this.setState({ authenticated: false });
    });
  }

  render() {
    const { authenticated, user } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Nav authenticated={authenticated} />
          <ProtectedRoute
            exact
            path='/'
            component={Home}
            authenticated={authenticated}
            user={user}
          />
          <Route
            exact
            path='/login'
            render={props => <Login authenticated={authenticated} {...props} />}
          />
          <Route
            exact
            path='/signup'
            render={props => (
              <SignUp authenticated={authenticated} {...props} user={user} />
            )}
          />
          <ProtectedRoute
            exact
            path='/logout'
            component={Logout}
            authenticated={authenticated}
          />
          <ProtectedRoute
            exact
            path='/posts'
            component={Posts}
            authenticated={authenticated}
            user={user}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
