import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { getSocialFormatDate } from "../../../../../utils/DateUtility";
import {
  Comment as CommentIcon,
  ThumbUp as ThumbUpIcon,
  MoreHoriz as MoreHorizIcon,
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
import { useState } from "react";
import CommentsList from "../../../../../shared-components/list/comments/CommentsList";
import Button from "../../../button/Button";

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
}));

function IExpandedStory({ story = { user: {}, contentUrls: [] }, ...props }) {
  const classes = useStyles();
  const [expandedStory, toggleExpandedStory] = useState(false);

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
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title={story.user.userName}
        subheader={getSocialFormatDate(story.date)}
      />
      <IImageSlider>
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
            color="textSecondary"
            component="p"
            dangerouslySetInnerHTML={{ __html: story.content }}
          ></Typography>
        </ICardContent>
      )}

      <ICardActions disableSpacing>
        <Button startIcon={<ThumbUpIcon />} text={5} />
        <Button
          startIcon={<CommentIcon />}
          text={5}
          onClick={() => toggleExpandedStory(!expandedStory)}
        />
      </ICardActions>
      <ICardActions>
        <CreateComment
          user={story.user}
          parentId={story._id}
          rootId={story._id}
          active={true}
        />
      </ICardActions>
      <ICardContent>
        <CommentsList comments={story.replies} />
      </ICardContent>
    </ICard>
  );
}

export default withRouter(IExpandedStory);
