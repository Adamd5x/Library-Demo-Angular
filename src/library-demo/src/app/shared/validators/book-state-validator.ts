import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function BookStateValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        const value = control.value;

        if (!value || value === 'Uknown' || value === '') {
            return { stateValid: false };
        }

        return null;
    }
}