import React, { Component } from "react";
import { Form, Message, Label } from "semantic-ui-react";
import Button from "../../common/button/Button";
import "./ProfileForm.css";
import { connect } from "react-redux";
import { updateProfile } from "../../../redux/actions/AccountAction";

class ProfileForm extends Component {
  state = {
    name: "",
    newPassword: "",
    confirmPassword: "",
    password: "",

    loading: false,
    success: false,
    error: false,
    status: "",
    formError: {},
  };

  componentWillMount = () => {
    const { name } = this.props.user;
    this.setState({ name });
  };

  componentWillReceiveProps = (nextProps) => {
    const { name } = nextProps.user;
    this.setState({ name });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, formError: {} });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let formError = this.onValidate();

    this.setState({ loading: true, formError });
    if (Object.keys(formError).length === 0) {
      const { name, newPassword, password } = this.state;
      this.props
        .updateProfile({ name, newPassword, password })
        .then((resp) =>
          this.setState({ loading: false, status: "updated your info" })
        )
        .catch((err) =>
          this.setState({
            loading: false,
            status: "something unexpected happend,try again..",
          })
        );
    }
  };

  onValidate = () => {
    let error = {};
    const { newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword)
      error.confirmPassword = "password didn't match";
    return error;
  };

  render() {
    const {
      name,
      newPassword,
      confirmPassword,
      password,
      formError,
      status,
    } = this.state;
    return (
      <div className="update-form-container">
        <h3>Update Your Info</h3>
        <div className="update-content">
          <Form onSubmit={this.onSubmit}>
            {!!status && <Message>{status}</Message>}
            <label>Change Name</label>
            <Form.Field>
              <Form.Input
                placeholder="name"
                name="name"
                value={name}
                onChange={this.onChange}
              />
            </Form.Field>

            <div className="divider"></div>

            <label>Change Password</label>
            <Form.Field>
              <Form.Input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={this.onChange}
                placeholder="newPassword"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="password"
                error={
                  !!formError.confirmPassword && {
                    content: formError.confirmPassword,
                    pointing: "below",
                  }
                }
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.onChange}
                placeholder="confirm paswword"
              />
            </Form.Field>

            <div className="divider"></div>
            <label>Your password</label>
            <Form.Field>
              <Form.Input
                type="password"
                required
                name="password"
                value={password}
                onChange={this.onChange}
                placeholder="password"
              />
            </Form.Field>

            <Button text="update" />
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps, { updateProfile })(ProfileForm);
