import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import {
  deepPurple,
  indigo,
  blue,
  lightBlue,
  blueGrey,
  grey,
  lightGreen,
} from "@material-ui/core/colors";

export const ILightTheme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: grey["50"],
      },
    },
    MuiGrid: {
      root: {
        background: grey["50"],
      },
    },
    MuiButton: {
      textPrimary: {
        color: blue["A200"],
        "&:hover": {
          color: blue["A700"],
          backgroundColor: grey["100"],
        },
      },
      textSecondary: {
        color: grey["700"],
        "&:hover": {
          color: grey["900"],
          backgroundColor: grey["100"],
        },
      },
    },
  },
  palette: {
    primary: {
      main: blue["A200"],
    },
  },
  typography: {
    h4: {
      color: blueGrey[900],
    },
  },
});

export const IDarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: lightGreen["A400"],
    },
  },
});
