import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { FlexLayout, Spacer, GridLayout } from "../../components/utils";
import { FilterMenu } from "./components/FilterMenu/FilterMenu";
import { usePocket } from "../../providers/PocketBaseProvider";
import { useEffectOnce } from "usehooks-ts";
import { PersonalityTypesChart } from "./components/Charts/PersonalityTypesChart/PersonalityTypesChart";
import { StudentsPerGradeChart } from "./components/Charts/StudentsPerGradeChart/StudentsPerGradeChart";
import { PerformancePerPersonalityChart } from "./components/Charts/PerformancePerPersonalityChart/PerformancePerPersonalityChart";
import { PersonalitySegmentationPerGradeChart } from "./components/Charts/PersonalitySegmentationPerGradeChart/PersonalitySegmentationPerGradeChart";
import { ELearningToolsChart } from "./components/Charts/ELearningToolsChart/ELearningToolsChart";
import { ELearningModelsChart } from "./components/Charts/ELearningModelsChart/ELearningModelsChart";

export default function () {
  const { login, user, getTotalStudents } = usePocket();

  useEffectOnce(() => {
    if (!user)
      login("george.gabra@progressiosolutions.com", "V6VxYjpkRPPyHKq2");
    getTotalStudents();
  });
  return (
    <Box sx={{ padding: "35px 40px" }}>
      <Typography variant="h4" fontWeight="bold">
        Platform Overview
      </Typography>

      <Spacer mt="26px" />
      <FlexLayout justifyContent={"flex-end"}>
        <FilterMenu />
      </FlexLayout>
      <Spacer mb={21} />
      <GridLayout columns={2} gridGap={"42px"}>
        <PersonalityTypesChart />
        <StudentsPerGradeChart />
      </GridLayout>
      <Spacer mb={43} />
      <GridLayout gridGap={43}>
        <PerformancePerPersonalityChart />
        <PersonalitySegmentationPerGradeChart />
        <ELearningModelsChart />
        <ELearningToolsChart />
      </GridLayout>
    </Box>
  );
}
