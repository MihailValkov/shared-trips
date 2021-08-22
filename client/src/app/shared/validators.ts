import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export function validatorEmail(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) { return null; }
  const isValidEmail = /^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/.test(value);
  return isValidEmail ? null : { emailValidator: true };
}

export function validatorRepass(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.validatorRepass) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ validatorRepass: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
