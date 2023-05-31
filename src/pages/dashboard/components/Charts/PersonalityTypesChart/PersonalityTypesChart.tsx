import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
  LabelList,
  Tooltip,
} from "recharts";
import { usePocket } from "../../../../../providers/PocketBaseProvider";
import { useEffectOnce } from "usehooks-ts";
import { Record } from "pocketbase";
import {
  ChartContainer,
  ItemIndicator,
  LegendItem,
} from "../../../../../components/ChartsUtils";
import { Divider, Typography } from "@mui/material";
import { FlexLayout, Spacer } from "../../../../../components/utils";
import { useSearchParams } from "react-router-dom";
import { parseParams } from "../../../../../utils/parseParams";

const colorsMap = new Map(
  Object.entries({
    Dominance: "#1D476C",
    Conscientiousness: "#336A9A",
    Influence: "#608DB4",
    Steadiness: "#CDD4D9",
  })
);

type Data = {
  personality_type: string;
  count: number;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  value,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y}
        fill="white"
        // textAnchor={x > cx ? "start" : "end"}
        textAnchor={"middle"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text
        x={x}
        y={y + 25}
        fill="white"
        textAnchor={"middle"}
        // textAnchor={}
        dominantBaseline="central"
      >
        {`${value} Students`}
      </text>
    </>
  );
};
export const PersonalityTypesChart = () => {
  const { pb } = usePocket();

  const [data, setData] = useState<Data[]>([]);

  const [params] = useSearchParams();

  const request = useCallback(async () => {
    try {
      const resp = await pb
        .collection("personality_type_count")
        .getFullList<Data>({
          sort: "-id",
          filter: `${parseParams(["personality_type"], params).toString()}`,
        });
      setData(resp);
    } catch (error) {}
  }, [params.toString()]);

  useEffect(() => {
    request();
  }, [params]);
  const getTypeColor = useCallback((type: string) => {
    return colorsMap.get(type);
  }, []);
  const total = useMemo(() => {
    return data.reduce((prev, current) => prev + current.count, 0);
  }, [data]);
  return (
    <ChartContainer justifyContent={"space-between"}>
      <FlexLayout flexDirection={"column"}>
        <Typography fontSize="21px" fontWeight={"bold"}>
          Personality Type
        </Typography>
        <Typography fontSize="14px" fontWeight="600" color="#397ABD">
          Total : {total} students
        </Typography>
        <Spacer mb="1rem" />
        <Divider />

        <Spacer my="3rem">
          {Array.from(colorsMap).map(([name, color]) => (
            <LegendItem
              key={`${name}-${color}`}
              name={name}
              background={color}
            />
          ))}
        </Spacer>
        <Divider />
      </FlexLayout>
      <ResponsiveContainer width={350} height={350}>
        <PieChart width={350} height={350}>
          <Pie
            data={data}
            dataKey="count"
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={10}
            fillRule="nonzero"
            fill="#1D476C"
          >
            {data.map((type) => {
              return (
                <Cell
                  key={type.personality_type}
                  fill={getTypeColor(type.personality_type)}
                />
              );
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
