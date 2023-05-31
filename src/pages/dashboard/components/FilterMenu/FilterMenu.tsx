import { FilterAlt } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { FlexLayout } from "../../../../components/utils";
import styled from "styled-components";
import PocketBase, { Record } from "pocketbase";
import { useEffectOnce } from "usehooks-ts";
import { usePocket } from "../../../../providers/PocketBaseProvider";
import { useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { clean } from "../../../../utils/clean";

interface Personality {
  e_learning_model: string;
  personality_type: string;
}
export const FilterMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { pb } = usePocket();
  const [grades, setGrades] = useState<{ id: number; grade: number }[]>([]);
  const [types, setTypes] = useState<Personality[]>([]);
  useEffectOnce(() => {
    pb.collection("grades")
      .getFullList({
        sort: "-created",
      })
      .then((value) => {
        setGrades(value as any);
      });
    pb.collection("personality")
      .getFullList<Personality>({
        sort: "-created",
      })
      .then((value) => {
        setTypes(value);
      });
  });

  const [params, setParams] = useSearchParams();

  const { control, watch, reset } = useForm({
    defaultValues: {
      grade: params.get("grade"),
      gender: params.get("gender"),
      e_learning_model: params.get("e_learning_model"),
      personality_type: params.get("personality_type"),
    },
  });
  const apply = () => {
    const values = watch();
    Object.entries(clean(values)).forEach(([name, value]) => {
      params.set(name, value as string);
    });
    setParams(params);
  };

  const resetFilters = () => {
    reset({
      gender: null,
      e_learning_model: null,
      grade: null,
      personality_type: null,
    });
    setParams([]);
  };
  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        <FilterAlt />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <FlexLayout
          p="40px"
          flexDirection={"column"}
          gridGap="24px"
          width={"100%"}
        >
          <Typography fontWeight="bold">Filter Options</Typography>
          <FilterItem>
            <FilterTitleBox>GRADE</FilterTitleBox>
            <Controller
              control={control}
              name="grade"
              render={({ field }) => (
                <Select {...field}>
                  {grades.map((grade) => (
                    <MenuItem key={grade.id} value={grade.grade}>
                      Grade {grade.grade}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FilterItem>
          <FilterItem>
            <FilterTitleBox>GENDER</FilterTitleBox>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              )}
            />
          </FilterItem>
          <FilterItem>
            <FilterTitleBox>LEARNING MODEL</FilterTitleBox>
            <Controller
              control={control}
              name="e_learning_model"
              render={({ field }) => (
                <Select {...field}>
                  {types.map((type) => (
                    <MenuItem
                      key={type.e_learning_model}
                      value={type.e_learning_model}
                    >
                      {type.e_learning_model}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FilterItem>
          <FilterItem>
            <FilterTitleBox>AGE</FilterTitleBox>
            <Select></Select>
          </FilterItem>
          <FilterItem>
            <FilterTitleBox>PERSONALITY TYPE</FilterTitleBox>
            <Controller
              control={control}
              name="personality_type"
              render={({ field }) => (
                <Select {...field}>
                  {types.map((type) => (
                    <MenuItem
                      key={type.personality_type}
                      value={type.personality_type}
                    >
                      {type.personality_type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FilterItem>
          <FlexLayout alignSelf={"center"} gridGap={'1rem'}>
            <Button variant="contained" onClick={apply}>
              Apply Filters
            </Button>
            <Button variant="outlined" onClick={resetFilters}>
              Reset
            </Button>
          </FlexLayout>
        </FlexLayout>
      </Menu>
    </>
  );
};

const FilterTitleBox = styled.div`
  padding: 7px 14px;
  max-width: 134px;
  min-width: 134px;
  text-align: center;
  background-color: ${(p) => p.theme.palette.primary.main};
  color: #fff;
  font-size: 14px;
  display: grid;
  place-content: center;
  /* word-break: break-all; */
`;

const FilterItem = styled(FlexLayout)`
  .MuiSelect-select {
    min-width: 477px;
  }
  .MuiInputBase-root {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;
