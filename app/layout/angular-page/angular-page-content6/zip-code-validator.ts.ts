import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { ZipCodeService } from "./services/zip-code.service";

/**
 * 
 * @param zipCodeService: ZipCodeService
 * @returns AsyncValidatorFn
 */
export function ZipCodeValidator(zipCodeService: ZipCodeService): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return zipCodeService.zipCodeExists(parseInt(ctrl.value), false).pipe(
            debounceTime(1500),
            map((exists: boolean) => {
                const res = (exists) ? null : { invalidZipCodeAsync: true };
                // console.log(`zipCodeValidator zip ${ctrl.value} errors '${this.customForm.get('customTab2')?.get('zipCode')?.errors} zip exists ${exists}.`);
                return res;
            }
        ));
    };
}

/*
@Injectable({
    providedIn: 'root'
})
export class ZipCodeValidator implements AsyncValidator {

    constructor(private zipCodeService: ZipCodeService) {}

    validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.zipCodeService.zipCodeExists((<FormControl>c).value).pipe(
            map(exists => exists ? null : { invalidZipCodeAsync: true})
        );
    }
}
*/
