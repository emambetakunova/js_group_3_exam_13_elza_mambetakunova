import React from 'react';
import {Route, Switch} from "react-router-dom";

import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import AddPlace from "./containers/AddPlace/AddPlace";
import PlaceBuilder from "./containers/PlaceBuilder/PlaceBuilder";
import FullPlace from "./containers/FullPlace/FullPlace";

const Routes = ({user}) => {
  return (
    <Switch>
      <Route path="/" exact component={PlaceBuilder}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/add" exact component={AddPlace}/>
      <Route path="/places/:id" exact component={FullPlace}/>
    </Switch>
  );
};

export default Routes;