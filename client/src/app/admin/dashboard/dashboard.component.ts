import { Component, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { IAdminModuleState } from '../+store';
import { adminDashboardClear, adminDashboardLoading, adminDashboardSetErrorMessage, adminDashboardSetExpensiveTrips, adminDashboardSetLogs } from '../+store/actions';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy{
  logs$ = this.store.select(state => state.admin.dashboard.logs);
  isLoading$ = this.store.select(state => state.admin.dashboard.isLoading);
  expensiveTrips$ = this.store.select(state => state.admin.dashboard.trips);
  isActive$ = this.store.select(state => state.admin.menu.isActive);
  errorMessage$ = this.store.select(state => state.admin.dashboard.errorMessage);
  mostExpensiveDestinationHeaders = ['Rank', 'Destination', 'Creator', 'Price'];

  constructor(
    private adminService: AdminService,
    private store: Store<IAdminModuleState>
  ) {
    this.adminService.loadExpensiveTrips()
      .subscribe(
        ({trips}) => this.store.dispatch(adminDashboardSetExpensiveTrips({ trips })),
        error => this.store.dispatch(adminDashboardSetErrorMessage({ message: error.error.message || error.message }))
      );
    this.adminService.loadLoggerInfo().subscribe(
      logs => {
        this.store.dispatch(adminDashboardLoading({ isLoading: false }));
        this.store.dispatch(adminDashboardSetLogs({ logs }));
      },
      error => {
        this.store.dispatch(adminDashboardLoading({ isLoading: false }));
        this.store.dispatch(adminDashboardSetErrorMessage({ message: error.error.message || error.message }));
      }
    );

  }

  closeAction(li: HTMLElement): void {
    li.remove();
  }

  ngOnDestroy():void {
    this.store.dispatch(adminDashboardClear());
  }

}
