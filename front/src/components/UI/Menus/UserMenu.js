import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {NavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => (
  <UncontrolledDropdown nav inNavbar>
    <DropdownToggle nav caret>
      Hello, {user.username}
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem>
        <NavLink to='/add_recipe'>Add recipe</NavLink>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem onClick={logout}>
        Log out
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

export default UserMenu;