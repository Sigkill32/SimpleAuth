import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const { email, phoneNumber, displayName } = user;
  return (
    <div className='home'>
      <h1>Home</h1>
      <div className='profile'>
        <h2>Profile</h2>
        <h4>Name: {displayName ? displayName : "Unknown"}</h4>
        <h4>Email: {email ? email : "Unknown"}</h4>
        <h4>Phone Number: {phoneNumber ? phoneNumber : "Unknown"}</h4>
      </div>
      <div className='activity'>
        <h2>Activity</h2>
        <Link to='/posts'>View Posts</Link>
      </div>
    </div>
  );
};

export default Home;
