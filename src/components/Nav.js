import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ authenticated }) => (
  <div className='navbar'>
    <li>
      <Link to='/'>Home</Link>
    </li>
    {authenticated ? (
      <li>
        <Link to='/logout'>Logout</Link>
      </li>
    ) : (
      <li>
        <Link to='/login'>Login</Link>
      </li>
    )}
    <li>
      <Link to='/signup'>sign up</Link>
    </li>
    {authenticated && (
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
    )}
  </div>
);

export default Nav;
