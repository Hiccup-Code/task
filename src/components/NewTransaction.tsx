import { Box, Button, Typography } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import { ITransaction } from "../interfaces";
import { v4 as uuid } from "uuid";
import React from "react";

const newTransactionSchema = object({
  amount: number().nonnegative("Amount cannot be less than zero"),
  account: string().length(26),
  beneficiary: string(),
  address: string(),
  description: string(),
});

type NewTransactionInput = TypeOf<typeof newTransactionSchema>;

interface NewTransactionProps {
  onAdd: (value: ITransaction) => void;
}

const NewTransaction = ({ onAdd }: NewTransactionProps) => {
  const methods = useForm<NewTransactionInput>({
    resolver: zodResolver(newTransactionSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<NewTransactionInput> = (values) => {
    onAdd({ ...values, id: uuid(), date: new Date() });
  };

  return (
    <Box sx={{ maxWidth: "30rem" }}>
      <Typography variant="h5" component="h1" sx={{ mb: "2rem" }}>
        New Transaction
      </Typography>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormInput
            name="amount"
            required
            fullWidth
            label="Amount"
            mask="currency"
            sx={{ mb: 2 }}
          />

          <FormInput
            name="account"
            required
            fullWidth
            label="Account number"
            mask="00 0000 0000 0000 0000 0000 0000"
            sx={{ mb: 2 }}
          />
          <FormInput
            name="beneficiary"
            fullWidth
            label="Beneficiary"
            sx={{ mb: 2 }}
          />
          <FormInput
            name="address"
            required
            fullWidth
            label="Address"
            sx={{ mb: 2 }}
          />
          <FormInput
            name="description"
            required
            fullWidth
            label="Description"
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            size="small"
            sx={{ py: "0.8rem", mt: "1rem" }}
          >
            Add
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default NewTransaction;
