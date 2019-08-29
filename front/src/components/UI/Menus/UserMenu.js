import React from 'react';
import {Navbar, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => (
  <Navbar>
    <NavLink tag={RouterNavLink} rel="nofollow" to={'/add'}>Add new place</NavLink>
    <NavLink tag={RouterNavLink} rel="nofollow" to={'/'}>Hello, {user.username}</NavLink>
    <NavLink tag={RouterNavLink} rel="nofollow" to="/" className="user" onClick={logout}>Log out</NavLink>
  </Navbar>
);

export default UserMenu;