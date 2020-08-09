import React, { Component } from "react";
import "./Profile.css";
import PureImageUpload from "../../common/imageUpload/PureImageUpload";
import Button from "../../common/button/Button";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import {
  changeProfileImage,
  onFollow,
  onUnfollow,
} from "../../../redux/actions/AccountAction";

import UserListing from "../../common/listing/UserListing";
import IList from "../../common/listing/IList";

import userApi from "../../../api/endpoints/UserApi";
import StoryApi from "../../../api/endpoints/StoryApi";

class Profile extends Component {
  state = {
    proPic: "",

    userName: "",
    name: "",
    email: "",
    date: "",
    followUsers: [],
    followingUsers: [],
    staredPost: [],

    tempProPic: "",
    openedProPic: false,
    changeImage: false,

    modal: false,
    post: [],
    followers: [],
    followings: [],

    bottomMenu: ["My Post", "Followings", "Followers"],
    activeItem: "My Post",
  };

  componentWillMount = () => {
    const { user } = this.props;
    const { followers, followings } = user;
    let bottomMenu = [
      "My Post",
      `${!!followings && followings.length} Followings`,
      `${!!followers && followers.length} Followers`,
    ];
    this.setState({ ...user, tempProPic: user.proPic, bottomMenu });
    StoryApi.getMyStories().then((resp) =>
      this.setState({ post: resp.stories })
    );
  };

  componentWillReceiveProps = (nextProps) => {
    const { user } = nextProps;
    const { followers, followings } = user;
    let bottomMenu = [
      "My Post",
      `${!!followings && followings.length} Followings`,
      `${!!followers && followers.length} Followers`,
    ];
    this.setState({ ...user, tempProPic: user.proPic, bottomMenu });

    StoryApi.getMyStories().then((resp) =>
      this.setState({ post: resp.stories })
    );
  };

  onProfileHover = () => {
    this.setState({ changeImage: !this.state.changeImage });
  };
  onFileChange = (event) => {
    const filePicker = event.target.files[0];
    if (!!!filePicker) return;

    let reader = new FileReader();
    reader.readAsDataURL(filePicker);

    reader.onload = (e) => {
      this.setState({ proPic: e.target.result, openedProPic: true });
    };
  };

  changeProfileImage = () => {
    const { proPic } = this.state;
    this.setState({ tempProPic: proPic, openedProPic: false });
    this.props.changeProfileImage({ profileImage: proPic });
  };

  discardProfileImage = () => {
    const { tempProPic } = this.state;
    this.setState({ proPic: tempProPic, openedProPic: false });
  };

  onFollow = (id, index) => {
    const { _id } = this.props.user;
    if (id === _id) return;
    this.props.onFollow({ toFollowId: id }).then((resp) => {
      let user = [...this.state.followUsers];
      user[index]["following"] = true;
      this.setState({ followUsers: user });
    });
  };
  onUnfollow = (id, index) => {
    this.props.onUnfollow({ toUnfollowId: id }).then((resp) => {
      let user = [...this.state.followUsers];
      user[index]["following"] = false;
      this.setState({ followUsers: user });
    });
  };

  getViewList = () => {
    const { post, followUsers, activeItem } = this.state;
    const { user } = this.props;

    if ("My Post" === activeItem) {
      return (
        <IList
          listItems={post}
          styles={{
            list: { maxWidth: 720 },
            listItem: { marginBottom: "25px" },
          }}
        />

        // <LazyListing userId={user._id} posts={post} onUpdate={this.onUpdate} />
      );
    } else {
      return (
        <UserListing
          user={followUsers}
          unfollow={this.onUnfollow}
          follow={this.onFollow}
        />
      );
    }
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    const { followers, followings } = this.state;
    if (!!RegExp("followings", "i").exec(name)) {
      userApi
        .getSpecifiedUser({ userIds: followings })
        .then((resp) => this.setState({ followUsers: resp }));
    } else if (!!RegExp("followers", "i").exec(name)) {
      userApi
        .getSpecifiedUser({ userIds: followers })
        .then((resp) => this.setState({ followUsers: resp }));
    }
  };

  onUpdate = (data) => StoryApi.updateStory(data);

  render() {
    const {
      proPic,
      userName,
      name,
      email,
      changeImage,
      openedProPic,
      items,
      bottomMenu,
      activeItem,
    } = this.state;
    return (
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-cover">
            <div
              className="pro-pic"
              onMouseEnter={() => this.setState({ changeImage: true })}
              onMouseLeave={() => this.setState({ changeImage: false })}
            >
              <img src={proPic} />
              {!openedProPic && changeImage && (
                <label htmlFor="propic-upload" className="image-change">
                  change image
                </label>
              )}
              {openedProPic && (
                <div className="floating-confirm-discard">
                  <label onClick={this.changeProfileImage}>confirm</label>
                  <label onClick={this.discardProfileImage}>discard</label>
                </div>
              )}
            </div>
            <div className="user">
              <div className="user-name">{userName}</div>
              <Button
                text="Edit Profile"
                clsName="custom-btn"
                onClick={() => this.props.history.push("/update-profile")}
              />
            </div>
          </div>
          <div className="about-content">
            <h4>About</h4>
            <div className="name">
              <label className="identifier">Name: </label>
              <label>{name}</label>
            </div>
            <div className="email">
              <label className="identifier">Email: </label>
              <label>{email}</label>
            </div>
          </div>
        </div>
        <div className="own-feed">
          <Menu pointing secondary>
            {bottomMenu.map((item, index) => (
              <Menu.Item
                key={index}
                name={item}
                active={activeItem === item}
                onClick={this.handleItemClick}
              />
            ))}
          </Menu>
          <div className="result-segment">{this.getViewList()}</div>
        </div>
        <PureImageUpload
          onFileChange={this.onFileChange}
          clsName="propic-upload"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.User,
});
export default connect(mapStateToProps, {
  changeProfileImage,
  onFollow,
  onUnfollow,
})(Profile);
