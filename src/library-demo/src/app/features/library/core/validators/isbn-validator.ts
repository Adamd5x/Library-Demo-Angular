import { AbstractControl,
         AsyncValidatorFn } from "@angular/forms";
import { LibraryService } from "../../services/library.service";
import { of } from "rxjs";

export function IsbnValidator(services: LibraryService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        
        return of({});
    }
}