import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { v4 as uuidv4 } from "uuid";
import { CameraSharp } from "@material-ui/icons";

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
          <CameraSharp />
        </IconButton>
      </label>
    </div>
  );
}
