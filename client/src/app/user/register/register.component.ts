import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth.service';
import { validatorEmail, validatorRepass } from 'src/app/shared/validators';
import { IUserModuleState } from '../+store';
import { userRegisterErrorMessage, userRegisterLoading } from '../+store/actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  isLoading$ = this.store.select(state => state.user.register.isLoading);
  errorMessage$ = this.store.select(state => state.user.register.errorMessage);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<IUserModuleState>
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, validatorEmail]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
      gender: ['male']
    },
      {
        validator: validatorRepass('password', 'repeatPassword')
      }
    );
  }

  validateField(name: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.errors;
  }

  submitHandler() {
    this.store.dispatch(userRegisterLoading({ isLoading: true }));
    this.store.dispatch(userRegisterErrorMessage({ message: '' }));

    this.authService.register(this.form.value).subscribe(
      next => {
        this.store.dispatch(userRegisterLoading({ isLoading: false }));
        this.router.navigate(['/']);
      },
      err => {
        this.store.dispatch(userRegisterLoading({ isLoading: false }));
        this.store.dispatch(userRegisterErrorMessage({ message: err.error.message }));
      }
    )
  }

}


