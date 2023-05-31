import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  CartesianGrid,
  Line,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { usePocket } from "../../../../../providers/PocketBaseProvider";
import { useEffectOnce } from "usehooks-ts";
import {
  ChartContainer,
  LegendItem,
} from "../../../../../components/ChartsUtils";
import { Divider, Paper, Typography } from "@mui/material";
import { FlexLayout, Spacer } from "../../../../../components/utils";
import { sortBy } from "lodash";
import moment from "moment";
const colorsMap = new Map(
  Object.entries({
    Dominance: "#1D476C",
    Conscientiousness: "#336A9A",
    Influence: "#608DB4",
    Steadiness: "#CDD4D9",
  })
);

type Data = {
  grade: number;
  id: string;
  personality_type: string;
  student_count: number;
  Dominance?: number;
  Conscientiousness?: number;
  Influence?: number;
  Steadiness?: number;
};

export const PersonalitySegmentationPerGradeChart = () => {
  const { pb, totalStudents } = usePocket();

  const [data, setData] = useState<Data[]>([]);

  useEffectOnce(() => {
    pb.collection("personality_type_per_grade")
      .getFullList<Data>({})
      .then((value) => {
        setData(value);
      })
      .catch((e) => console.log(e));
  });

  const computedData = useMemo(() => {
    const _data: Array<Data> = [];
    data.forEach((item) => {
      const _item = _data.find((_) => _.grade === item.grade);
      if (!_item) {
        _data.push({
          ...item,
          grade: item.grade,
          [item.personality_type as any]: Math.floor(item.student_count),
        });
      } else {
        _item[item.personality_type as any] = Math.floor(item.student_count);
      }
    });
    return _data;
    // return sortBy(_data, (item) => moment().month(item.month).format("M"));
  }, [data]);

  return (
    <ChartContainer justifyContent={"space-between"} flexDirection={"column"}>
      <FlexLayout>
        <FlexLayout flexDirection={"column"} minWidth={"185px"}>
          <Typography fontSize="21px" fontWeight={"bold"}>
            Performance of Each Personality Type
          </Typography>
          <Typography fontSize="14px" fontWeight="600" color="#397ABD">
            Total : {totalStudents} students
          </Typography>
          <Spacer mb="1rem" />
          <Divider flexItem />

          <Divider />
        </FlexLayout>
        <FlexLayout flex={1}></FlexLayout>
      </FlexLayout>
      <Spacer mb="1rem" />
      <FlexLayout>
        <FlexLayout my="3rem" flexDirection={"column"} flex={1}>
          {Array.from(colorsMap).map(([name, color]) => (
            <LegendItem key={`${name}-${color}`} name={name} background={color} />
          ))}
        </FlexLayout>
        <FlexLayout flex={3}>
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              width={500}
              height={300}
              data={computedData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" tickFormatter={(value) => `Grade ${value}`} />
              <YAxis />
              <Tooltip labelFormatter={(label) =>`Grade ${label}`} />
              {/* <Legend /> */}
              {Array.from(colorsMap).map(([name, color]) => (
                <Bar key={`bar-${name}`} dataKey={name} stackId="a" fill={color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </FlexLayout>
      </FlexLayout>
    </ChartContainer>
  );
};
