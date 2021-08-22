import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { UsersComponent } from './users/users.component';
import { TripsComponent } from './trips/trips.component';
import { AdminService } from './admin.service';
import { StatisticComponent } from './statistic/statistic.component';
import { TableComponent } from './table/table.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NavComponent,
    UsersComponent,
    TripsComponent,
    StatisticComponent,
    TableComponent,
    UserProfileEditComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('admin', reducers)
  ],
  providers:[
    AdminService
  ]
})
export class AdminModule { }
