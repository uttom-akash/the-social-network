import { VisibilityOff, Visibility } from "@material-ui/icons";

import React from "react";
import { useState } from "react";
const {
  styled,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} = require("@material-ui/core");

export const ITextField = styled(TextField)({});

export const IPasswordField = React.forwardRef(({ id = "", ...props }, ref) => {
  const [showPassword, toggleShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <ITextField
      ref={ref}
      id={id}
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <IconButton
            aria-label="toggle password visibility"
            size="small"
            onClick={() => toggleShowPassword(!showPassword)}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        ),
      }}
    />
  );
});
