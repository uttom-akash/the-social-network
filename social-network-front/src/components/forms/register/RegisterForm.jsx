import React, { Component } from "react";
import Button from "../../common/button/Button";
import UserApi from "../../../api/endpoints/UserApi";
import { ITextField, IPasswordField } from "../../../library/form/IForm";
import { ISnackbar } from "../../../shared-components/notifications/ISnackbar";

export default class RegisterForm extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",

    loading: false,
    success: false,
    error: false,
    responseStatus: { show: false },
    formError: {},
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, formError: {} });
  };
  onSubmit = (event) => {
    event.preventDefault();
    let formError = this.onValidate();

    this.setState({ loading: true, formError });
    if (Object.keys(formError).length === 0) {
      const { userName, email, password } = this.state;
      UserApi.register({
        user: {
          userName,
          password,
          email,
          followers: [],
          followings: [],
          staredPost: [],
        },
      })
        .then((resp) =>
          this.setState({
            loading: false,
            responseStatus: {
              show: true,
              type: "success",
              message: "email sent to your address",
            },
          })
        )
        .catch((error) =>
          this.setState({
            loading: false,
            responseStatus: {
              show: true,
              type: "error",
              message: error.response.data.statusMessage,
            },
          })
        );
    }
  };

  onValidate = () => {
    let error = {};
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword)
      error.confirmPassword = "password didn't match";
    return error;
  };

  handleSnackBarClose = () => {
    this.setState({
      responseStatus: { ...this.state.responseStatus, show: false },
    });
  };
  render() {
    const {
      userName,
      email,
      password,
      confirmPassword,
      formError,
      responseStatus,
      loading,
    } = this.state;
    return (
      <form loading={loading} onSubmit={this.onSubmit}>
        <ISnackbar
          autoHideDuration={1500}
          open={responseStatus.show}
          message={responseStatus.message}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.handleSnackBarClose}
          variant="filled"
          severity={responseStatus.type}
        />
        <ITextField
          id="standard-basic"
          type="text"
          required
          label="UserName"
          fullWidth
          margin="normal"
          placeholder="user name"
          name="userName"
          value={userName}
          onChange={this.onChange}
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
        <IPasswordField
          id="standard-basic"
          required
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          fullWidth
          margin="normal"
          onChange={this.onChange}
          error={!!formError.confirmPassword}
          placeholder="confirm paswword"
          helperText={formError.confirmPassword}
        />
        <Button
          variant="outlined"
          color="primary"
          text="Register"
          type="submit"
        />
      </form>
    );
  }
}
