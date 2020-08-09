import React, { Component } from "react";
import "./TimeLine.css";
import Activity from "../../common/activity/Activity";
import CreateStory from "../../forms/story/CreateStory";
import { connect } from "react-redux";
import IList from "../../common/listing/IList";
import StoryApi from "../../../api/endpoints/StoryApi";
import { Grid } from "@material-ui/core";

class TimeLine extends Component {
  state = {
    stories: [],
  };

  componentWillMount = () => {
    const { user } = this.props;
    StoryApi.getFollowingsStories().then((res) =>
      this.setState({ stories: res.stories })
    );
  };

  componentWillReceiveProps = (nextProps) => {
    const { user } = nextProps;
    StoryApi.getFollowingsStories().then((res) =>
      this.setState({ stories: res.stories })
    );
  };

  toProfile = () => this.props.history.push("/profile");

  onSubmit = (story) => {
    const { _id, userName, proPic } = this.props.user;
    let stories = [
      {
        ...story,
        user: { _id, userName, proPic },
        date: new Date(),
        contentUrls: [],
        ratedBy: [],
        replies: [],
      },
      ...this.state.stories,
    ];

    return StoryApi.createStory(story).then((postResp) =>
      this.setState({ stories: [postResp.story].concat(this.state.stories) })
    );
  };

  onDelete = (id) => {
    let tempStories = this.state.stories.filter((story) => story._id !== id);
    this.setState({
      stories: tempStories,
    });
  };

  render() {
    const { stories } = this.state;
    const { user } = this.props;
    return (
      <Grid
        container
        style={{ paddingTop: "3rem" }}
        direction="column"
        alignItems="center"
      >
        <CreateStory onSubmit={this.onSubmit} toProfile={this.toProfile} />
        <IList
          listItems={stories}
          styles={{
            list: { maxWidth: 720 },
            listItem: { marginBottom: "25px" },
          }}
          itemProps={{
            onDelete: this.onDelete,
          }}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.User,
});
export default connect(mapStateToProps, {})(TimeLine);
