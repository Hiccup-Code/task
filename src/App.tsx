import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { NewTransaction, Search, TransactionList } from "./components";
import { sum } from "./helper";
import { ITransaction } from "./interfaces";
import { useTransactionsQuery } from "./queries";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [allTransactions, setAllTransactions] = React.useState<ITransaction[]>(
    []
  );
  const [transactions, setTransactions] = React.useState<ITransaction[]>([]);
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("md"));
  const { data } = useTransactionsQuery();
  const ref = React.useRef<HTMLElement>(null);
  const pageSize = 10;
  const balance = sum(allTransactions?.map((t) => t.amount) || []);
  const filteredTransactions = searchTerm
    ? allTransactions.filter((t) =>
        t.beneficiary.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allTransactions;

  React.useEffect(() => {
    if (ref.current) {
      ref.current.onscroll = handleScroll;
      setTransactions(filteredTransactions.slice(0, pageSize));
    }
  }, [ref.current, filteredTransactions, searchTerm]);

  React.useEffect(() => {
    if (data && allTransactions.length === 0) {
      setAllTransactions(data);
    }
  }, [data]);

  const handleScroll = () => {
    if (ref.current) {
      const { scrollHeight, scrollTop, clientHeight } = ref.current;
      const progress = ((scrollTop + clientHeight) / scrollHeight) * 100;
      if (progress > 80 && transactions.length < filteredTransactions.length) {
        setTransactions([
          ...transactions,
          ...filteredTransactions.slice(
            transactions.length,
            transactions.length + pageSize
          ),
        ]);
      }
    }
  };

  const handleAdd = (value: ITransaction) => {
    setAllTransactions([...allTransactions, value]);
  };

  const handleDelete = (id: string) => {
    setAllTransactions(allTransactions.filter((t) => t.id !== id));
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <Box ref={ref} sx={{ height: "100vh", overflow: "auto" }}>
      <Container maxWidth="md">
        <Grid container direction="column" spacing={2}>
          <Grid
            item
            xs={12}
            container
            direction={mobileMode ? "column" : "row-reverse"}
            spacing={2}
          >
            <Grid item xs={12} md={5}>
              <NewTransaction onAdd={handleAdd} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Stack
                justifyContent="space-between"
                spacing={2}
                sx={{ height: "100%" }}
              >
                <Box>
                  <Typography variant="h6">
                    balance:{" "}
                    <Typography variant="h4" component="span">
                      {balance}
                    </Typography>
                  </Typography>
                </Box>
                <Box>
                  <Search
                    fullWidth
                    placeholder="Search.."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClear={() => setSearchTerm("")}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TransactionList rows={transactions} onDelete={handleDelete} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
