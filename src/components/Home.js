import React from "react";
import app from "firebase";

const Home = ({ user }) => {
  return (
    <div className='home'>
      <h1>Home</h1>
      <h2>Welcome {user.email}</h2>
      <button onClick={() => app.auth().signOut()}>sign Out</button>
    </div>
  );
};

export default Home;
