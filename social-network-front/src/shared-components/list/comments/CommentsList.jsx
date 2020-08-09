import React from "react";
import { Comment, Header } from "semantic-ui-react";
import IComment from "../../card/contents/IComment";

export default function CommentsList({ comments, onDelete }) {
  return (
    <Comment.Group threaded>
      {comments.map((commentId, index) => (
        <IComment onDelete={onDelete} key={index} commentId={commentId} />
      ))}
    </Comment.Group>
  );
}
