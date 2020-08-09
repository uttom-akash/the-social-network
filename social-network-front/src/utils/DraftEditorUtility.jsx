import { convertFromHTML, ContentState, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

export function getDraftStateFromHtml(htmlText) {
  const blocksFromHTML = convertFromHTML(htmlText);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return EditorState.createWithContent(state);
}

export function getHtmlFromDraftState(editorState) {
  const content = stateToHTML(editorState.getCurrentContent());
  if (content === "<p><br></p>") {
    return "";
  }
  return content;
}
