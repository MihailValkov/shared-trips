import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ITripModuleState } from '../+store';
import { tripUpdateErrorMessage, tripUpdateLoading } from '../+store/actions';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  form: FormGroup;
  trip$ = this.tripService.trip$;
  isLoading$ = this.store.select(state => state.trip.update.isLoading);
  errorMessage$ = this.store.select(state => state.trip.update.errorMessage);

  constructor(
    private tripService: TripService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<ITripModuleState>
  ) {

    this.tripService.loadTrip(this.activatedRoute.snapshot.params.tripId)
      .subscribe(({ trip }) => {
        this.form.patchValue(trip);
        this.store.dispatch(tripUpdateLoading({ isLoading: false }));
      });

    this.form = this.fb.group({
      startPoint: ['', [Validators.required, Validators.minLength(4)]],
      endPoint: ['', [Validators.required, Validators.minLength(4)]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      carImage: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
      carBrand: ['', [Validators.required, Validators.minLength(4)]],
      seats: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      price: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      description: ['',[Validators.required, Validators.minLength(10)]],
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
    this.store.dispatch(tripUpdateErrorMessage({ message: '' }));
    if (data?.message) {
      this.store.dispatch(tripUpdateErrorMessage({ message: data?.message }));
      this.form.controls.carImage.setErrors({ invalid: true });
      return;
    }
    this.form.controls.carImage.setValue(data.imageUrl)
  }

  submitHandler(tripId: string): void {
    this.store.dispatch(tripUpdateErrorMessage({ message: '' }));
    this.store.dispatch(tripUpdateLoading({ isLoading: true }));
    this.tripService.editTrip(this.form.value, tripId).subscribe(
      next => {
        this.store.dispatch(tripUpdateLoading({ isLoading: false }));
        this.router.navigate([`/trip/detail/${tripId}`])
      },
      error => {
        this.store.dispatch(tripUpdateErrorMessage({ message: error.error.message || error.message }));
        this.store.dispatch(tripUpdateLoading({ isLoading: false }));
      }
    )
  }
}
