import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from "@angular/animations";
import { mdiGoogle } from '@mdi/js';
import {AuthService} from "../../services/authservice/authservice.service";
import {LoginPayload} from "../../interfaces/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('errorAnimation', [
      state('visible', style({
        opacity: 1,
        height: '*',
        paddingTop: '*',
        paddingBottom: '*',
        overflow: 'visible'
      })),
      state('hidden', style({
        opacity: 0,
        height: '0',
        paddingTop: '0',
        paddingBottom: '0',
        overflow: 'hidden'
      })),
      transition('visible <=> hidden', animate('200ms'))
    ])
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string;
  isError: boolean;
  showPassword: boolean;
  mdiGoogle: string;
  private _keepLoggedIn: boolean;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.errorMessage = '';
    this.isError = false;
    this.showPassword = false;
    this.mdiGoogle = mdiGoogle;
    this._keepLoggedIn = false;
  }

  closeCollapse(): void {
    this.isError = false;
  }

  async login(): Promise<void>  {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (email && password) {
        const payload: LoginPayload = {
          username: email,
          password: password
        };

        await this.auth.loginUser(this._keepLoggedIn, payload);
        await this.router.navigate(['/home']);
      }
    }
  }

  changeKeepLoggedIn() {
    this._keepLoggedIn = !this._keepLoggedIn;
  }

  redirectToRegister() {
    this.router.navigate(['/register'])
  }
}
