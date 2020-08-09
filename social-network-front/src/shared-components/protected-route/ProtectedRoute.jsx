import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import DefaultRoute from "./DefaultRoute";

let adminRoutesOnly = [];

class PretectedRoute extends Component {
  checkRoutesPermission = () => {
    const { path } = this.props;
    let isAdmin = false;

    if (isAdmin) {
      return true;
    } else {
      let isAdminRoute = adminRoutesOnly.includes(path);
      return isAdminRoute === false;
    }
  };

  getView = (props) => {
    const { component: Component } = this.props;

    if (!!localStorage.getItem("__I_Token")) {
      if (this.checkRoutesPermission()) {
        return <Component {...props} />;
      } else {
        return <DefaultRoute />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  };

  render() {
    const { component: Component, ...rest } = this.props;
    return <Route {...rest} render={this.getView} />;
  }
}

export default PretectedRoute;
