import React from "react";
import app from "firebase";

const Home = ({ user }) => {
  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome {user.email}</h2>
      <button onClick={() => app.auth().signOut()}>signOut</button>
    </div>
  );
};

export default Home;
