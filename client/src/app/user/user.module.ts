import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { TripCardComponent } from './profile/trip-card/trip-card.component';
import { MyTripsComponent } from './profile/my-trips/my-trips.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuddyItemComponent } from './profile/buddy-item/buddy-item.component';
import { UserService } from './user.service';
import { AsideComponent } from './profile/aside/aside.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+store';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    TripCardComponent,
    MyTripsComponent,
    EditProfileComponent,
    BuddyItemComponent,
    AsideComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forFeature('user', reducers)
  ],
  providers:[
    UserService
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]
})
export class UserModule { }
