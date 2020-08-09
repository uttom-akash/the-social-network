import React, { Component } from "react";
import LoginForm from "../../forms/login/LoginForm";
import RegisterForm from "../../forms/register/RegisterForm";
import Button from "../../common/button/Button";
import logo from "../../assets/ialogo.png";
import {
  Grid,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  withStyles,
} from "@material-ui/core";
import { ICard, ICardContent } from "../../../library/card/Card";
import { purple, blueGrey, lightBlue, blue } from "@material-ui/core/colors";

const styles = {
  card: {
    maxWidth: 420,
    paddingRight: "1.5rem",
    paddingLeft: "1.5rem",
  },
  cardHeader: {
    textAlign: "center",
    color: lightBlue["A700"],
  },
  container: {
    height: "100%",
    minHeight: "100vh",
  },
};

class Login extends Component {
  state = {
    login: true,
    alternateText: "you are not a member yet ?",
    alternateButton: "Register",
  };

  onAlter = () => {
    let login, alternateText, alternateButton;
    if (!this.state.login) {
      login = !this.state.login;
      alternateText = "you are not a member yet ?";
      alternateButton = "register";
    } else {
      login = !this.state.login;
      alternateText = "you are already a member?";
      alternateButton = "login";
    }

    this.setState({ login, alternateText, alternateButton });
  };

  onLogin = () => {
    this.props.history.push("/");
  };
  render() {
    const { login, alternateText, alternateButton } = this.state;
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.container}
        direction="column"
        alignItems="center"
        justify="space-around"
      >
        <Grid item container justify="center">
          <Avatar variant="square" src={logo} />
          <Typography variant="h4">The Social Network</Typography>
        </Grid>
        <Grid item container direction="column" alignItems="center">
          <Typography variant="h6" color="textSecondary">
            {alternateText}
          </Typography>
          <Button
            variant="outlined"
            text={alternateButton}
            onClick={this.onAlter}
          />
        </Grid>
        <Card className={classes.card} variant="outlined">
          <CardHeader
            className={classes.cardHeader}
            title={login ? "Login" : "Register"}
          />
          <CardContent>
            {login ? <LoginForm onLogin={this.onLogin} /> : <RegisterForm />}
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
export default withStyles(styles)(Login);
