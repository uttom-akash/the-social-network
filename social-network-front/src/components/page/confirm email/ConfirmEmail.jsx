import React, { Component } from "react";
import UserApi from ".././../../api/endpoints/UserApi";
import Button from "../../common/button/Button";

class ConfirmEmail extends Component {
  state = {
    confirmed: 0,
  };
  componentWillMount = () => {
    const { id, code } = this.props.match.params;
    UserApi.confirmEmail(id, code).then((resp) =>
      this.setState({ confirmed: resp })
    );
  };

  render() {
    return (
      <div className="confirm-page">
        {this.state.confirmed ? (
          <div className="confirm-content">
            <div> Successfully completed your registration</div>
            <Button
              text={"login"}
              onClick={() => this.props.history.push("/login")}
            />
          </div>
        ) : (
          <div className="confirm-content">
            <h3>Sorry</h3>
            <div>You code is not valid...</div>
            <Button
              text={"resend email"}
              onClick={() => this.props.history.push("/resend-email")}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ConfirmEmail;
