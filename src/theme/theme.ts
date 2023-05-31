import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#282828",
    },
  },
  breakpoints: ["40em", "52em", "64em", "80em"] as any,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#282828",
          colot: "#FFF",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: "#FFF",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "#FFF",
          svg: {
            color: "#FFF",
          },
          paddingLeft: "60px",
          paddingRight: "60px",
        },
      },
    },
  },
});

export const indigoDye = {
  main: "#1d476c",
  900: "#1d476c",
  800: "#2a638b",
  700: "#33739d",
  600: "#3e84ae",
  500: "#4991b9",
  400: "#5e9fc1",
  300: "#76afca",
  200: "#97c6da",
  100: "#bddce8",
  50: "#e4f1f5",
};
