import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import React from "react";
import { Button, Icon } from "semantic-ui-react";

import { stateToHTML } from "draft-js-export-html";

import Picker from "emoji-picker-react";
import RichTextareaView from "./RichTextareaView";

export default class RichTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      emojiToggle: false,
    };
  }

  onChange = (editorState) => {
    this.setState({ editorState });
    // this.props.onTyping();
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  toogleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
  };

  blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === "code-block") return Styles.codeBlock;
  };

  focusEditor = () => {
    if (this.editor) {
      this.editor.focus();
      console.log(this.editor);
    }
  };

  onEmojiToggle = () => this.setState({ emojiToggle: !this.state.emojiToggle });

  insertCharacter = (characterToInsert, editorState) => {
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

  onEmojiClick = (event, emojiObject) => {
    const { editorState } = this.state;
    const newEditorState = this.insertCharacter(emojiObject.emoji, editorState);
    this.setState({ editorState: newEditorState, emojiToggle: false });
  };
  sendMessage = () => {
    const { editorState } = this.state;
    this.props.onMessageSend(stateToHTML(editorState.getCurrentContent()));
    this.setState({ editorState: EditorState.createEmpty() });
  };
  render() {
    const { emojiToggle, editorState } = this.state;
    return (
      <div className={Styles.chatUserControl}>
        {emojiToggle && (
          <Picker
            onBlur={this.onEmojiToggle}
            onEmojiClick={this.onEmojiClick}
          />
        )}
        <div className={Styles.chatInput}>
          <Button size="mini" basic icon="meh" onClick={this.onEmojiToggle} />
          <RichTextareaView />
          <Button size="mini" basic icon="send" onClick={this.sendMessage} />
        </div>
      </div>
    );
  }
}
