import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {
    email: '',
    firstname: '',
    lastname: '',
    password: ''
  };
  errorMsg: Array<string> = [];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService,

  ) { }

  register(): void {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe(
      {
        next: (): void => {
          this.router.navigate([ '/' ]);
        },
        error: (err): void => {
          if (err.error?.validationErrors) {
            this.errorMsg = err.error?.validationErrors;
          } else {
            this.errorMsg.push(err.error?.errorMsg);
          }
        }
      });
  }

  login() {
    this.router.navigate([ 'login' ]);
  }
}
