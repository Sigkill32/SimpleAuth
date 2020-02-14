import React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
  <div>
    <li>
      <Link to='/'>Home</Link>
    </li>
    <li>
      <Link to='/login'>Login</Link>
    </li>
    <li>
      <Link to='/signup'>signup</Link>
    </li>
  </div>
);

export default Nav;
