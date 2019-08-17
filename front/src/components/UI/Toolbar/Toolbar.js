import React, {Fragment} from 'react';
import {Nav, Navbar, NavbarBrand} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

import AnonymousMenu from "../Menus/AnonymousMenu";
import UserMenu from "../Menus/UserMenu";

const Toolbar = ({user,logout}) => {
  return (
    <Fragment>
      <Navbar color="info" light expand="md">
        <NavbarBrand tag={RouterNavLink} to={user && user.role === 'admin' ? "/admin" : "/"}>Places</NavbarBrand>
        <Nav className="ml-auto" navbar>
          {user ? <UserMenu user={user} logout={logout}/>: <AnonymousMenu/>}
        </Nav>
      </Navbar>
    </Fragment>
  );
};

export default Toolbar;