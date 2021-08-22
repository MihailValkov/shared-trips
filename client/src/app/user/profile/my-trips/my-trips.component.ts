import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { IUserModuleState } from '../../+store';
import { userProfileMyTripsLoading, userProfileMyTripsSetTripsCurrentPage } from '../../+store/actions';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent {
  isLoading$ = this.store.select(state => state.user.profileTrips.isLoading);
  page$ = this.store.select(state => state.user.profileTrips.page);
  ownTrips$ = this.userService.ownTrips$;
  count$ = this.userService.count$;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private store: Store<IUserModuleState>
  ) {
    this.activatedRoute.queryParams
      .pipe(
        tap(({ page }) => {
          this.store.dispatch(userProfileMyTripsSetTripsCurrentPage({ page: +page }));
          this.store.dispatch(userProfileMyTripsLoading({ isLoading: true }));
        }),
        switchMap(params => this.userService.loadOwnTrips(params))
      ).subscribe({
        next: () => this.store.dispatch(userProfileMyTripsLoading({ isLoading: false })),
        error: (e) => console.log(e)
      })
  }

}
