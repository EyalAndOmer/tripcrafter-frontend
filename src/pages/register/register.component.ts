import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean;
  showPasswordAgain: boolean;
  errorMessage: string;
  isError: boolean;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      password: ['', [Validators.required, this.matchValidator('confirmPassword', true)]],
      passwordAgain: ['', [Validators.required, this.matchValidator('password')]],
    }
    );


    this.showPassword = false;
    this.showPasswordAgain = false;
    this.errorMessage = '';
    this.isError = false;
  }

  closeCollapse(): void {
    this.isError = false;
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if (this.registerForm.valid) {
      const url = 'http://localhost:8080/api/auth/signup';
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      if (email && password) {
        const payload = {
          username: email,
          password: password,
          role: 'user'
        };

        this.http.post(url, payload).subscribe(
          () => {
            // Successful login
            this.errorMessage = '';
            this.router.navigate(['/home']);
          },
          error => {
            // Failed login
            this.errorMessage = error.error.message;
            this.isError = true;
          }
        );
      }
    }
  }

  matchValidator(
    matchTo: string,
    reverse?: boolean
  ): ValidatorFn {
    return (control: AbstractControl):
      ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
      !!control.parent.value &&
      control.value ===
      (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }
}
