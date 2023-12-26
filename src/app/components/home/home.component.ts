import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Appresponse } from 'src/app/model/appresponse';
import { HomeService } from 'src/app/services/home.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private homeService: HomeService,
    private route: Router,
    private storageService: StorageService
  ) {}

  accounts: Account[] = [];

  createAccount(accountForm: NgForm) {
    console.log(accountForm);

    const account = {
      id:0,
      accountHolderName: accountForm.value.name,
      pinNumber: accountForm.value.pin,
    };
    this.homeService.postAccount(account).subscribe({
      next: (response: any) => {
        console.log('response',response);
         this.storageService.setLoggedInAccount(response)
        
        if (response && response.data) {
          this.accounts = response.data;
          
          this.route.navigate(['/transaction']);
          console.log('xxx:', this.accounts);
        } else {
          console.log('Invalid API format:', response.data);
        }
      },
      error: (err) => {
        console.log('An Error Occurred:', err);
      },
      complete: () => {
        console.log('There are no more actions happening.');
      },
    });
  }
}
