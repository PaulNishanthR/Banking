import { Injectable } from '@angular/core';
import { Account } from '../model/account';
import { Appresponse } from '../model/appresponse';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setLoggedInAccount(account: Account): void {
    localStorage.setItem('loggedInAccount', JSON.stringify(account));
  }

  getLoggedInAccount(): Appresponse {
    return JSON.parse(localStorage.getItem('loggedInAccount') || '{}');
  }
}
