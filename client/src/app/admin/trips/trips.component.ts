import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap, } from 'rxjs/operators';
import { IAdminModuleState } from '../+store';
import { adminTripLoading, adminTripClearTrips, adminTripSetCurrentPage, adminTripSetErrorMessage } from '../+store/actions';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnDestroy, AfterViewInit {
  @ViewChild('inputElement') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('selectElement') criteria!: ElementRef<HTMLSelectElement>;

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
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams
      .pipe(
        tap(({ page }) => {
          this.store.dispatch(adminTripLoading({ isLoading: true }));
          this.store.dispatch(adminTripSetCurrentPage({ page: +page }))
        }),
        switchMap(params => this.adminService.loadTrips(params))
      ).subscribe(
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
        switchMap(page => {
          page = page > Math.ceil((count - 1) / this.limit) ? --page : page;
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

  searchHandler(inputEl: HTMLInputElement, selectEl: HTMLSelectElement) {
    this.store.dispatch(adminTripLoading({ isLoading: true }));
    const searchParams = { search: inputEl.value };
    this.adminService.loadTrips(Object.assign({ page: 1, limit: this.limit, filter: selectEl.value }, inputEl.value != '' ? searchParams : {}))
      .subscribe(
        () => this.store.dispatch(adminTripLoading({ isLoading: false })),
        error => {
          this.store.dispatch(adminTripLoading({ isLoading: false }))
          this.store.dispatch(adminTripSetErrorMessage({ message: error.error.message || error.message }))
        }
      )
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map(e => (e.target as HTMLInputElement).value),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(search => {
          this.store.dispatch(adminTripLoading({ isLoading: true }));
          if (search == '') { return this.adminService.loadTrips({ page: 1, limit: 5 }); }
          return this.adminService.loadTrips({ page: 1, limit: this.limit, filter: this.criteria.nativeElement.value, search })
        })
      ).subscribe(
        () => this.store.dispatch(adminTripLoading({ isLoading: false })),
        error => {
          this.store.dispatch(adminTripLoading({ isLoading: false }))
          this.store.dispatch(adminTripSetErrorMessage({ message: error.error.message || error.message }))
        }
      )
  }
  ngOnDestroy(): void {
    this.store.dispatch(adminTripClearTrips());
  }
}
