import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const ISnackbar = React.forwardRef(
  ({ variant, severity, message, onClose, ...props }, ref) => {
    return (
      <Snackbar ref={ref} {...props} onClose={onClose}>
        <Alert variant={variant} severity={severity} onClose={onClose}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
);
