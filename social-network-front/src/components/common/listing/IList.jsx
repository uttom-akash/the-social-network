import React from "react";
import { List, makeStyles } from "@material-ui/core";
import { ListItem } from "semantic-ui-react";
import IStoryCard from "../card/story/story-card/IStoryCard";
import IStoryCardContainer from "../card/story/story-card/IStoryCardContainer";
import { v4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: (props) => (!!props.list.width ? props.list.width : "100%"),
    maxWidth: (props) => (!!props.list.maxWidth ? props.list.maxWidth : "100%"),
  },
}));

const useItemStyles = makeStyles((theme) => ({
  root: {
    width: (props) => (!!props.listItem.width ? props.listItem.width : "100%"),
    maxWidth: (props) =>
      !!props.listItem.maxWidth ? props.listItem.maxWidth : "100%",
    marginBottom: (props) =>
      props.listItem.marginBottom ? props.listItem.marginBottom : "5px",
  },
}));

const itemRendererFn = (item, props) => (
  <IStoryCardContainer {...props} story={item} key={v4()} />
);

export default function IList({
  listItems = [],
  itemRenderer = itemRendererFn,
  styles = { list: {}, listItem: {} },
  listProps,
  listItemProps,
  itemProps,
}) {
  const classes = useStyles({ list: { ...styles.list } });
  const itemClasses = useItemStyles({ listItem: { ...styles.listItem } });
  console.log(listItems.length);
  return (
    <List className={classes.root} {...listProps}>
      {listItems.map((item, index) => (
        <ListItem className={itemClasses.root} key={index} {...listItemProps}>
          {itemRenderer(item, itemProps)}
        </ListItem>
      ))}
    </List>
  );
}
