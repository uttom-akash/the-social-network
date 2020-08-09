import React, { Component } from "react";
import "./Navbar.css";
import logo from "../../assets/ialogo.png";
import CustomSearch from "../../common/search/CustomSearch";
import { withRouter } from "react-router-dom";
import { logout } from "../../../redux/actions/AccountAction";
import { connect } from "react-redux";
import UserApi from "../../../api/endpoints/UserApi";

class Navbar extends Component {
  state = {
    width: window.innerWidth,
    userOptions: [],
  };
  componentWillMount = () => {
    window.addEventListener("resize", this.updateWidth);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWidth);
  };

  selectResult = (e, { result }) =>
    this.props.history.push(`/profile-view/${result._id}`);

  queryChange = (value) =>
    UserApi.searchUser(value).then((resp) =>
      this.setState({ userOptions: resp })
    );

  updateWidth = () => {
    this.setState({ width: window.innerWidth });
  };

  onClick = (path) => this.props.history.push(path);
  onLogout = () =>
    this.props.logout().then((rsp) => this.props.history.push("/login"));

  render() {
    const { width, userOptions } = this.state;
    return (
      <div className="custom-navbar">
        <div className="navbar-header">
          <div className="header-logo" onClick={() => this.onClick("/profile")}>
            <img src={logo} />
          </div>
          <div className="header-title" onClick={() => this.onClick("/")}>
            <label>Social_Network</label>
          </div>
        </div>

        <div className="navbar-searchbar">
          {width > 572 && (
            <CustomSearch
              options={userOptions}
              queryChange={this.queryChange}
              selectResult={this.selectResult}
            />
          )}
        </div>
        <div className="navbar-feature">
          {width <= 572 && (
            <div className="feature-icon">
              <i aria-hidden="true" className="search large icon"></i>
            </div>
          )}
          <div
            className="feature-icon"
            onClick={() => this.onClick("/discover-people")}
          >
            <i aria-hidden="true" className="compass outline large icon"></i>
          </div>
          <div
            className="feature-user"
            onClick={() => this.onClick("/profile")}
          >
            <img src={this.props.user.proPic} />
          </div>
          <div className="feature-icon" onClick={this.onLogout}>
            <i aria-hidden="true" className="log out  large icon"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
