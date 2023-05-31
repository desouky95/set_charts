import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyles } from "./theme/globalStyles";
import { DrawerNav } from "./components/Drawer";
import { Content } from "./components/Content";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider as StyledProvider } from "styled-components";
import { PocketProvider } from "./providers/PocketBaseProvider";

function App() {
  return (
    <>
      <PocketProvider>
        <BrowserRouter>
          <GlobalStyles />
          <StyledProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{ display: "flex", minHeight: "100svh" }}
              >
                <CssBaseline />
                <DrawerNav />
                <Content />
              </Box>
            </ThemeProvider>
          </StyledProvider>
        </BrowserRouter>
      </PocketProvider>
    </>
  );
}

export default App;
