import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { usePocket } from "../../../../../providers/PocketBaseProvider";
import { ChartContainer } from "../../../../../components/ChartsUtils";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { FlexLayout, Spacer } from "../../../../../components/utils";
import { indigoDye } from "../../../../../theme/theme";
import { useSearchParams } from "react-router-dom";
import { parseParams } from "../../../../../utils/parseParams";



type Data = {
  grade: number;
  id: string;
  student_count: number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { grade, student_count } = payload[0].payload;
    return (
      <Paper sx={{ padding: "0.5rem" }} elevation={4}>
        <Typography fontWeight="bold">{`${student_count} students`}</Typography>
      </Paper>
    );
  }

  return null;
};
export const StudentsPerGradeChart = () => {
  const { pb, totalStudents } = usePocket();

  const [data, setData] = useState<Data[]>([]);

  const [params] = useSearchParams();

  
  const request = useCallback(async () => {
    try {
      const resp = await pb.collection("students_per_grade").getFullList<Data>({
        sort: "-grade",
        filter: `${parseParams(["grade"], params).toString()}`,
      });
      setData(resp);
    } catch (error) {}
  }, [params.toString()]);

  useEffect(() => {
    request();
  }, [params]);

  return (
    <ChartContainer justifyContent={"space-between"} flexDirection={"column"}>
      <FlexLayout>
        <FlexLayout flexDirection={"column"} minWidth={"185px"}>
          <Typography fontSize="21px" fontWeight={"bold"}>
            Students Per Grade
          </Typography>
          <Typography fontSize="14px" fontWeight="600" color="#397ABD">
            Total : {totalStudents} students
          </Typography>
          <Spacer mb="1rem" />
          <Divider />

          {/* <Spacer my="3rem">
          {Array.from(colorsMap).map(([name, color]) => (
            <LegendItem name={name} background={color} />
          ))}
        </Spacer> */}
          <Divider />
        </FlexLayout>
        <FlexLayout flex={1}></FlexLayout>
      </FlexLayout>
      <Spacer mb="1rem" />

      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart
          width={150}
          height={300}
          data={data}
          layout="vertical"
          barSize={24}
        >
          <XAxis type="number" />
          <YAxis
            dataKey="grade"
            type="category"
            tickFormatter={(value) => {
              return `Grade ${value}`;
            }}
          />

          <Bar dataKey="student_count">
            {data.map((item, index) => {
              return (
                <Cell
                  key={item.id}
                  fill={indigoDye[(900 - index * 100) as any]}
                />
              );
            })}
          </Bar>
          <Tooltip content={CustomTooltip as any} cursor={{ opacity: 0.4 }} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
