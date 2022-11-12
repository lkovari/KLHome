import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IChecklistItem } from './../../models/checklist/checklist-item.interface';
import { FormGroup, FormBuilder, Validators, FormArray, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { ChecklistValidators } from './checklist-validators';
import { SelectionMode } from './selection-mode.enum';
import { ChecklistItem } from '../../models/checklist/checklist-item.model';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  //viewProviders: [ { provide: ControlContainer, useExisting: FormControlDirective } ],
  providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: ChecklistComponent, multi: true } ]
})
export class ChecklistComponent implements OnInit, ControlValueAccessor, AfterViewInit  {
  hoverIndex: any;
  private _values: any;
  @Input() 
  set checklistItems(v: Array<IChecklistItem>) {
    this._values = v;
  }
  get checkListItems(): Array<IChecklistItem> {
    return this._values;
  }
  private _selectionMode: SelectionMode;
  @Input() 
  set selectionMode(v: SelectionMode) {
    this._selectionMode = v;
    if (this.checkListForm) {
      this.clearSelection();
    }
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
    if (this.checkListForm) {
      this.setAllNormalItemsSelection(v);
    }
  }
  get selectNormal(): boolean {
    return this._selectNormal;
  }
  @Input() required: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  isDisabled = false;
  checkListForm: FormGroup;
  
  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(
    //private formGroupDirective: FormGroupDirective,
    private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
    // define a Form
    this.checkListForm = this.formBuilder.group({
      // define the checklist
      customCheckList: this.formBuilder.array( [], [ ChecklistValidators.mandatoryFieldsDuplicationValidator ] )
    });
    
    // add items
    this._values.forEach((item: IChecklistItem) => {
      this.addChecklistItem(item);
    });
    this.checkListForm.statusChanges.subscribe(status =>{
      console.log('CheckListComponent Status ' + status);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setupValidatorsDinamiclly();
    });
  }

  clearSelection() {
    this.getFormArray().controls.forEach((fg: FormGroup) => {
      fg.get('selected')?.patchValue(false);
      this.onModelChange(this.getFormArray().value);
    });
    this.onModelTouched();
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
    if (this.checkListForm) {
      this.getFormArray().push(this.createChecklistItem(item));
    }
  }

  trackById(ix: number, abstractControl: AbstractControl): number {
    const checkListItemFormGroup = <FormGroup>abstractControl;
    ix + 1;
    return checkListItemFormGroup.value.id;
  }

  getFormArray(): FormArray {
    return (<FormArray>this.checkListForm.get('customCheckList'));
  }

  onChecklistItemClick(abstractControl: AbstractControl) {
    this.selectListItem(abstractControl);
  }


  /*
   * Writes a new value to the element.
   *
   * This method will be called by the forms API to write to the view when programmatic
   * (model -> view) changes are requested.
   */
  writeValue(value: any): void {
    this.getFormArray()?.patchValue(value);
    this._values = value;
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

  private unselectOtherItems(selectedFormGroup: FormGroup): void {
    // unselect other items in the FormArray
    this.getFormArray().controls.forEach((formGroupItem: FormGroup) => {
      if (formGroupItem.value.id !== selectedFormGroup.value.id) {
        // original value
        const value = formGroupItem.get('selected')?.value;
        if (value) {
          formGroupItem.get('selected')?.patchValue(false);
          formGroupItem.markAsUntouched();
          formGroupItem.markAsPristine();
          this.onModelChange(this.getFormArray().value);
        }
      }  
    });
  }
  
  private setupValidatorsDinamiclly() {
    // if the validation is required
    if (this.required) {
      // has not added oneItemCheckRequiredValidator
      if (!this.getFormArray().hasValidator(ChecklistValidators.oneItemCheckRequiredValidator)) {
        // add the oneItemCheckRequiredValidator
        this.getFormArray().addValidators(ChecklistValidators.oneItemCheckRequiredValidator);
      }
    } else {
      // has already added oneItemCheckRequiredValidator
      if (this.getFormArray().hasValidator(ChecklistValidators.oneItemCheckRequiredValidator)) {
        // remove oneItemCheckRequiredValidator
        this.getFormArray().removeValidators(ChecklistValidators.oneItemCheckRequiredValidator);
      }
    }
    this.getFormArray().updateValueAndValidity();
  }

  private setAllItemsSelection(selected: boolean) {
    this.getFormArray().controls.forEach((formGroupItem: FormGroup) => {
      formGroupItem.get('selected')?.patchValue(selected);
      if (selected) {
        formGroupItem.markAsTouched();
        formGroupItem.markAsDirty();
      } else {
        formGroupItem.markAsUntouched();
        formGroupItem.markAsPristine();
      }
      this.onModelChange(this.getFormArray().value);
    });
  }

  private setAllNormalItemsSelection(selected: boolean) {
    if (this.getFormArray()) {
      this.getFormArray().controls.forEach((formGroupItem: FormGroup) => {
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
        this.onModelChange(this.getFormArray().value);
      });
    }
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
    if (formGroup) {
      const value = formGroup.get('selected')?.value;
      if (this._selectionMode === SelectionMode.MULTI) {
        formGroup.get('selected')?.patchValue(!value);
      } else {
        // select the selected form model
        formGroup.get('selected')?.patchValue(!value);
        // unselected all other items
        this.unselectOtherItems(formGroup);
      }
      formGroup.get('selected')?.markAsTouched();
      formGroup.get('selected')?.markAsDirty();
      this.onModelTouched();
      this.onModelChange(this.getFormArray().value);
    }
  }

  getSelectedItems(): IChecklistItem[] {
    let selArray = new Array<ChecklistItem>();
    this.getFormArray().controls.forEach((fg: FormGroup) => {
      if (fg.get('selected')?.value) {
        selArray.push(fg.value);
      }
    });
    return selArray;
  }

  unselectAllItems() {
    this.setAllItemsSelection(false);
  }

  selectAllItems() {
    this.setAllItemsSelection(true);
  }

  selectAllNormal() {
    this.setAllNormalItemsSelection(true);
  }

  unselectAllNormal() {
    this.setAllNormalItemsSelection(false);
  }

}
