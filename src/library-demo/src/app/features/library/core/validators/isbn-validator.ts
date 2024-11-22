import { AbstractControl,
         AsyncValidatorFn } from "@angular/forms";
import { LibraryService } from "../../services/library.service";
import { map } from "rxjs";

export function IsbnValidator(service: LibraryService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        const isbn = control.value;
        return service.checkIsbn(isbn)
                      .pipe(
                        map(rest => {
                            return rest ? {isbnExists: true} : null;
                        }));
    }
}