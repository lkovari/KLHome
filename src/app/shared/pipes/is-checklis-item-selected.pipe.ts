import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IChecklistItem } from '../models/checklist/checklist-item.interface';

@Pipe({
  name: 'isChecklisItemSelected',
  pure: true
})
export class IsChecklisItemSelectedPipe implements PipeTransform {

  transform(listItemsValue: Array<IChecklistItem>, formArrayItemArg: FormGroup): boolean {
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
