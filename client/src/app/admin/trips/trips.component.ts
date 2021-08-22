import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {switchMap,  tap } from 'rxjs/operators';
import { IAdminModuleState } from '../+store';
import { adminTripLoading, adminTripClearTrips, adminTripSetCurrentPage, adminTripSetErrorMessage, adminTripSetTrips, adminTripSetTripsCount } from '../+store/actions';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnDestroy {
  isActive$ = this.store.select(state => state.admin.menu.isActive);
  isLoading$ = this.store.select(state => state.admin.trip.isLoading);
  errorMessage$ = this.store.select(state => state.admin.trip.errorMessage);
  count$ = this.store.select(state => state.admin.trip.count);
  page$ = this.store.select(state => state.admin.trip.page);
  trips$ = this.adminService.trips$;
  limit = 5;
  constructor(
    private adminService: AdminService,
    private store: Store<IAdminModuleState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams
      .pipe(
        tap(({ page }) => {
          this.store.dispatch(adminTripLoading({ isLoading: true }));
          this.store.dispatch(adminTripSetCurrentPage({ page: +page }))
        }),
        switchMap(params => this.adminService.loadTrips(params))
      )
      .subscribe(
        () => this.store.dispatch(adminTripLoading({ isLoading: false })),
        error => {
          this.store.dispatch(adminTripLoading({ isLoading: false }));
          this.store.dispatch(adminTripSetErrorMessage({ message: error.error.message || error.message }));
        }
      )
  }

  deleteHandler(id: string, count: number): void {
    if (confirm('Are you sure?')) {
      this.store.dispatch(adminTripLoading({ isLoading: true }));
      this.adminService.deleteTrip(id).pipe(
        switchMap(() => this.adminService.loadStatistics()),
        switchMap(() => this.page$),
        switchMap(page =>  {
          page = page > Math.ceil((count-1) / this.limit) ? --page : page;
          this.store.dispatch(adminTripSetCurrentPage({ page: +page }))
          return this.adminService.loadTrips({ page: +page, limit: this.limit })
        })
      ).subscribe(
        () => this.store.dispatch(adminTripLoading({ isLoading: false })),
        error => {
          this.store.dispatch(adminTripLoading({ isLoading: false }))
          this.store.dispatch(adminTripSetErrorMessage({ message: error.error.message || error.message }))
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(adminTripClearTrips());
  }
}
