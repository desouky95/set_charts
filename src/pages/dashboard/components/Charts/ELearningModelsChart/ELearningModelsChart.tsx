import React, { useCallback, useMemo, useState } from "react";

import { usePocket } from "../../../../../providers/PocketBaseProvider";
import { useEffectOnce } from "usehooks-ts";
import { Record } from "pocketbase";
import {
  ChartContainer,
  ItemIndicator,
  LegendItem,
} from "../../../../../components/ChartsUtils";
import { Paper, Typography } from "@mui/material";

import styled from "styled-components";
import { Icons } from "../../Icons/Icons";
import {
  FlexLayout,
  GridLayout,
  Spacer,
} from "../../../../../components/utils";

type Data = {
  e_learning_model: string;
  id: string;
  student_count: number;
};

const modelsMap = {
  Reflectors: {
    title: "Reflectors",
    icon: <Icons.ReflectorsIcon />,
  },
  Pragmatist: {
    title: "Pragmatists",
    icon: <Icons.PragmatistsIcon />,
  },
  Theorist: {
    title: "Theorists",
    icon: <Icons.TheoristsIcon />,
  },
  Activist: {
    title: "Activists",
    icon: <Icons.ActivistsIcon />,
  },
};

export const ELearningModelsChart = () => {
  const { pb, totalStudents } = usePocket();

  const [data, setData] = useState<Data[]>([]);

  useEffectOnce(() => {
    pb.collection("e_learining_models_count")
      .getFullList<Data>({})
      .then((value) => {
        setData(value);
      })
      .catch((e) => console.log(e));
  });

  return (
    <div>
      <FlexLayout minWidth={"185px"} my="20px" alignItems={'center'}>
        <Typography fontSize="21px" fontWeight={"bold"}>
          E-learning Tools (Usage last year)
        </Typography>
        <Spacer mx="10px" />
        <Typography fontSize="14px" fontWeight="600" color="#397ABD">
          Total : {totalStudents} students
        </Typography>
      </FlexLayout>
      <GridLayout columns={4} gridGap={"44px"}>
        {data.map((model) => (
          <Card key={model.id}>
            <FlexLayout alignItems={"center"} gridGap="30px" height="100%">
              {modelsMap[model.e_learning_model as keyof typeof modelsMap].icon}
              <FlexLayout flexDirection={"column"}>
                <Typography fontSize="21px" color="#BFBFBF" fontWeight={"600"}>
                  {modelsMap[model.e_learning_model].title}
                </Typography>
                <Spacer mx="10px" />
                <Typography color="#336A9A" fontWeight="600" fontSize="41px">
                  {model.student_count}
                </Typography>
              </FlexLayout>
            </FlexLayout>
          </Card>
        ))}
      </GridLayout>
    </div>
  );
};

const Card = styled(ChartContainer)`
  display: block;
  min-height: unset;
  padding: 24px;
`;
