import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Pipe({
  name: 'extractFormControls'
})
export class ExtractFormControlsPipe implements PipeTransform {

  transform(form: FormGroup): FormGroup[] {
    let result = new Array<FormGroup>();
    if (form) {
      result = <FormGroup[]>(<FormArray>form.get('formArrayItems')).controls;
    }
    return result;
  }

}
