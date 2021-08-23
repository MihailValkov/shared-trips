import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { updateUser } from 'src/app/+store/actions';
import { validatorEmail, validatorRepass } from 'src/app/shared/validators';
import { IAdminModuleState } from '../+store';
import { adminProfileClearUser, adminProfileLoading, adminProfileSetErrorMessage, adminProfileSetUser, adminProfileSetUserId, adminProfileUploadAvatarImageSetErrorMessage } from '../+store/actions';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css', './user-profile.media.css']
})
export class UserProfileEditComponent implements OnDestroy {
  isActive$ = this.store.select(state => state.admin.menu.isActive);
  isLoading$ = this.store.select(state => state.admin.profile.isLoading);
  errorMessage$ = this.store.select(state => state.admin.profile.errorMessage);
  uploadAvatarErrorMessage$ = this.store.select(state => state.admin.profile.uploadAvatarErrorMessage);
  user$ = this.store.select(state => state.admin.profile.user);
  id$ = this.store.select(state => state.admin.profile.id);
  admin$ = this.store.select(state => state.auth.user);

  form: FormGroup;
  constructor(
    private adminService: AdminService,
    private store: Store<IAdminModuleState>,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activatedRoute.params
      .pipe(
        tap(({ userId }) => this.store.dispatch(adminProfileSetUserId({ id: userId }))),
        switchMap(({ userId }) => this.adminService.loadUser(userId))
      ).subscribe(
        user => {
          this.store.dispatch(adminProfileLoading({ isLoading: false }));
          this.store.dispatch(adminProfileSetUser({ user }));
          this.form.patchValue(user);
        },
        error => {
          this.store.dispatch(adminProfileLoading({ isLoading: false }));
          this.store.dispatch(adminProfileSetErrorMessage({ message: error.error.message }));
        }
      )

    this.form = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, validatorEmail]],
        profession: ['', [Validators.required, Validators.minLength(3)]],
        company: ['', [Validators.required, Validators.minLength(3)]],
        city: ['', [Validators.required, Validators.minLength(4)]],
        status: [''],
        password: ['', [Validators.minLength(4)]],
        repeatPassword: ['', [Validators.minLength(4)]],
      },
      {
        validator: validatorRepass('password', 'repeatPassword')
      }
    );

  }
  validateField(name: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.errors
  }

  submitHandler(adminId: string) {
    this.store.dispatch(adminProfileSetErrorMessage({ message: '' }));
    this.store.dispatch(adminProfileLoading({ isLoading: true }));
    this.adminService.updateUserProfile(this.activatedRoute.snapshot.params.userId, this.form.value)
      .subscribe(
        user => {
          this.store.dispatch(adminProfileLoading({ isLoading: false }));
          if (user._id == adminId) { this.store.dispatch(updateUser({ user })); }
        },
        error => this.store.dispatch(adminProfileSetErrorMessage({ message: error.error.message }))
      );
  }

  getImageUrl(data: { imageUrl: string, message: string }, adminId: string): void {
    if (data?.message) {
      this.store.dispatch(adminProfileUploadAvatarImageSetErrorMessage({ message: data?.message }));
      return;
    }

    this.adminService.updateUserAvatar(this.activatedRoute.snapshot.params.userId, data.imageUrl)
      .subscribe(
        user => {
          if (user._id == adminId) { this.store.dispatch(updateUser({ user })); }
          this.store.dispatch(adminProfileSetUser({ user }));
        },
        error => this.store.dispatch(adminProfileSetErrorMessage({ message: error.error.message }))
      )
  }

  ngOnDestroy(): void {
    this.store.dispatch(adminProfileClearUser());
  }
}
