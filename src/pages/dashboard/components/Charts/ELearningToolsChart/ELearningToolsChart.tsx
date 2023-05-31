import React, { useCallback, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
  LabelList,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { usePocket } from "../../../../../providers/PocketBaseProvider";
import { useEffectOnce } from "usehooks-ts";
import { Record } from "pocketbase";
import {
  ChartContainer,
  ItemIndicator,
  LegendItem,
} from "../../../../../components/ChartsUtils";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { FlexLayout, Spacer } from "../../../../../components/utils";
import { blue, indigo } from "@mui/material/colors";
import { indigoDye } from "../../../../../theme/theme";

const colorsMap = new Map(
  Object.entries({
    Dominance: "#1D476C",
    Conscientiousness: "#336A9A",
    Influence: "#608DB4",
    Steadiness: "#CDD4D9",
  })
);

type Data = {
  id: string;
  tool: string;
  total_usage: number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { grade, total_usage } = payload[0].payload;
    return (
      <Paper sx={{ padding: "0.5rem" }} elevation={4}>
        <Typography fontWeight="bold">{`${total_usage}`}</Typography>
      </Paper>
    );
  }

  return null;
};
export const ELearningToolsChart = () => {
  const { pb, totalStudents } = usePocket();

  const [data, setData] = useState<Data[]>([]);

  useEffectOnce(() => {
    pb.collection("e_tool_usage_sum")
      .getFullList<Data>({})
      .then((value) => {
        setData(value);
      })
      .catch((e) => console.log(e));
  });

  return (
    <ChartContainer justifyContent={"space-between"} flexDirection={"column"}>
      <FlexLayout>
        <FlexLayout flexDirection={"column"} minWidth={"185px"}>
          <Typography fontSize="21px" fontWeight={"bold"}>
            E-learning Tools (Usage last year)
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
          margin={{
            left: 20,
          }}
        >
          <XAxis type="number" />
          <YAxis dataKey="tool" type="category" />

          <Bar dataKey="total_usage">
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
