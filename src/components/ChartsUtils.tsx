import styled from "styled-components";
import { BackgroundProps, background } from "styled-system";
import { FlexLayout } from "./utils";
import { Typography } from "@mui/material";

export const ChartContainer = styled(FlexLayout)`
  width: 100%;
  min-height: 393px;
  background-color: #f3f3f3;
  box-shadow: 0px 0px 7px #00000045;
  border-radius: 11px;
  padding: 22px;
  text {
    font-size: 14px;
  }
`;

export const ItemIndicator = styled.div<BackgroundProps>`
  width: 40px;
  height: 20px;
  border-radius: 2px;
  box-shadow: 0px 1px 3px #00000029;
  background: ${(p) => p.theme.palette.primary.main};
 
  ${background};
`;

export const LegendItem = ({
  name,
  background,
}: Pick<BackgroundProps, "background"> & { name: string }) => {
  return (
    <FlexLayout gridGap={"24px"} alignItems={"center"}>
      <ItemIndicator background={background} />
      <Typography fontSize={"21px"}>{name}</Typography>
    </FlexLayout>
  );
};
