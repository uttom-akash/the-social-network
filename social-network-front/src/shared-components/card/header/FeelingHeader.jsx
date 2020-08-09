import React from "react";
import Styles from "./FeelingHeaderStyle.module.css";
import { Image, Header, Icon } from "semantic-ui-react";

export default function FeelingHeader({ feelingAuthor, userId }) {
  return (
    <div className={Styles.header}>
      <Header as="h5">
        <Image
          circular
          src="https://in.bmscdn.com/iedb/artist/images/website/poster/large/alexandra-daddario-16316-24-03-2017-15-00-32.jpg"
        />
        <Header.Content>Alex</Header.Content>
      </Header>
      <div className={Styles.options}>
        <Icon name="ellipsis horizontal" />
      </div>
    </div>
  );
}
