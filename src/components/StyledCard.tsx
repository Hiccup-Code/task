import { Card, CardProps, styled } from "@mui/material";
import React from "react";

const StyledCard = styled((props: CardProps) => <Card {...props} />)(
  ({ theme }) => ({
    "&.IsDeleting": {
      opacity: 0,
      transition: ".2s",
      height: "0 !important",
    },
  })
);

export default StyledCard;
