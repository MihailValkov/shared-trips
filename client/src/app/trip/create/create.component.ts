import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateUser } from 'src/app/+store/actions';
import { ITripModuleState } from '../+store';
import { tripCreateErrorMessage, tripCreateLoading } from '../+store/actions';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  form: FormGroup;
  isLoading$ = this.store.select(state => state.trip.create.isLoading);
  errorMessage$ = this.store.select(state => state.trip.create.errorMessage);
  
  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router,
    private store: Store<ITripModuleState>
  ) {
    this.form = this.fb.group({
      startPoint: ['', [Validators.required, Validators.minLength(4)]],
      endPoint: ['', [Validators.required, Validators.minLength(4)]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      carImage: ['', [Validators.required]],
      carBrand: ['', [Validators.required, Validators.minLength(4)]],
      seats: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      smoking: [''],
      eating: [''],
      drinking: [''],
      climatic: [''],
    });
  }

  validateField(name: string) {
    return this.form.get(name)?.touched && this.form.get(name)?.errors
  }

  getImageUrl(data: { imageUrl: string, message: string }): void {
    this.store.dispatch(tripCreateErrorMessage({ message: '' }));
    if (data?.message) {
      this.store.dispatch(tripCreateErrorMessage({ message: data?.message }));
      this.form.controls.carImage.setErrors({ invalid: true });
      return;
    }
    this.form.controls.carImage.setValue(data.imageUrl)
  }

  submitHandler(): void {
    this.store.dispatch(tripCreateErrorMessage({ message: '' }));
    this.store.dispatch(tripCreateLoading({ isLoading: true }));
    this.tripService.createTrip(this.form.value).subscribe(
      ({ trip, user }) => {
        this.store.dispatch(tripCreateLoading({ isLoading: false }));
        this.store.dispatch(updateUser({ user }));
        this.router.navigate([`/trip/detail/${trip._id}`])
      },
      error => {
        this.store.dispatch(tripCreateLoading({ isLoading: false }));
        this.store.dispatch(tripCreateErrorMessage({ message: error.message }));
      }
    )
  }
}
