import React, { Component } from "react";
import IRichTextAreaEmojify from "../../../shared-components/text-editor/IRichTextAreaEmojify";
import { stateToHTML } from "draft-js-export-html";
import { EditorState } from "draft-js";
import { IconButton, Grid } from "@material-ui/core";
import { Send as SendIcon } from "@material-ui/icons";
import { useState } from "react";
import StoryApi from "../../../api/endpoints/StoryApi";

export default function CreateComment({
  user,
  parentId,
  rootId,
  onFocus,
  ...props
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onCreate = () => {
    const content = stateToHTML(editorState.getCurrentContent());
    let storyDto = {
      rootId,
      parentId,
      userId: user._id,
      content,
    };
    StoryApi.createStory({
      storyDto,
    }).then((resp) => {
      setEditorState(EditorState.createEmpty());
      props.onCreate(resp.story._id);
    });
  };

  return (
    <form style={{ width: "100%" }}>
      <Grid container xs alignItems="center">
        <IRichTextAreaEmojify
          placeholder="add comment"
          onChange={setEditorState}
          editorState={editorState}
          onFocus={onFocus}
          emojiIconSize="small"
        />
        <IconButton color="primary" onClick={onCreate}>
          <SendIcon fontSize="small" />
        </IconButton>
      </Grid>
    </form>
  );
}
