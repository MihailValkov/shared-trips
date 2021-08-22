import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { validatorRepass } from 'src/app/shared/validators';
import { IUserModuleState } from '../../+store';
import { userProfileEditErrorMessage, userProfileEditLoading } from '../../+store/actions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnDestroy {
  form: FormGroup;
  user$ = this.authService.user$;
  isLoading$ = this.store.select(state => state.user.profileEdit.isLoading);
  errorMessage$ = this.store.select(state => state.user.profileEdit.errorMessage);
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<IUserModuleState>
  ) {
    this.form = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        company: ['', [Validators.required, Validators.minLength(4)]],
        profession: ['', [Validators.required, Validators.minLength(3)]],
        city: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
      },
      {
        validator: validatorRepass('password', 'repeatPassword')
      }
    );
    this.subscription = this.user$.subscribe(user => this.form.patchValue(user || {}))
  }

  validateField(name: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.errors
  }

  submitHandler() {
    this.store.dispatch(userProfileEditLoading({ isLoading: true }));
    this.store.dispatch(userProfileEditErrorMessage({ message: '' }))
    this.authService.editProfile(this.form.value).subscribe(
      next => {
        this.store.dispatch(userProfileEditLoading({ isLoading: false }))
        this.router.navigateByUrl(this.router.url)
      },
      error => {
        this.store.dispatch(userProfileEditLoading({ isLoading: false }))
        this.store.dispatch(userProfileEditErrorMessage({ message: error.message }))
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
