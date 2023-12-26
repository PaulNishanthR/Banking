export interface Transaction {
  id?: number;
  creditAmount: number;
  debitAmount: number;
  updatedAt: string;
  balance: number;
}
