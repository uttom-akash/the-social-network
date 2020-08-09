import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import { blue, blueGrey, purple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatarBorder: {
    padding: "1px 1px",
    borderRadius: "50%",
    background: `linear-gradient(to right bottom, ${blue["A200"]},${blue["A400"]} , ${purple["A700"]})`,
  },
  padding: {
    padding: "2px 2px",
    borderRadius: "50%",
    backgroundColor: "white",
  },
  avatar: {
    backgroundColor: blueGrey["100"],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export const IAvatar = React.forwardRef(({ onClick, ...props }, ref) => {
  const classes = useStyles();
  return (
    <div className={classes.avatarBorder}>
      <div className={classes.padding}>
        <Avatar
          onClick={onClick}
          ref={ref}
          {...props}
          className={classes.avatar}
        />
      </div>
    </div>
  );
});
