import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

const Home = ({ user }) => {
  const { email, phoneNumber, displayName } = user;
  return (
    <div className='home'>
      <h1>Home</h1>
      <button
        onClick={() => firebase.auth().signOut()}
        className='logout-button'
      >
        Logout
      </button>
      <div className='profile'>
        <h2>Profile</h2>
        <h4>Name: {displayName ? displayName : "Unknown"}</h4>
        <h4>Email: {email ? email : "Unknown"}</h4>
        <h4>Phone Number: {phoneNumber ? phoneNumber : "Unknown"}</h4>
      </div>
      <div className='activity'>
        <h2>Activity</h2>
        <Link to='/posts'>View Posts ➤</Link>
      </div>
    </div>
  );
};

export default Home;
