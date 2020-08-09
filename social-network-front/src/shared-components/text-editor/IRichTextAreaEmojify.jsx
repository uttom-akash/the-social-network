import React, { useState } from "react";
import { EditorState, Modifier } from "draft-js";
import IRichTextArea from "./IRichTextArea";
import { Button } from "semantic-ui-react";
import Picker from "emoji-picker-react";
import { EmojiEmotions as EmojiEmotionsIcon } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

export default function IRichTextAreaEmojify(props) {
  const [emojiShowing, toggleEmojiShowing] = useState(false);
  const handleEmojiToggle = () => toggleEmojiShowing(!emojiShowing);

  const insertCharacter = (characterToInsert, editorState) => {
    const currentContent = editorState.getCurrentContent(),
      currentSelection = editorState.getSelection();

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      characterToInsert
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );
    return newEditorState;
  };

  const handleEmojiSelection = (event, emojiObject) => {
    const { editorState, onChange } = props;
    const newEditorState = insertCharacter(emojiObject.emoji, editorState);
    onChange(newEditorState);
    toggleEmojiShowing(false);
  };

  return (
    <>
      {props.emojiPosition !== "right" && (
        <IconButton onClick={handleEmojiToggle}>
          <EmojiEmotionsIcon fontSize={props.emojiIconSize} />
        </IconButton>
      )}
      {emojiShowing && (
        <Picker
          onBlur={handleEmojiToggle}
          onEmojiClick={handleEmojiSelection}
        />
      )}
      <IRichTextArea {...props} />
      {props.emojiPosition === "right" && (
        <IconButton onClick={handleEmojiToggle}>
          <EmojiEmotionsIcon fontSize={props.emojiIconSize} />
        </IconButton>
      )}
    </>
  );
}
