import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/contant';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getTransactionHistory(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${urlEndpoint.baseUrl}/transaction/history/${accountId}`
    );
  }
}
