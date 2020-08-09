import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { getSocialFormatDate } from "../../../../../utils/DateUtility";
import {
  MoreHoriz as MoreHorizIcon,
  ThumbUpAltOutlined,
  ModeCommentOutlined,
  ArrowRightAltOutlined,
  DeleteSharp,
} from "@material-ui/icons";
import IImageSlider from "../../../../../shared-components/image-slider/IImageSlider";
import { withRouter } from "react-router-dom";
import {
  ICard,
  ICardHeader,
  ICardContent,
  ICardActions,
  ICardMedia,
} from "../../../../../library/card/Card";
import { IAvatar } from "../../../../../library/avatar/IAvatar";
import CreateComment from "../../../../forms/story/CreateComment";
import Button from "../../../button/Button";
import CommentsList from "../../../../../shared-components/list/comments/CommentsList";
import { getValueOrDefault } from "../../../../../utils/ValueUtility";
import IDialog from "../../../../../shared-components/floater/IDialog";
import StoryApi from "../../../../../api/endpoints/StoryApi";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
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
  avatarBorder: {
    padding: "2px",
    border: `1px solid ${blue[100]}`,
    borderRadius: "50%",
  },
  moveRight: {
    marginLeft: "auto",
  },
}));

function IStoryCard(props) {
  const classes = useStyles();
  const [story, setStory] = useState({
    user: {},
    contentUrls: [],
    ...props.story,
  });
  const [expandedStory, toggleExpandedStory] = useState(false);
  const [showStoryOptions, toggleStoryOptions] = useState(false);
  const [expandComments, toggleExpandComments] = useState(false);

  const handleCommentCreation = (commentId) => {
    const tempStory = {
      ...story,
      replies: story.replies.concat(commentId),
    };
    setStory(tempStory);
  };

  const toggleLike = () => {
    StoryApi.toggleStoryRating({ storyId: story._id }).then((resp) => {
      if (resp.rated) {
        setStory({ ...story, ratedBy: story.ratedBy.concat(1) });
      }
    });
  };

  const handleDelete = () => {
    StoryApi.deleteStory(story._id).then((resp) => props.onDelete(story._id));
  };

  const onDeleteReply = (replyId) => {
    setStory({
      ...story,
      replies: story.replies.filter((id) => id != replyId),
    });
  };

  return (
    <ICard className={classes.root} variant="outlined">
      <ICardHeader
        avatar={
          <IAvatar
            src={story.user.proPic}
            onClick={() =>
              props.history.push(`/profile-view/${story.user._id}`)
            }
          />
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={() => toggleStoryOptions(!showStoryOptions)}
          >
            <MoreHorizIcon />
          </IconButton>
        }
        title={story.user.userName}
        subheader={getSocialFormatDate(story.date)}
      />
      <IDialog
        handleClose={() => toggleStoryOptions(!showStoryOptions)}
        open={showStoryOptions}
      >
        <List>
          <ListItem color="primary" button onClick={handleDelete}>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </IDialog>
      <IImageSlider
        navButtonsAlwaysInvisible={story.contentUrls.length > 1 ? false : true}
      >
        {story.contentUrls.map((contentUrl, index) => (
          <ICardMedia
            className={classes.media}
            key={index}
            image={contentUrl}
            title="Paella dish"
          />
        ))}
      </IImageSlider>
      {!!story.content.length && (
        <ICardContent>
          <Typography
            variant="body2"
            component="p"
            dangerouslySetInnerHTML={{ __html: story.content }}
          ></Typography>
        </ICardContent>
      )}
      <ICardActions disableSpacing>
        <Button
          size="small"
          color="secondary"
          startIcon={<ThumbUpAltOutlined />}
          text={getValueOrDefault(story.ratedBy.length, "")}
          onClick={toggleLike}
        />
        <Button
          size="small"
          startIcon={<ModeCommentOutlined />}
          text={getValueOrDefault(story.replies.length, "")}
          color="secondary"
          onClick={() => toggleExpandedStory(!expandedStory)}
        />

        <Button
          size="small"
          className={classes.moveRight}
          text="Edit"
          color="secondary"
          onClick={props.toggleTryToEdit}
        />
        {/* <Button
          size="small"
          text="Delete"
          color="secondary"
          onClick={handleDelete}
        /> */}
      </ICardActions>

      <Divider variant="middle" />
      <ICardActions>
        <CreateComment
          user={story.user}
          parentId={story._id}
          rootId={story._id}
          active={true}
          onCreate={handleCommentCreation}
        />
      </ICardActions>
      <Divider variant="middle" />
      {!!story.replies.length && (
        <Button
          size="small"
          color="primary"
          startIcon={<ArrowRightAltOutlined />}
          onClick={() => toggleExpandComments(!expandComments)}
          text={`${expandComments ? "view less " : "view all "} comments`}
        />
      )}
      {!!story.replies.length && (
        <ICardContent>
          <CommentsList onDelete={onDeleteReply} comments={story.replies} />
        </ICardContent>
      )}
    </ICard>
  );
}

export default withRouter(IStoryCard);
