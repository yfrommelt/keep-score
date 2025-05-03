import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.colored": {
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiAutocomplete-endAdornment": {
              color: "white",
            },
            "& .MuiAutocomplete-popupIndicator": {
              color: "white",
            },
            "& .MuiAutocomplete-clearIndicator": {
              color: "white",
            },
          },
        },
      },
    },
  },
});

export default theme;
