import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth.service';
import { IAdminModuleState } from '../+store';
import { adminAsideSetStatistics, adminDashboardSetErrorMessage, adminSetMenuIsActive } from '../+store/actions';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  admin$ = this.authService.user$;
  statistics$ = this.adminService.statistics$;
  isActive$ = this.store.select(state => state.admin.menu.isActive);
  errorMessage$ = this.store.select(state => state.admin.dashboard.errorMessage);

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private store: Store<IAdminModuleState>,
  ) {
    this.adminService.loadStatistics().subscribe(
      statistics => { },
      error => this.store.dispatch(adminDashboardSetErrorMessage({ message: error.error.message || error.message }))
    )
  }

  show() {
    this.store.dispatch(adminSetMenuIsActive())
  }
}
