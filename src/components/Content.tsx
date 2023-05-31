import { Box } from "@mui/material";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";

export const Content = () => {
  return (
    <Box sx={{ flex: 1, width: `calc(100% - ${432}px)` }}>
      <Routes>
        <Route path="" element={<Dashboard />} />
      </Routes>
      <Outlet />
    </Box>
  );
};
