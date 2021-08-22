import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { IAdminModuleState } from '../+store';
import { adminUserLoading, adminUserClearUsers, adminUserSetCurrentPage, adminUserSetErrorMessage, adminUserSetUsers, adminUserSetUsersCount } from '../+store/actions';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy {
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
      )
      .subscribe(
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
      this.adminService.deleteUser(id).pipe(
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

  ngOnDestroy(): void {
    this.store.dispatch(adminUserClearUsers());
  }

}
