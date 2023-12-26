import { Injectable } from '@angular/core';
import { Account } from '../model/account';
import { Appresponse } from '../model/appresponse';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  private readonly ACCOUNT_BALANCE_KEY = 'account_balance';

  setLoggedInAccount(account: Account): void {
    localStorage.setItem('loggedInAccount', JSON.stringify(account));
  }

  getLoggedInAccount(): Appresponse {
    return JSON.parse(localStorage.getItem('loggedInAccount') || '{}');
  }

  setAccountBalance(balance: number): void {
    localStorage.setItem(this.ACCOUNT_BALANCE_KEY, balance.toString());
  }

  getAccountBalance(): number | undefined {
    const storedBalance = localStorage.getItem(this.ACCOUNT_BALANCE_KEY);
    return storedBalance ? parseFloat(storedBalance) : undefined;
  }
}
