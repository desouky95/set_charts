import { Box, Divider, Drawer, Toolbar } from "@mui/material";
import React from "react";
import DrawerList from "./DrawerList";
import logo from "../assets/logo.png";

const drawerWidth = 432;


export const DrawerNav = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Box width={"100%"} padding={"2rem 100px"}>
          <img src={logo} />
        </Box>
      </Toolbar>
      <Divider />
      <DrawerList />
    </Drawer>
  );
};
