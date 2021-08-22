import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITrip } from '../interfaces/trip';
import { Params } from '@angular/router';
import { IUserModuleState } from './+store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { userProfileMyTripsSetTrips, userProfileMyTripsSetTripsCount } from './+store/actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ownTrips$ = this.store.select(state => state.user.profileTrips.trips);
  count$ = this.store.select(state => state.user.profileTrips.count);
  constructor(
    private http: HttpClient,
    private store: Store<IUserModuleState>
  ) { }

  loadOwnTrips(params: Params) {
    return this.http.get<{ trips: ITrip[]; count: number }>(`/trip/own-trips`, { params })
      .pipe(
        tap(({ trips, count }) => {
          this.store.dispatch(userProfileMyTripsSetTrips({ trips }));
          this.store.dispatch(userProfileMyTripsSetTripsCount({ count }));
        })
      )
  }

}
