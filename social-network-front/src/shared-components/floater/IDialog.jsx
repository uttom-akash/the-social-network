import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Slide,
} from "@material-ui/core";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function IDialog({
  children,
  title = undefined,
  textContent = undefined,
  open,
  actions = [],
  handleClose,
  ...restProps
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {!!title && (
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      )}
      {children}
      <DialogContent>
        {!!textContent && (
          <DialogContentText id="alert-dialog-slide-description">
            {textContent}
          </DialogContentText>
        )}
      </DialogContent>
      {!!actions.length && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
