import { useInfiniteQuery, useQuery } from "react-query";
import { ITransaction } from "./interfaces";

const fetchTransactions = async ({ pageParam = 0 }) => {
  const response = await fetch("http://localhost:3000/transactions", {
    method: "GET",
  });
  const results: ITransaction[] = await response.json();
  const total = results.length;
  const transactions = results.splice(pageParam, 20);

  return {
    results: transactions,
    nextPage: transactions.length + pageParam,
    total,
  };
};

export const useTransactionsInfiniteQuery = () => {
  return useInfiniteQuery("infinite-transactions", fetchTransactions, {
    getNextPageParam: (lastPage) => {
      const { nextPage, total } = lastPage;
      return nextPage < total ? nextPage : undefined;
    },
  });
};

export const useTransactionsQuery = () => {
  return useQuery<ITransaction[]>(
    ["transactions"],
    async () =>
      await fetch("http://localhost:3000/transactions", {
        method: "GET",
      }).then((res) => res.json())
  );
};
