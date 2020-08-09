import React, { useState, useEffect } from "react";
import { Comment, Icon } from "semantic-ui-react";
import CreateComment from "../../../components/forms/story/CreateComment";
import StoryApi from "../../../api/endpoints/StoryApi";
import { getSocialFormatDate } from "../../../utils/DateUtility";
import {
  ThumbUpAltOutlined,
  ModeCommentOutlined,
  EditOutlined,
  DeleteOutline,
  ArrowRightAltOutlined,
} from "@material-ui/icons";
import { makeStyles, IconButton, Button, ButtonGroup } from "@material-ui/core";
import { getValueOrDefault } from "../../../utils/ValueUtility";

const useStyles = makeStyles({
  marginRight: {
    marginRight: "5px",
  },
  moveRight: { marginLeft: "auto" },
});
const replayPageSize = 4;
const countReplyPage = (totalReplies, replyPageSize) =>
  Math.ceil(totalReplies / replyPageSize);

export default function IComment({ commentId, onDelete }) {
  const [hideReplies, toggleHideReply] = useState(true);
  const [comment, setComment] = useState({
    user: {},
    replies: [],
    ratedBy: [],
  });
  const [isTriedToReply, toggleTryToReply] = useState(false);
  const [replyPage, setReplyPage] = useState(
    countReplyPage(comment.replies.length, replayPageSize)
  );

  const handleCommentCreation = (commentId) => {
    const tempComment = {
      ...comment,
      replies: comment.replies.concat(commentId),
    };
    setComment(tempComment);
  };

  useEffect(() => {
    setReplyPage(countReplyPage(comment.replies.length, replayPageSize));
  }, [comment.replies.length]);
  useEffect(() => {
    StoryApi.getStoryById(commentId).then((res) => setComment(res.story));
  }, [commentId]);

  const toggleLike = () => {
    StoryApi.toggleStoryRating({ storyId: comment._id }).then((resp) => {
      if (resp.rated) {
        setComment({ ...comment, ratedBy: comment.ratedBy.concat(1) });
      }
    });
  };

  const handleDelete = () => {
    StoryApi.deleteStory(comment._id).then((resp) => onDelete(comment._id));
  };

  const onDeleteReply = (replyId) => {
    setComment({
      ...comment,
      replies: comment.replies.filter((id) => id != replyId),
    });
  };

  const classes = useStyles();
  return (
    <>
      {!!comment && (
        <Comment>
          <Comment.Avatar src={comment.user.proPic} />
          <Comment.Content>
            <Comment.Author as="a">{comment.user.userName}</Comment.Author>
            <Comment.Metadata>
              <div>{getSocialFormatDate(comment.date)}</div>
              <div>
                <Icon name="star" />
                {getValueOrDefault(comment.ratedBy.length, "")}
              </div>
            </Comment.Metadata>
            <Comment.Text
              dangerouslySetInnerHTML={{ __html: comment.content }}
            ></Comment.Text>
            <Comment.Actions style={{ display: "flex" }}>
              <IconButton
                className={classes.marginRight}
                size="small"
                onClick={toggleLike}
              >
                <ThumbUpAltOutlined fontSize="small" />
              </IconButton>
              <IconButton
                className={classes.marginRight}
                size="small"
                onClick={() => toggleTryToReply(!isTriedToReply)}
              >
                <ModeCommentOutlined fontSize="small" />
              </IconButton>
              {!!comment.replies.length && (
                <Button
                  size="small"
                  startIcon={<ArrowRightAltOutlined />}
                  onClick={() => toggleHideReply(!hideReplies)}
                >
                  {hideReplies ? "view " : "hide "} replies
                </Button>
              )}
              <IconButton
                className={`${classes.moveRight} ${classes.marginRight}`}
                size="small"
              >
                <EditOutlined fontSize="small" />
              </IconButton>

              <IconButton size="small" onClick={handleDelete}>
                <DeleteOutline fontSize="small" />
              </IconButton>
            </Comment.Actions>
            {isTriedToReply && (
              <CreateComment
                user={comment.user}
                parentId={comment._id}
                rootId={comment.rootId}
                onCreate={handleCommentCreation}
              />
            )}
          </Comment.Content>
          {!!comment.replies.length && (
            <Comment.Group threaded collapsed={hideReplies}>
              {replyPage > 1 && (
                <Button
                  onClick={() => setReplyPage(replyPage - 1)}
                  size="small"
                  startIcon={<ArrowRightAltOutlined />}
                >
                  prev
                </Button>
              )}
              {comment.replies
                .slice(
                  (replyPage - 1) * replayPageSize,
                  (replyPage - 1) * replayPageSize + replayPageSize
                )
                .map((commentId, index) => (
                  <IComment
                    onDelete={onDeleteReply}
                    key={index}
                    commentId={commentId}
                  />
                ))}
              {replyPage <
                countReplyPage(comment.replies.length, replayPageSize) && (
                <Button
                  size="small"
                  onClick={() => setReplyPage(replyPage + 1)}
                  startIcon={<ArrowRightAltOutlined />}
                >
                  next
                </Button>
              )}
            </Comment.Group>
          )}
        </Comment>
      )}
    </>
  );
}
