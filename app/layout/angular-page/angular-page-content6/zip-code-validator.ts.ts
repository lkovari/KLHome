import { Injectable, Injector } from "@angular/core";
import { AbstractControl, AsyncValidator, /*AsyncValidatorFn,*/ ValidationErrors } from "@angular/forms";
import { Observable, } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { ZipCodeService } from "./services/zip-code.service";

/**
 * 
 * @param zipCodeService: ZipCodeService
 * @returns AsyncValidatorFn
 *
export function ZipCodeValidator(zipCodeService: ZipCodeService): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return zipCodeService.zipCodeExists(parseInt(ctrl.value), false).pipe(
            debounceTime(1500),
            map((exists: boolean) => {
                const res = (exists) ? null : { zipCodeNotFoundAsync: true };
                // console.log(`zipCodeValidator zip ${ctrl.value} errors '${this.customForm.get('customTab2')?.get('zipCode')?.errors} zip exists ${exists}.`);
                return res;
            }
        ));
    };
}
*/

@Injectable({
    providedIn: 'root'
})
export class ZipCodeValidator implements AsyncValidator {

    constructor(private injector: Injector) {}

    validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        var zipCodeService = this.injector.get(ZipCodeService);
        return zipCodeService.zipCodeExists(parseInt(c.value), false).pipe(
            debounceTime(1500),
            map((exists: boolean) => exists ? null : { zipCodeNotFoundAsync: true} )
        );
    }
}

