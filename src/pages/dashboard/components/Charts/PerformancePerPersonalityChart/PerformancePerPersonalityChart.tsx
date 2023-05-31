import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  CartesianGrid,
  Line,
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
import { parseParams } from "../../../../../utils/parseParams";
import { useSearchParams } from "react-router-dom";
const colorsMap = new Map(
  Object.entries({
    Dominance: "#239055",
    Conscientiousness: "#F5CF67",
    Influence: "#E3A7A6",
    Steadiness: "#336A9A",
  })
);

type Data = {
  average_score: number;
  id: string;
  month: string;
  personality_type: string;
  Dominance?: number;
  Conscientiousness?: number;
  Influence?: number;
  Steadiness?: number;
};

export const PerformancePerPersonalityChart = () => {
  const { pb, totalStudents } = usePocket();

  const [data, setData] = useState<Data[]>([]);

  // useEffectOnce(() => {
  //   pb.collection("performance_per_personality")
  //     .getFullList<Data>({})
  //     .then((value) => {
  //       setData(value);
  //     })
  //     .catch((e) => console.log(e));
  // });

  const [params] = useSearchParams();

  const request = React.useCallback(async () => {
    try {
      const resp = await pb
        .collection("performance_per_personality")
        .getFullList<Data>({
          sort: "-id",
          filter: `${parseParams(["personality_type"], params).toString()}`,
        });
      setData(resp);
    } catch (error) {}
  }, [params.toString()]);

  React.useEffect(() => {
    request();
  }, [params]);

  const computedData = useMemo(() => {
    const _data: Array<Data> = [];
    data.forEach((item) => {
      const _item = _data.find((_) => _.month === item.month);
      if (!_item) {
        _data.push({
          ...item,
          month: item.month,
          [item.personality_type as any]: Math.floor(item.average_score),
        });
      } else {
        _item[item.personality_type as any] = Math.floor(item.average_score);
      }
    });
    return sortBy(_data, (item) => moment().month(item.month).format("M"));
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
            <LegendItem
              key={`${name}-${color}`}
              name={name}
              background={color}
            />
          ))}
        </FlexLayout>
        <FlexLayout flex={3}>
          <ResponsiveContainer width={"100%"} height={300}>
            <LineChart
              width={300}
              height={300}
              data={computedData}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                strokeWidth={2}
                type="monotone"
                dataKey="Dominance"
                stroke="#239055"
                activeDot={{ r: 8 }}
              />
              <Line
                type="linear"
                dataKey="Conscientiousness"
                stroke="#F5CF67"
              />
              <Line type="monotone" dataKey="Influence" stroke="#E3A7A6" />
              <Line type="monotone" dataKey="Steadiness" stroke="#336A9A" />
            </LineChart>
          </ResponsiveContainer>
        </FlexLayout>
      </FlexLayout>
    </ChartContainer>
  );
};
