import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IExpensiveTrips } from '../interfaces/expensiveTrips';
import { ILogger, ILogs } from '../interfaces/logger';
import { IStatistics } from '../interfaces/statisitcs';
import { ITrip } from '../interfaces/trip';
import { IUser } from '../interfaces/user';
import { IAdminModuleState } from './+store';
import { adminAsideSetStatistics, adminTripSetTrips, adminTripSetTripsCount, adminUserSetUsers, adminUserSetUsersCount } from './+store/actions';

@Injectable()

export class AdminService {
  statistics$ = this.store.select(state => state.admin.aside.statistics);
  trips$ = this.store.select(state => state.admin.trip.trips);
  users$ = this.store.select(state => state.admin.user.users);

  constructor(
    private http: HttpClient,
    private store: Store<IAdminModuleState>
  ) { }

  loadStatistics() {
    return this.http.get<IStatistics>('/admin/statistics').pipe(
      tap(statistics => this.store.dispatch(adminAsideSetStatistics({ statistics })))
    )
  }

  loadLoggerInfo() {
    return this.http.get<ILogs>('/admin/logs')
  }

  loadExpensiveTrips() {
    return this.http.get<{ trips: IExpensiveTrips[] }>('/admin/expensive-trips')
  }

  loadUser(id: string) {
    return this.http.get<IUser>(`/admin/user/${id}`);
  }

  loadUsers(params?: Params) {
    return this.http.get<{ users: IUser[], count: number }>(`/admin/users`, { params }).pipe(
      tap(({ users, count }) => {
        this.store.dispatch(adminUserSetUsers({ users }));
        this.store.dispatch(adminUserSetUsersCount({ count }));
      })
    );
  }

  loadTrips(params?: Params) {
    return this.http.get<{ trips: ITrip[], count: number }>(`/admin/trips`, { params }).pipe(
      tap(({ trips, count }) => {
        this.store.dispatch(adminTripSetTrips({ trips }));
        this.store.dispatch(adminTripSetTripsCount({ count }));
      })
    );
  }

  updateUserProfile(id: string, userData: IUser) {
    return this.http.post<IUser>(`/admin/user/${id}`, userData)
  }
  updateUserAvatar(id: string, imageUrl: string) {
    return this.http.post<IUser>(`/admin/user/update-avatar/${id}`, { avatarImg: imageUrl });
  }

  deleteUser(id: string) {
    return this.http.get<{ message: string }>(`/admin/user/delete/${id}`);
  }
  deleteTrip(id: string) {
    return this.http.get<{ message: string }>(`/admin/trip/delete/${id}`);
  }

}
