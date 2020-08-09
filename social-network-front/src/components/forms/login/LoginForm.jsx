import React, { Component } from "react";
import Button from "../../common/button/Button";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/AccountAction";
import { ITextField, IPasswordField } from "../../../library/form/IForm";
import { ISnackbar } from "../../../shared-components/notifications/ISnackbar";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",

    loading: false,
    success: false,
    error: false,
    status: "",
    formError: {},
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, formError: {} });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const { email, password } = this.state;

    this.props
      .login({ email, password })
      .then((user) => this.props.onLogin(user))
      .catch((error) => {
        this.setState({
          loading: false,
          status: error.response.data.statusMessage,
        });
      });
  };
  handleSnackBarClose = () => {
    this.setState({ status: "" });
  };
  render() {
    const { email, password, loading, status } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <ISnackbar
          autoHideDuration={1500}
          open={!!status}
          message={status}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.handleSnackBarClose}
          variant="filled"
          severity="error"
        />
        <ITextField
          id="standard-basic"
          type="email"
          required
          label="Email"
          name="email"
          value={email}
          placeholder="your@mail.com"
          fullWidth
          margin="normal"
          onChange={this.onChange}
        />

        <IPasswordField
          id="standard-basic"
          required
          label="Password"
          name="password"
          value={password}
          fullWidth
          margin="normal"
          onChange={this.onChange}
        />
        <Button color="primary" text="login" type="submit" />
      </form>
    );
  }
}

export default connect(null, { login })(LoginForm);
