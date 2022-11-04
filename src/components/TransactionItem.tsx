import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { ITransaction } from "../interfaces";
import { format } from "date-fns";
import StyledCard from "./StyledCard";
import React from "react";

interface TransactionItemProps {
  data: ITransaction;
  onDelete: () => void;
}

const TransactionItem = ({ data, onDelete }: TransactionItemProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [className, setClassName] = React.useState("");
  const dateDisplay = format(new Date(data.date), "dd.MM.yyyy HH:mm");

  const handleDelete = () => {
    if (ref.current) {
      console.log(ref.current.clientHeight);
      ref.current.style.height = `${ref.current.clientHeight}px`;
      setTimeout(() => {
        setClassName("IsDeleting");
        setTimeout(() => {
          onDelete();
        }, 200);
      }, 100);
    }
  };

  return (
    <StyledCard as={Card} ref={ref} variant="outlined" className={className}>
      <CardContent>
        <Typography color="text.secondary" sx={{ fontSize: 14 }} gutterBottom>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            component="span"
          >
            <span>{data.account}</span>
            <span>{dateDisplay}</span>
          </Stack>
        </Typography>
        <Typography variant="h5">{data.amount}</Typography>
        <Typography>
          {data.beneficiary}, {data.address}
        </Typography>
        <Typography color="text.secondary">{data.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default TransactionItem;
