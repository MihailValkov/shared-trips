import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { IAdminModuleState } from '../+store';
import { adminUserLoading, adminUserClearUsers, adminUserSetCurrentPage, adminUserSetErrorMessage } from '../+store/actions';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy, AfterViewInit {
  @ViewChild('inputElement') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('selectElement') criteria!: ElementRef<HTMLSelectElement>;

  isActive$ = this.store.select(state => state.admin.menu.isActive);
  isLoading$ = this.store.select(state => state.admin.user.isLoading);
  errorMessage$ = this.store.select(state => state.admin.user.errorMessage);
  count$ = this.store.select(state => state.admin.user.count);
  page$ = this.store.select(state => state.admin.user.page);
  users$ = this.adminService.users$;
  limit = 5;

  constructor(
    private adminService: AdminService,
    private store: Store<IAdminModuleState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams
      .pipe(
        tap(({ page }) => {
          this.store.dispatch(adminUserLoading({ isLoading: true }));
          this.store.dispatch(adminUserSetCurrentPage({ page: +page }))
        }),
        switchMap(params => this.adminService.loadUsers(params))
      ).subscribe(
        () => this.store.dispatch(adminUserLoading({ isLoading: false })),
        error => {
          this.store.dispatch(adminUserLoading({ isLoading: false }));
          this.store.dispatch(adminUserSetErrorMessage({ message: error.error.message || error.message }));
        }
      )
  }

  deleteUser(id: string, count: number) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(adminUserLoading({ isLoading: true }))
      this.adminService.deleteUser(id)
      .pipe(
        switchMap(() => this.adminService.loadStatistics()),
        switchMap(() => this.page$),
        switchMap(page => {
          page = page > Math.ceil((count - 1) / this.limit) ? --page : page;
          this.store.dispatch(adminUserSetCurrentPage({ page: +page }))
          return this.adminService.loadUsers({ page: +page, limit: this.limit });
        })
      ).subscribe(
        () => this.store.dispatch(adminUserLoading({ isLoading: false })),
        error => {
          this.store.dispatch(adminUserLoading({ isLoading: false }))
          this.store.dispatch(adminUserSetErrorMessage({ message: error.error.message || error.message }))
        }
      )
    }
  }

  searchHandler(inputEl: HTMLInputElement, selectEl: HTMLSelectElement) {
    this.store.dispatch(adminUserLoading({ isLoading: true }));
    this.adminService.loadUsers(Object.assign({ page: 1, limit: this.limit, filter: selectEl.value }, inputEl.value != '' ? { search: inputEl.value } : {}))
      .subscribe(
        () => this.store.dispatch(adminUserLoading({ isLoading: false })),
        error => {
          this.store.dispatch(adminUserLoading({ isLoading: false }))
          this.store.dispatch(adminUserSetErrorMessage({ message: error.error.message || error.message }))
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
          this.store.dispatch(adminUserLoading({ isLoading: true }));
          if (search == '') { return this.adminService.loadUsers({ page: 1, limit: 5 }); }
          return this.adminService.loadUsers({ page: 1, limit: this.limit, filter: this.criteria.nativeElement.value, search })
        })
      ).subscribe(
        () => this.store.dispatch(adminUserLoading({ isLoading: false })),
        error => {
          this.store.dispatch(adminUserLoading({ isLoading: false }))
          this.store.dispatch(adminUserSetErrorMessage({ message: error.error.message || error.message }))
        }
      )
  }

  ngOnDestroy(): void {
    this.store.dispatch(adminUserClearUsers());
  }
}
