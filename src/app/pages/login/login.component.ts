import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  TokenService
} from '../../services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {
    email: '',
    password: ''
  };
  errorMsg: Array<string> = [];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService,
    private readonly tokenService: TokenService,
    //another service
  ) { }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate([ 'books' ]);
      },
      error: (err) => {
        console.log({ 'error': err });
        if (err.error?.validationErrors) {
          this.errorMsg = err.error?.validationErrors;
        } else {
          this.errorMsg.push(err.error?.errorMsg);
        }
      }
    })
  }

  register() {
    this.router.navigate([ 'register' ]);
  }
}
