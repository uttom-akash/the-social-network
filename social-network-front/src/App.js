import React from "react";
import "./App.css";
import Navbar from "./components/navigation/navbar/Navbar";
import Routes from "./components/navigation/routes/Routes";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import { ILightTheme, IDarkTheme } from "./utils/Theme";

class App extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <div className="App">
        {location.pathname !== "/login" &&
          !!!RegExp("/confirm-email/.*/.*").exec(location.pathname) &&
          location.pathname !== "/resend-email" && <Navbar />}
        {/* <div className="page-container"> */}
        <ThemeProvider theme={ILightTheme}>
          <Routes />
        </ThemeProvider>
        {/* </div> */}
      </div>
    );
  }
}

export default withRouter(App);
