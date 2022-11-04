export interface ITransaction {
  id: string;
  amount: number;
  beneficiary: string;
  account: string;
  address: string;
  date: Date;
  description: string;
}
