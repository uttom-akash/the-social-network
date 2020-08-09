import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function IUpload({ onFileChange }) {
  const classes = useStyles();
  const id = uuidv4();
  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id={id}
        type="file"
        onChange={onFileChange}
        multiple
      />
      <label htmlFor={id}>
        <IconButton aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}
