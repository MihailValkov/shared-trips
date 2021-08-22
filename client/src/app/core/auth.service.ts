import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, tap } from 'rxjs/operators';
import { IRootState } from '../+store';
import { authenticate, login, logout, register, updateUser } from '../+store/actions';
import { IUser } from '../interfaces/user';

@Injectable()
export class AuthService {

  user$ = this.store.select((state) => state.auth.user);
  isLogged$ = this.user$.pipe(map(user => user !== null));
  isAdmin$ = this.user$.pipe(map(user => user?.status === 'Admin'));

  constructor(
    private store: Store<IRootState>,
    private http: HttpClient
  ) { }

  login(data: { email: string, password: string }) {
    return this.http.post<IUser>(`/auth/login`, data)
      .pipe(tap(user => this.store.dispatch(login({ user }))))
  }
  register(data: { username: string, password: string, repeatPassword: string, gender: string }) {
    return this.http.post<IUser>(`/auth/register`, data)
      .pipe(tap(user => this.store.dispatch(register({ user }))))
  }
  logout() {
    return this.http.get(`/auth/logout`)
      .pipe(tap(() => this.store.dispatch(logout())))
  }
  authenticate() {
    return this.http.get<IUser>(`/auth/profile`)
      .pipe(
        tap(user => this.store.dispatch(authenticate({ user }))),
        catchError(() => {
          this.store.dispatch(authenticate({ user: null }));
          return [null];
        })
      )
  }
  editProfile(data: IUser) {
    return this.http.post<IUser>(`/auth/edit-profile`, data)
      .pipe(tap(user => this.store.dispatch(updateUser({ user }))))
  }

  editUserPhoto(data: { coverImg: string } | { avatarImg: string }) {
    return this.http.post<IUser>('/auth/edit-user-photo', data)
      .pipe(tap(user => this.store.dispatch(updateUser({ user }))))
  }
}
