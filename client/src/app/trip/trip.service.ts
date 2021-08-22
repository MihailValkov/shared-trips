import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ITrip, ITripInfo } from '../interfaces/trip';
import { IUser } from '../interfaces/user';
import { ITripModuleState } from './+store';
import { tripDetailSetTrip, tripListSetTrips, tripListSetTripsCount } from './+store/actions';

@Injectable()
export class TripService {
  trips$ = this.store.select(state => state.trip.list.trips);
  count$ = this.store.select(state => state.trip.list.count);
  trip$ = this.store.select(state => state.trip.detail.trip);

  constructor(
    private http: HttpClient,
    private store: Store<ITripModuleState>
  ) { }

  loadTrips(params?: Params) {
    return this.http.get<{ trips: ITrip[], count: number }>(`/trip/list`, { params })
      .pipe(
        tap(({ trips, count }) => {
          this.store.dispatch(tripListSetTrips({ trips }));
          this.store.dispatch(tripListSetTripsCount({ count }));
        })
      )
  }

  loadTrip(tripId: string) {
    return this.http.get<{ trip: ITrip, info: ITripInfo }>(`/trip/item/${tripId}`)
      .pipe(
        tap(({ trip }) => this.store.dispatch(tripDetailSetTrip({ trip })))
      )
  }

  createTrip(trip: ITrip) {
    return this.http.post<{ trip: ITrip, user: IUser }>(`/trip/create`, trip);
  }

  editTrip(trip: ITrip, tripId: string) {
    return this.http.post<{ trip: ITrip, info: ITripInfo }>(`/trip/edit/${tripId}`, trip)
      .pipe(
        tap(({ trip }) => this.store.dispatch(tripDetailSetTrip({ trip })))
      )
  }

  joinTrip(tripId: string) {
    return this.http.get<{ trip: ITrip, info: ITripInfo }>(`/trip/join/${tripId}`)
      .pipe(
        tap(({ trip }) => this.store.dispatch(tripDetailSetTrip({ trip })))
      )
  }

  deleteTrip(tripId: string) {
    return this.http.get(`/trip/delete/${tripId}`);
  }

}
