import React from "react";
import { Button } from "@material-ui/core";
// import './Button.css'

export default ({ text, onClick, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      {text}
    </Button>
  );
};
