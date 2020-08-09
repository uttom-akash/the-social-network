import React from "react";
import { Switch, Route } from "react-router-dom";
import TimeLine from "../../page/timeline/TimeLine";
import Profile from "../../page/profile/Profile";
import Login from "../../page/login/Login";
import ProfileForm from "../../forms/profile/ProfileForm";
import DiscoverPeople from "../../page/discover/DiscoverPeople";
import ConfirmEmail from "../../page/confirm email/ConfirmEmail";
import ProfileAsViewer from "../../page/profile/ProfileAsViewer";
import ResendEmail from "../../forms/resend email/ResendEmail";

import PretectedRoute from "../../../shared-components/protected-route/ProtectedRoute";
import DefaultRoute from "../../../shared-components/protected-route/DefaultRoute";

export default () => {
  return (
    <Switch>
      <PretectedRoute path="/" exact component={TimeLine} />
      <PretectedRoute path="/profile" exact component={Profile} />
      <Route path="/login" exact component={Login} />
      <PretectedRoute path="/update-profile" exact component={ProfileForm} />
      <PretectedRoute
        path="/discover-people"
        exact
        component={DiscoverPeople}
      />
      <Route path="/confirm-email/:id/:code" exact component={ConfirmEmail} />
      <PretectedRoute
        path="/profile-view/:userId"
        exact
        component={ProfileAsViewer}
      />
      <Route path="/resend-email" exact component={ResendEmail} />
      <DefaultRoute />
    </Switch>
  );
};
