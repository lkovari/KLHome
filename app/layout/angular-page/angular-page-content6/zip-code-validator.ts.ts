import { Injector } from "@angular/core";
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ZipCodeService } from "./services/zip-code.service";

export function ZipCodeValidator(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        let injector = Injector.create({providers: [{provide: ZipCodeService, deps: []}]});
        let zipCodeService = injector.get(ZipCodeService);
        
        return zipCodeService.zipCodeExists((<FormControl>c).value).pipe(
            map(exists => exists ? null : { invalidZipCodeAsync: true})
        );        
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
