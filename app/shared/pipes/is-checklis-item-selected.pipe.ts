import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IChecklistItem } from '../models/checklist/checklist-item.interface';

@Pipe({
  name: 'isChecklisItemSelected',
  pure: true
})
export class IsChecklisItemSelectedPipe implements PipeTransform {

  transform(listItemsValue: Array<IChecklistItem>, abstractControl: AbstractControl): boolean {
    const formArrayItemArg = <FormGroup>abstractControl;
    console.log('isChecklistItemSelected' + JSON.stringify(formArrayItemArg.value));
    if (listItemsValue && listItemsValue.length > 0) {
      const itemFound = listItemsValue.find((item: IChecklistItem) => {
        return formArrayItemArg.value.id === item.id;
      });
      return itemFound ? itemFound.selected : false;
    }
    return false;
  }
}
