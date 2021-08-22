import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListComponent } from './trip-list/trip-list.component';
import { SharedTripsComponent } from './shared-trips/shared-trips.component';
import { TripService } from './trip.service';
import { TripRoutingModule } from './trip.routing.module';
import { DetailComponent } from './detail/detail.component';
import { TripComponent } from './trip-item/trip.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+store';

@NgModule({
  declarations: [
    TripComponent,
    TripListComponent,
    SharedTripsComponent,
    DetailComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    TripRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('trip', reducers)
  ],
  providers: [
    TripService
  ],
})
export class TripModule { }
