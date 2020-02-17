import React from "react";

const Home = ({ user }) => {
  console.log(user);
  return (
    <div className='home'>
      <h1>Home</h1>
      <h2>Welcome {user.email}</h2>
    </div>
  );
};

export default Home;
