import { Box, Stack, Typography } from "@mui/material";
import { ITransaction } from "../interfaces";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  rows: ITransaction[];
  onDelete: (id: string) => void;
}

const TransactionList = ({ rows, onDelete }: TransactionListProps) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Transactions
      </Typography>
      <Stack spacing={1}>
        {rows.map((row) => (
          <TransactionItem
            key={row.id}
            data={row}
            onDelete={() => onDelete(row.id)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TransactionList;
