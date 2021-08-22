import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { ITrip } from 'src/app/interfaces/trip';
import { ITripModuleState } from '../+store';
import { tripListLoading, tripListSetCurrentPage } from '../+store/actions';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-shared-trips',
  templateUrl: './shared-trips.component.html',
  styleUrls: ['./shared-trips.component.css']
})
export class SharedTripsComponent {
  trips$ = this.tripService.trips$;
  count$ = this.tripService.count$;
  isLoading$ = this.store.select(state => state.trip.list.isLoading);
  errorMessage$ = this.store.select(state => state.trip.list.errorMessage);
  page$ = this.store.select(state => state.trip.list.page);

  constructor(
    private tripService: TripService,
    private activatedRoute: ActivatedRoute,
    private store: Store<ITripModuleState>
  ) {
    this.activatedRoute.queryParams
      .pipe(
        tap(({ page }) => {
          this.store.dispatch(tripListLoading({ isLoading: true }));
          this.store.dispatch(tripListSetCurrentPage({ page: +page }));
        }),
        switchMap(params => this.tripService.loadTrips(params))
      )
      .subscribe(() => this.store.dispatch(tripListLoading({ isLoading: false })))
  }

}
