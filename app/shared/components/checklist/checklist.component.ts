import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IChecklistItem } from './../../models/checklist/checklist-item.interface';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NG_VALUE_ACCESSOR, FormGroupDirective, ControlContainer, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { ChecklistValidators } from './checklist-validators';
import { SelectionMode } from './selection-mode.enum';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective } ],
  providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: ChecklistComponent, multi: true } ]
})
export class ChecklistComponent implements OnInit, ControlValueAccessor, AfterViewInit  {
  hoverIndex: any;
  selectedItems: Array<IChecklistItem>;
  private _checklistItems: Array<IChecklistItem>;
  @Input() 
  set checklistItems(v: Array<IChecklistItem>) {
    this._checklistItems = v;
  }

  get checklistItems(): Array<IChecklistItem> {
    return this._checklistItems;
  }
  private _selectionMode: SelectionMode;
  @Input() 
  set selectionMode(v: SelectionMode) {
    this._selectionMode = v;
    this.clearSelection();
  }
  get selectionMode(): SelectionMode {
    return this._selectionMode;
  }

  @Input() style: any;
  @Input() styleClass: string;
  @Input() listStyle: any;
  @Input() listStyleClass: string;
  @Input() disabled: boolean = false;
  
  private _selectNormal: boolean = false;
  @Input() 
  set selectNormal(v: boolean) {
    this._selectNormal = v;
    this.setAllNormalItemModelSelection(v);
    this.setAllNormalItemsSelection(v);
  }
  get selectNormal(): boolean {
    return this._selectNormal;
  }
  private _required: boolean = false;
  @Input() 
  set required(v: boolean) {
    this._required = v;
    if (v) {

    }
  }
  get required(): boolean {
    return this._required;
  }

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  isDisabled = false;
  checklistFormArray: FormArray;
  private parentForm: FormGroup;
  
  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(
    private formGroupDirective: FormGroupDirective,
    private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
    // define the checklist
    this.checklistFormArray = this.formBuilder.array( [], [ ChecklistValidators.mandatoryFieldsDuplicationValidator ] );    
    // adding it into parent form form controls
    this.parentForm = this.formGroupDirective.form;
    this.parentForm.setControl('checklistFormArray', this.checklistFormArray);
    // add items
    this._checklistItems.forEach((item: IChecklistItem) => {
      this.addChecklistItem(item);
    });        

    this.parentForm.valueChanges.subscribe((value) => {
      console.log('ParentForm value changed ' + value);
    });

    this.parentForm.statusChanges.subscribe((status) => {
      console.log('ParentForm status changed ' + status);
    });    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setupValidatorsDinamiclly();
    });
  }


  /*
  getFormGroupsOfChecklistFormArray(): Array<FormGroup> {
    const checklistFA = this.parentForm.get('checklist') as FormArray;
    const checkListFormGroupArray = checklistFA.controls as Array<FormGroup>;
    return checkListFormGroupArray;
  }
  */
  getFormGControlOfFormGroup(formGroup: FormGroup, controlName: string): FormControl {
    return  (<FormControl>formGroup.get(controlName));
  }

  clearSelection() {
    this._checklistItems.forEach((item: IChecklistItem) => {
      item.selected = false;
    });
    this.selectedItems = [];
    this.onModelTouched();
    this.onModelChange(this._checklistItems);    
  }

  createChecklistItem(item?: IChecklistItem): FormGroup {
    // create one form item
    const checklistItem = this.formBuilder.group({
      id: [ null, [ Validators.required ] ],
      label: [ null, [ Validators.required ] ],
      value: [ null ],
      selected: this.formBuilder.control( { value: false, disabled: this.disabled } ),
      normal: [ null ]
    });
    if (item) {
      checklistItem.patchValue({
        'id': item && item.id ? item.id : null,
        'label':  item && item.label ?item.label : null,
        'value': item.value,
        'selected': item.selected,
        'normal': item.normal
      });
     }
    return checklistItem;
  }
 
  addChecklistItem(item: IChecklistItem): void {
    if (this.parentForm) {
      // const checklistFA = this.parentForm.get('customCheckList');
      const checklistFA = this.parentForm.get('checklistFormArray');
      if (checklistFA instanceof FormArray) {
        (<FormArray>checklistFA).push(this.createChecklistItem(item));
      } else {
        console.error('The customCheckList is not a FormArray!' + checklistFA || JSON);
      }
    }
  }

  trackById(ix: number, abstractControl: AbstractControl): number {
    const checkListItemFormGroup = <FormGroup>abstractControl;
    ix + 1;
    return checkListItemFormGroup.value.id;
  }

  onChecklistItemKeyDown(event: KeyboardEvent, formGroup: FormGroup) {
    console.log('onChecklistItemKeyDown' + event + " " + JSON.stringify(formGroup.value));
  }

  onChecklistItemTouchEnd(event: KeyboardEvent, formGroup: FormGroup) {
    console.log('onChecklistItemTouchEnd' + event + " " + JSON.stringify(formGroup.value));
  }

  onChecklistItemnDoubleClick(event: KeyboardEvent, formGroup: FormGroup) {
    console.log('onChecklistItemnDoubleClick' + event + " " + JSON.stringify(formGroup.value));
  }

  private unselectOtherItems(selectedFormGroup: FormGroup, selectedItemModel: IChecklistItem): void {
    this.checklistItems.forEach((item: IChecklistItem) => {
      if (item.id != selectedItemModel.id) {
        item.selected = false;
      }
    });
    // unselect other items in the FormArray
    this.checklistFormArray.controls.forEach((formGroupItem: FormGroup) => {
      if (formGroupItem.value.id !== selectedFormGroup.value.id) {
        formGroupItem.get('selected')?.patchValue(false);
        formGroupItem.markAsUntouched();
        formGroupItem.markAsPristine();
      }  
    });
  }


  onChecklistItemClick(event: MouseEvent, abstractControl: AbstractControl) {
    this.selectListItem(abstractControl);
    console.log('onChecklistItemClick' + event + " " + JSON.stringify(abstractControl.value));
  }

  /*
  isChecklistItemSelected(formGroup: FormGroup): boolean {
    console.log('isChecklistItemSelected' + JSON.stringify(formGroup.value));
    if (this._checklistItems && this._checklistItems.length > 0) {
      const itemFound = this._checklistItems.find((item: IChecklistItem) => {
        return formGroup.value.id === item.id;
      });
      return itemFound ? itemFound.selected : false;
    }
    return false;
  }
  */

  /*
   * Writes a new value to the element.
   *
   * This method will be called by the forms API to write to the view when programmatic
   * (model -> view) changes are requested.
   */
  writeValue(value: any): void {
    this._checklistItems = value;
    this.checklistFormArray?.patchValue(value);
  }

  /*
   * Registers a callback function that should be called when the control's value
   * changes in the UI.
   *
   * This is called by the forms API on initialization so it can update the form
   * model when values propagate from the view (view -> model).
   */
  registerOnChange(fn: any): void {
      this.onModelChange = fn;
  }

  /*
   * Registers a callback function that should be called when the control receives
   * a blur event.
   *
   * This is called by the forms API on initialization so it can update the form model
   * on blur.
   */
  registerOnTouched(fn: any): void {
      this.onModelTouched = fn;
  }

  /**
   * This function is called by the forms API when the control status changes to
   * or from "DISABLED". Depending on the value, it should enable or disable the
   * appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
  }  

  private setupValidatorsDinamiclly() {
    // if the validation is required
    if (this.required) {
      // has not added oneItemCheckRequiredValidator
      if (!this.checklistFormArray.hasValidator(ChecklistValidators.oneItemCheckRequiredValidator)) {
        // add the oneItemCheckRequiredValidator
        this.checklistFormArray.addValidators(ChecklistValidators.oneItemCheckRequiredValidator);
      }
    } else {
      // has already added oneItemCheckRequiredValidator
      if (this.checklistFormArray.hasValidator(ChecklistValidators.oneItemCheckRequiredValidator)) {
        // remove oneItemCheckRequiredValidator
        this.checklistFormArray.removeValidators(ChecklistValidators.oneItemCheckRequiredValidator);
      }
    }
    this.checklistFormArray.updateValueAndValidity();
  }

  private setAllItemsSelection(selected: boolean) {
    this.checklistFormArray.controls.forEach((formGroupItem: FormGroup) => {
      formGroupItem.get('selected')?.patchValue(selected);
      if (selected) {
        formGroupItem.markAsTouched();
        formGroupItem.markAsDirty();
      } else {
        formGroupItem.markAsUntouched();
        formGroupItem.markAsPristine();
      }
    });
  }

  private setAllNormalItemsSelection(selected: boolean) {
    if (this.checklistFormArray) {
      this.checklistFormArray.controls.forEach((formGroupItem: FormGroup) => {
        if (selected) {
          const normal = formGroupItem.get('normal')?.value;
          if (normal) {
            formGroupItem.get('selected')?.patchValue(normal);
          }
        } else {
          // only those items unselect which normal marked to true
          if (formGroupItem.get('normal')?.value) {
            formGroupItem.get('selected')?.patchValue(false);
          }
        }
        formGroupItem.markAsTouched();
        formGroupItem.markAsDirty();
      });
    }
  }

  private setAllItemModelSelection(selected: boolean) {
    this._checklistItems.forEach((item: IChecklistItem) => {
      item.selected = selected;
    });
  }

  private setAllNormalItemModelSelection(selected: boolean) {
    this.selectedItems = [];
    this._checklistItems.forEach((item: IChecklistItem) => {
      if (selected) {
        item.selected = Boolean(item.normal);
        if (item.selected) {
          this.selectedItems.push(item);
        }
      } else {
        // only the those items which normal marked to true
        if (item.normal) {
          item.selected = false;
          const itemIndex = this.selectedItems.indexOf(item, 0);
          if (itemIndex > -1) {
            this.selectedItems.splice(itemIndex, 1);
          }            
        }
      }
    });
  }

  /**
   * 
   * @param abstractControl: AbstractControl 
   */
  private selectListItem(abstractControl: AbstractControl | undefined) {
    if (!abstractControl) {
      return;
    }
    const formGroup = <FormGroup>abstractControl;
    const itemFound = this.checklistItems.find((item: IChecklistItem) => {
      return formGroup.value.id === item.id;
    });
    if (itemFound) {
      if (this._selectionMode === SelectionMode.MULTI) {
        formGroup.get('selected')?.patchValue(!itemFound.selected);
        formGroup.get('selected')?.markAsTouched();
        formGroup.get('selected')?.markAsDirty();
        // update data model
        itemFound.selected = !itemFound.selected;
      } else {
        this.selectedItems = [];
        // select the selected form model
        formGroup.get('selected')?.patchValue(!itemFound.selected);
        formGroup.get('selected')?.markAsTouched();
        formGroup.get('selected')?.markAsDirty();
        // update data model
        itemFound.selected = !itemFound.selected
        // unselected all other items
        this.unselectOtherItems(formGroup, itemFound);
        // unselect all other items in data model
        this.checklistItems.forEach((item: IChecklistItem) => {
          if (item.id !== itemFound.id) {
            item.selected = false;
          }
        });
      }
      if (!itemFound.selected) {
        // remove the items from selected
        const itemIndex = this.selectedItems.indexOf(itemFound, 0);
        if (itemIndex > -1) {
          this.selectedItems.splice(itemIndex, 1);
        }  
      } else {
        this.selectedItems.push(itemFound);
      } 
    this.onModelTouched();
      this.onModelChange(this._checklistItems);         
    }
  }

  unselectAllItems() {
    this.setAllItemsSelection(false);
    this.setAllItemModelSelection(false);
    this.selectedItems = [];
  }

  selectAllItems() {
    this.setAllItemsSelection(true);
    this.setAllItemModelSelection(true);
    Object.assign(this.selectedItems, this._checklistItems);
  }

  selectAllNormal() {
    this.setAllNormalItemModelSelection(true);
    this.setAllNormalItemsSelection(true);
  }

  unselectAllNormal() {
    this.setAllNormalItemModelSelection(false);
    this.setAllNormalItemsSelection(false);
  }

}
