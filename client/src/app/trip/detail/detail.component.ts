import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth.service';
import { ITripModuleState } from '../+store';
import { tripDetailErrorMessage, tripDetailLoading, tripDetailSetTripInfo } from '../+store/actions';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  isLogged$ = this.authService.isLogged$;
  user$ = this.authService.user$;
  trip$ = this.tripService.trip$;
  isLoading$ = this.store.select(state => state.trip.detail.isLoading);
  errorMessage$ = this.store.select(state => state.trip.detail.errorMessage);
  tripInfo$ = this.store.select(state => state.trip.detail.info);

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<ITripModuleState>
  ) {
    this.tripService.loadTrip(this.activatedRoute.snapshot.params.tripId)
      .subscribe(
        ({ trip, info }) => {
          this.store.dispatch(tripDetailSetTripInfo({ info }))
          this.store.dispatch(tripDetailLoading({ isLoading: false }));
        },
        error => {
          this.store.dispatch(tripDetailLoading({ isLoading: false }))
          this.store.dispatch(tripDetailErrorMessage({ message: error.message }))
        }
      );
  }

  deleteRecord(tripId: string) {
    this.store.dispatch(tripDetailErrorMessage({ message: '' }));
    this.tripService.deleteTrip(tripId).subscribe(
      next => {
        this.store.dispatch(tripDetailLoading({ isLoading: false }));
        this.router.navigate(['/trip/list'])
      },
      error => {
        this.store.dispatch(tripDetailLoading({ isLoading: false }));
        this.store.dispatch(tripDetailErrorMessage({ message: error.error.message }));
      }
    );
  }

  joinTrip(tripId: string) {
    this.store.dispatch(tripDetailErrorMessage({ message: '' }));
    this.tripService.joinTrip(tripId).subscribe(
      ({ trip, info }) => {
        this.store.dispatch(tripDetailLoading({ isLoading: false }));
        this.store.dispatch(tripDetailSetTripInfo({ info }));
        this.router.navigate(['/trip/detail', tripId])
      },
      error => {
        this.store.dispatch(tripDetailLoading({ isLoading: false }));
        this.store.dispatch(tripDetailErrorMessage({ message: error.error.message }));
      }
    )
  }

}
