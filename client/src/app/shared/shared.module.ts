import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuddyComponent } from './buddy/buddy.component';
import { LoaderComponent } from './loader/loader.component';
import { InputComponent } from './input/input.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    BuddyComponent,
    LoaderComponent,
    InputComponent,
    PaginationComponent,
    ErrorComponent,
    TimePipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    BuddyComponent,
    LoaderComponent,
    InputComponent,
    PaginationComponent,
    ErrorComponent,
    TimePipe
  ]
})
export class SharedModule { }
