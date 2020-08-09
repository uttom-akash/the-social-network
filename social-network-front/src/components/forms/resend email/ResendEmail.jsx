import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import Button from "../../common/button/Button";
import "./ResendEmail.css";
import UserApi from "../../../api/endpoints/UserApi";

export default class ResendEmail extends Component {
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
    UserApi.resendEmail({ password, email })
      .then((resp) =>
        this.setState({ loading: false, status: "email sent to your address" })
      )
      .catch((err) =>
        this.setState({
          loading: false,
          status: "something unexpected happend,try again..",
        })
      );
  };

  render() {
    const { email, password, status } = this.state;
    return (
      <div className="resend-email-page">
        <h3>Resend Email</h3>
        <div>
          <p>You can also register here..</p>
          <Button
            text={"register"}
            onClick={() => this.props.history.push("/login")}
          />
        </div>
        <div className="content">
          <Form onSubmit={this.onSubmit}>
            {!!status && <Message>{status}</Message>}
            <Form.Field>
              <Form.Input
                required
                name="email"
                value={email}
                onChange={this.onChange}
                placeholder="email"
              />
            </Form.Field>
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
            <Button text="resend" />
          </Form>
        </div>
      </div>
    );
  }
}
