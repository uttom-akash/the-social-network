import React from "react";
import { Redirect } from "react-router-dom";

export const getDefaultURI = () => {
  let redirectedUrl = "/";
  return redirectedUrl;
};

export default function DefaultRoute() {
  return <Redirect to={getDefaultURI()} />;
}
