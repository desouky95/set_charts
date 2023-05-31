import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Home, Apps, Insights, Settings } from "@mui/icons-material";

export default function DrawerList() {

  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Apps />
        </ListItemIcon>
        <ListItemText primary="User Management" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Insights />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </List>
  );
}
