import React from "react";
import Styles from "./RichTextArea.module.css";
import { Editor, EditorState, RichUtils } from "draft-js";
import "../../../node_modules/draft-js/dist/Draft.css";

const dummyCB = () => {};

const getDefaultBlockStyle = (contentBlock) => {
  const type = contentBlock.getType();
  if (type === "code-block") return Styles.codeBlock;
};

export default function IRichTextArea({
  className = "",
  placeholder = "",
  editorState = EditorState.createEmpty(),
  handleKeyCommand = null,
  onChange = dummyCB,
  onFocus = dummyCB,
  setBlockStyle = getDefaultBlockStyle,
}) {
  const editorRef = React.createRef();

  const onEditorFocus = () => {
    if (!!editorRef) {
      editorRef.current.focus();
    }
  };

  const handleDraftKeyCommand =
    handleKeyCommand ||
    ((command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        onChange(newState);
        return "handled";
      }
      return "not-handled";
    });

  // const togleCode = () => {
  //   this.onChange(RichUtils.toggleCode(this.state.editorState));
  // };

  const styleClassname = Styles.draftEditorStyle + " " + className;

  return (
    <div className={styleClassname} onClick={onEditorFocus}>
      <Editor
        placeholder={placeholder}
        ref={editorRef}
        editorState={editorState}
        handleKeyCommand={handleDraftKeyCommand}
        onChange={onChange}
        blockStyleFn={setBlockStyle}
      />
    </div>
  );
}
