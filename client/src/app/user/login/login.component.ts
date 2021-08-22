import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth.service';
import { validatorEmail } from 'src/app/shared/validators';
import { IUserModuleState } from '../+store';
import { userLoginErrorMessage, userLoginLoading } from '../+store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  isLoading$ = this.store.select(state => state.user.login.isLoading);
  errorMessage$ = this.store.select(state => state.user.login.errorMessage);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<IUserModuleState>
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, validatorEmail]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  validateField(name: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.errors;
  }

  submitHandler() {
    const { value } = this.form;
    this.store.dispatch(userLoginLoading({ isLoading: true }));
    this.store.dispatch(userLoginErrorMessage({ message: '' }));
    this.authService.login(value).subscribe(
      next => {
        this.store.dispatch(userLoginLoading({ isLoading: false }));
        this.router.navigate(['/']);
      },
      err => {
        this.store.dispatch(userLoginLoading({ isLoading: false }));
        this.store.dispatch(userLoginErrorMessage({ message: err.error.message }));
      }
    )
  }

}
