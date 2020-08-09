import React, { Component } from "react";
import Button from "../../common/button/Button";
import { connect } from "react-redux";
import IRichTextAreaEmojify from "../../../shared-components/text-editor/IRichTextAreaEmojify";
import {
  getHtmlFromDraftState,
  getDraftStateFromHtml,
} from "../../../utils/DraftEditorUtility";
import { withStyles } from "@material-ui/core";
import { Send as SendIcon } from "@material-ui/icons";
import { getSocialFormatDate } from "../../../utils/DateUtility";
import IImageSlider from "../../../shared-components/image-slider/IImageSlider";
import IUpload from "../../common/imageUpload/IUpload";
import {
  ICardHeader,
  ICard,
  ICardMedia,
  ICardContent,
  ICardActions,
} from "../../../library/card/Card";
import { IAvatar } from "../../../library/avatar/IAvatar";
import { EditorState } from "draft-js";
import StoryApi from "../../../api/endpoints/StoryApi";

const useStyles = (theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardContent: {
    display: "flex",
  },
  cardActions: {
    paddingBottom: "8px",
    paddingRight: "8px",
    display: "flex",
    justifyContent: "flex-end",
  },
});

class UpdateStory extends Component {
  state = {
    images: [],
    combinedContentUrls: [],
    editorState: EditorState.createEmpty(),
    focus: false,
    proPic: "",
  };

  componentDidMount = () => {
    this.setState({
      editorState: getDraftStateFromHtml(this.props.story.content),
      combinedContentUrls: this.props.story.contentUrls,
    });
  };
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      editorState: getDraftStateFromHtml(nextProps.story.content),
      combinedContentUrls: nextProps.story.contentUrls,
    });
  };

  onFileChange = (event) => {
    this.setState({ focus: true });
    const filePicker = event.target.files[0];
    if (!!!filePicker) return;

    let reader = new FileReader();
    reader.readAsDataURL(filePicker);

    reader.onload = (e) => {
      let images = [...this.state.images];
      images.push(e.target.result);
      this.setState({
        focus: true,
        images,
        combinedContentUrls: [...this.props.story.contentUrls, ...images],
      });
    };
  };
  onPopImage = (index) => {
    let images = [...this.state.images];
    images = images.filter((src, key) => key !== index);
    this.setState({
      images,
      combinedContentUrls: [...this.props.story.contentUrls, ...images],
    });
  };

  onChange = (ev) => this.setState({ [ev.target.name]: ev.target.value });
  onSubmit = (event) => {
    event.preventDefault();
    const { images: streamContents, editorState } = this.state;

    const content = getHtmlFromDraftState(editorState);
    const storyDto = {
      ...this.props.story,
      streamContents,
      content,
    };
    StoryApi.updateStory({ storyDto }).then((resp) =>
      this.setState({ images: [], editorState: EditorState.createEmpty() })
    );
  };

  onFocus = () => this.setState({ focus: true });
  onBlur = () => this.setState({ focus: false });

  render() {
    const { images, combinedContentUrls, focus, editorState } = this.state;
    const { proPic, userName } = this.props.user;
    const { classes } = this.props;
    return (
      <ICard variant="outlined">
        <ICardHeader
          avatar={<IAvatar src={proPic} className={classes.avatar} />}
          action={<IUpload onFileChange={this.onFileChange} />}
          title={userName}
          subheader={getSocialFormatDate(new Date())}
        />
        {!!combinedContentUrls.length && (
          <IImageSlider>
            {combinedContentUrls.map((src, index) => (
              <ICardMedia
                className={classes.media}
                key={index}
                image={src}
                title="Paella dish"
              />
            ))}
          </IImageSlider>
        )}
        <ICardContent className={classes.cardContent}>
          <IRichTextAreaEmojify
            emojiPosition={"right"}
            editorState={editorState}
            placeholder="Share your story .."
            onChange={(editorState) => this.setState({ editorState })}
          />
        </ICardContent>
        <ICardActions className={classes.cardActions}>
          <Button
            color="primary"
            size="small"
            text="Cancel"
            onClick={this.props.toggleTryToEdit}
          />
          <Button
            color="primary"
            size="small"
            className={classes.button}
            endIcon={<SendIcon />}
            text="Save"
            onClick={this.onSubmit}
          />
        </ICardActions>
      </ICard>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.User,
});
export default connect(mapStateToProps, {})(withStyles(useStyles)(UpdateStory));
