import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { urlEndpoint } from '../utils/contant';
import { Account } from '../model/account';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  postAccount(account: Account): Observable<any> {
    return this.http.post<any>(
      `${urlEndpoint.baseUrl}/account/create`,
      account
    );
  }

  getAccount(id: number): Observable<any> {
    return this.http.get<any>(`${urlEndpoint.baseUrl}/account/${id}`);
  }

  postCredit(id: number, amount: number): Observable<any> {
    const requestBody = { amount: amount };
    const apiUrl = `${urlEndpoint.baseUrl}/account/${id}/credit`;
    console.log('API URL:', apiUrl);

    return this.http.post<any>(apiUrl, requestBody);
  }

  postDebit(id: number, amount: number): Observable<any> {
    const requestBody = { amount: amount };
    const apiUrl = `${urlEndpoint.baseUrl}/account/${id}/debit`;
    return this.http.post<any>(apiUrl, requestBody);
  }
}
