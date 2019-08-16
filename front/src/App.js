import React, {Component, Fragment} from 'react';
import {Container} from "reactstrap";
import {withRouter} from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import {connect} from "react-redux";

import Routes from "./Routes";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {logoutUser} from "./store/actions/userAction";

class App extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <NotificationContainer/>
          <Toolbar
            user={this.props.user}
            logout={this.props.logoutUser}
          />
        </header>
        <Container style={{marginTop: '20px'}}>
          <Routes user={this.props.user}/>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
