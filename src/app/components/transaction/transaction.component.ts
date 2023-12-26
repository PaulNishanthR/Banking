import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Appresponse } from 'src/app/model/appresponse';
import { Transaction } from 'src/app/model/transaction';
import { HomeService } from 'src/app/services/home.service';
import { StorageService } from 'src/app/services/storage.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private homeService: HomeService,
    private transactionService: TransactionService
  ) {}

  accounts: Account = {
    id: 0,
    accountHolderName: '',
    balance: 0,
  };
  amount: number = 0;
  transactions: Transaction[] = [];
  errorMessage: string = ''; // Declare errorMessage variable

  ngOnInit(): void {
    const loggedInAccountId = this.storageService.getLoggedInAccount().data.id;
    this.loadAccountDetails(loggedInAccountId);
    this.loadTransactionHistory(loggedInAccountId);
  }

  loadAccountDetails(accountId: number): void {
    this.homeService.getAccount(accountId).subscribe({
      next: (response: Appresponse) => {
        if (response && response.data) {
          this.accounts = response.data;
          console.log('Account details:', this.accounts);
          // Set balance in local storage
          this.storageService.setAccountBalance(this.accounts.balance || 0);
        } else {
          console.log('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred', err);
      },
      complete: () => console.log('Account details loading completed.'),
    });
  }

  onSubmitCredit() {
    let loggedInAccount: Appresponse = this.storageService.getLoggedInAccount();
    if (
      loggedInAccount &&
      loggedInAccount.data &&
      loggedInAccount.data.id &&
      this.amount
    ) {
      const id = loggedInAccount.data.id;
      this.homeService.postCredit(id, this.amount).subscribe({
        next: (response: any) => {
          if (response && response.data) {
            console.log('Credit successful:', response);
            this.loadAccountDetails(id);
            this.loadTransactionHistory(id);
          } else {
            console.log('Credit response or data is missing:', response);
          }
        },
        error: (err) => {
          console.error('Error while posting credit:', err);
        },
        complete: () => console.log('Credit request completed.'),
      });
    } else {
      console.error('Account ID or amount is missing.');
    }
  }

  onSubmitDebit() {
    let loggedInAccount: Appresponse = this.storageService.getLoggedInAccount();
    if (
      loggedInAccount &&
      loggedInAccount.data &&
      loggedInAccount.data.id &&
      this.amount
    ) {
      const id = loggedInAccount.data.id;

      const storedBalance = this.storageService.getAccountBalance();

      if (storedBalance !== undefined && this.amount <= storedBalance) {
        this.homeService.postDebit(id, this.amount).subscribe({
          next: (debitResponse: any) => {
            if (debitResponse && debitResponse.data) {
              console.log('Debit successful:', debitResponse);
              this.loadAccountDetails(id);
              this.loadTransactionHistory(id);
            } else {
              console.log('Debit response or data is missing:', debitResponse);
            }
          },
          error: (debitError) => {
            console.log('Error while posting debit:', debitError);
          },
          complete: () => console.log('Debit request completed.'),
        });
      } else {
        this.errorMessage = 'Insufficient Balance';
      }
    } else {
      console.log('Account ID or amount is missing.');
    }
  }

  loadTransactionHistory(accountId: number): void {
    this.transactionService.getTransactionHistory(accountId).subscribe({
      next: (transactions: Transaction[]) => {
        this.transactions = transactions;
        console.log('Transaction history:', this.transactions);
      },
      error: (err) => {
        console.log(
          'An error occurred while fetching transaction history',
          err
        );
      },
      complete: () => console.log('Transaction history loading completed.'),
    });
  }
}
