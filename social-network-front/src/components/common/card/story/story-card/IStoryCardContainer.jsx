import React, { useState } from "react";
import IStoryCard from "./IStoryCard";
import UpdateStory from "../../../../forms/story/UpdateStory";

export default function IStoryCardContainer({ story, ...props }) {
  const [tryToEdit, toggleTryToEdit] = useState(false);
  console.log(props);
  return (
    <>
      {tryToEdit ? (
        <UpdateStory
          {...props}
          toggleTryToEdit={() => toggleTryToEdit(false)}
          story={story}
        />
      ) : (
        <IStoryCard
          {...props}
          toggleTryToEdit={() => toggleTryToEdit(true)}
          story={story}
        />
      )}
    </>
  );
}
