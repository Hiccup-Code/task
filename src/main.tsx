import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={4}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
