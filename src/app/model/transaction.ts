export interface Transaction {
  id?: number;
  creditAmount: number;
  debitAmount: number;
  updatedAt: Date;
  balance: number;
}
