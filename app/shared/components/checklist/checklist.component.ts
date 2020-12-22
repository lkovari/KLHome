import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IChecklistItem } from './../../models/checklist/checklist-item.interface';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NG_VALUE_ACCESSOR, FormGroupDirective, ControlContainer, ControlValueAccessor } from '@angular/forms';
import { ChecklistValidators } from './checklist-validators';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective } ],
  providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: ChecklistComponent, multi: true } ]
})
export class ChecklistComponent implements OnInit, ControlValueAccessor {
  hoverIndex: any;
  private _checklistItems: Array<IChecklistItem>;
  @Input() 
  set checklistItems(v: Array<IChecklistItem>) {
    this._checklistItems = v;
  }

  get checklistItems(): Array<IChecklistItem> {
    return this._checklistItems;
  }
  private _multiSelect: boolean;
  @Input() 
  set multiSelect(v: boolean) {
    this._multiSelect = v;
    this.clearSelection();
  }
  get multiSelect(): boolean {
    return this._multiSelect;
  }

  @Input() style: any;
  @Input() styleClass: string;
  @Input() listStyle: any;
  @Input() listStyleClass: string;
  @Input() disabled: boolean = false;

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
    this.initializeFormGroup();
    // adding it into parent form form controls
    this.parentForm = this.formGroupDirective.form;
    // this.parentForm.setControl('checklist', this.checklistFormArray);
    this.parentForm.removeControl('checklist');
    this.parentForm.addControl('checklist', this.checklistFormArray);       
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

  initializeFormGroup() {
    // define the checklist
    this.checklistFormArray = this.formBuilder.array( [], ChecklistValidators.mandatoryFieldsDuplicationValidator );
  }

  getFormGroupsOfChecklistFormArray(): Array<FormGroup> {
    const checklistFA = this.parentForm.get('checklist') as FormArray;
    const checkListFormGroupArray = checklistFA.controls as Array<FormGroup>;
    return checkListFormGroupArray;
  }

  getFormGControlOfFormGroup(formGroup: FormGroup, controlName: string): FormControl {
    return  (<FormControl>formGroup.get(controlName));
  }

  getLabelOfFormGControlOfFormGroup(formGroup: FormGroup): string {
    return formGroup.value.label;
  }

  clearSelection() {
    this._checklistItems.forEach((item: IChecklistItem) => {
      item.selected = false;
    });
    this.onModelTouched();
    this.onModelChange(this._checklistItems);    
  }

  createChecklistItem(item?: IChecklistItem): FormGroup {
    // every change shoulkd triggering update
    const updateOnObj = { updateOn: 'change' };
    // create one form item
    const checklistItem = this.formBuilder.group({
      id: [ null, [ Validators.required ] ],
      label: [ null, [ Validators.required ] ],
      value: [ null ],
      selected: [ false ],
      normal: [ null ]
    }, updateOnObj);
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
      const checklistFA = this.parentForm.get('checklist');
      (<FormArray>checklistFA).push(this.createChecklistItem(item));
    }
  }

  trackById(ix: number, checkListItemFormGroup: FormGroup) {
    console.log('trackById ix ' + ix);
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

  onChecklistItemClick(event: KeyboardEvent, formGroup: FormGroup) {
    const itemFound = this.checklistItems.find((item: IChecklistItem) => {
      return formGroup.value.id === item.id;
    });
    if (this._multiSelect) {
      if (itemFound) {
        itemFound.selected = !itemFound.selected;
        formGroup.value.selected = !formGroup.value.selected;
        formGroup.markAsTouched();
        formGroup.markAsDirty();
      }  
    } else {
      if (itemFound) {
        // select the selected form model
        formGroup.value.selected = true;
        // unselected all other items
        this.checklistFormArray.controls.forEach((formGroupItem: FormGroup) => {
          if (formGroupItem.value.id !== itemFound.id) {
            formGroupItem.value.selected = false;
            formGroupItem.markAsPristine();
          }  
        });
        // status notification
        formGroup.markAsTouched();
        formGroup.markAsDirty();

        // update data model
        itemFound.selected = true;
        // unselect all other items in data model
        this.checklistItems.forEach((item: IChecklistItem) => {
          if (item.id !== itemFound.id) {
            item.selected = false;
          }
        });
      }
      this.onModelTouched();
      this.onModelChange(this._checklistItems);         
    }
    
    console.log('onChecklistItemClick' + event + " " + JSON.stringify(formGroup.value));
  }

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

  isCheckListItemVisible(formGroup: FormGroup): boolean {
    console.log('isChecklistItemVisible' + JSON.stringify(formGroup.value));
    return true;
  }

  isChecklistItemDisabled(formGroup: FormGroup): boolean {
    return formGroup.value.disabled;
  }

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
}
