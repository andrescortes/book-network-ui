import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {


  message = '';
  isOk = true;
  submitted = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService,
  ) {

  }

  onCodeCompleted(code: string): void {
    console.log(code);
    this.confirmAccount(code);
  }

  confirmAccount(code: string): void {
    this.authService.confirm({
      token: code
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login.'
        this.submitted = true;
        this.isOk = true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOk = false;
      }
    });
  }

  redirectLogin(): void {
    this.router.navigate([ 'login' ]);
  }
}
