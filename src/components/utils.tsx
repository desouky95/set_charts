import { PropsWithChildren } from "react";
import styled from "styled-components";
import {
  FlexboxProps,
  GridProps,
  LayoutProps,
  SpaceProps,
  flexbox,
  layout,
  space,
  grid,
} from "styled-system";
type FlexProps = FlexboxProps & LayoutProps & SpaceProps & GridProps;

export const FlexLayout = styled.div<FlexProps>`
  ${flexbox};
  ${layout};
  ${space};
  ${grid};
  display: flex;
`;

export const Spacer = styled.div<SpaceProps>`
  ${space}
`;

type GridLayoutProps = {
  rows?: number;
  columns?: number;
} & GridProps;

export const GridLayout = ({
  children,
  ...props
}: PropsWithChildren<GridLayoutProps>) => (
  <StyledGridLayout {...props}>{children}</StyledGridLayout>
);

const StyledGridLayout = styled.div<GridLayoutProps>`
  ${grid}
  display: grid;
  grid-template-columns: ${(p) => p.columns && `repeat(${p.columns},1fr)`};
  grid-template-rows: ${(p) => p.columns && `repeat(${p.rows},1fr)`};
`;
