import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IChecklistItem } from './../../models/checklist/checklist-item.interface';
import { FormGroup, FormBuilder, Validators, FormArray, ControlValueAccessor, AbstractControl, NG_VALUE_ACCESSOR, ControlContainer, FormGroupDirective } from '@angular/forms';
import { ChecklistValidators } from './checklist-validators';
import { SelectionMode } from './selection-mode.enum';
import { ChecklistItem } from '../../models/checklist/checklist-item.model';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective } ],
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
    if (this.checkListFormArray) {
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
    /*
    if (this.checkListFormArray) {
      this.setAllNormalItemsSelection(v);
    }
    */
  }
  get selectNormal(): boolean {
    return this._selectNormal;
  }
  @Input() required: boolean = false;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  isDisabled = false;
  private parentForm: FormGroup;
  checkListFormArray: FormArray;

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(private formBuilder: FormBuilder, private formGroupDirective: FormGroupDirective) {}    
 
  ngOnInit(): void {
    // define the checklist
    this.checkListFormArray = this.formBuilder.array( [], [ ChecklistValidators.mandatoryFieldsDuplicationValidator ] )

    // adding it into parent form form controls
    this.parentForm = this.formGroupDirective.form;
    this.parentForm.setControl('checkListFormArray', this.checkListFormArray);

    // add items
    this._values.forEach((item: IChecklistItem) => {
      this.addChecklistItem(item);
    });
    this.checkListFormArray.statusChanges.subscribe(status =>{
      console.log('CheckListFormArray Status ' + status);
    });
  }

  ngAfterViewInit(): void {
    // TODO !!!!!!! later I will fix with the right solution !!!!!!!
    setTimeout(() => {
      this.setupValidatorsDinamiclly();
    });
  }

  hasNormalValue(ac: AbstractControl): boolean {
    let res = false;
    if (ac instanceof FormGroup) {
      const formArrayItem = <FormGroup>ac;
      res = Boolean(formArrayItem.get('normal'));
    } 
    return res;
  }

  getNormalValue(ac: AbstractControl): boolean {
    let res = false;
    if (ac instanceof FormGroup) {
      const formArrayItem = <FormGroup>ac;
      res = formArrayItem.get('normal') && formArrayItem.get('normal')?.value;
    } 
    return res;
  }

  needToShowNormalItems(selectNormal: boolean, ac: AbstractControl): boolean {
    return ( selectNormal && this.hasNormalValue(ac) ? this.getNormalValue(ac) : false );
  }

  clearSelection() {
    this.checkListFormArray.controls.forEach((fg: FormGroup) => {
      fg.get('selected')?.patchValue(false);
    });
    this.onModelChange(this.checkListFormArray.value);
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
    if (this.checkListFormArray) {
      this.checkListFormArray.push(this.createChecklistItem(item));
    }
  }

  trackById(ix: number, abstractControl: AbstractControl): number {
    const checkListItemFormGroup = <FormGroup>abstractControl;
    ix + 1;
    return checkListItemFormGroup.value.id;
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
  writeValue(values: any[]): void {
    this.checkListFormArray?.patchValue(values);
    this._values = values;
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
    this.checkListFormArray.controls.forEach((formGroupItem: FormGroup) => {
      if (formGroupItem.value.id !== selectedFormGroup.value.id) {
        // original value
        const value = formGroupItem.get('selected')?.value;
        if (value) {
          formGroupItem.get('selected')?.patchValue(false);
          formGroupItem.markAsTouched();
          formGroupItem.markAsDirty();
          this.onModelChange(this.checkListFormArray.value);
        }
      }  
    });
  }
  
  private setupValidatorsDinamiclly() {
    // if the validation is required
    if (this.required) {
      // has not added oneItemCheckRequiredValidator
      if (!this.checkListFormArray.hasValidator(ChecklistValidators.oneItemCheckRequiredValidator)) {
        // add the oneItemCheckRequiredValidator
        this.checkListFormArray.addValidators(ChecklistValidators.oneItemCheckRequiredValidator);
      }
    } else {
      // has already added oneItemCheckRequiredValidator
      if (this.checkListFormArray.hasValidator(ChecklistValidators.oneItemCheckRequiredValidator)) {
        // remove oneItemCheckRequiredValidator
        this.checkListFormArray.removeValidators(ChecklistValidators.oneItemCheckRequiredValidator);
      }
    }
    this.checkListFormArray.updateValueAndValidity();
  }

  private setAllItemsSelection(selected: boolean) {
    this.checkListFormArray.controls.forEach((formGroupItem: FormGroup) => {
      formGroupItem.get('selected')?.patchValue(selected);
      formGroupItem.markAsTouched();
      formGroupItem.markAsDirty();
    });
    this.onModelChange(this.checkListFormArray.value);
  }

  private setAllNormalItemsSelection(selected: boolean) {
    if (this.checkListFormArray) {
      this.checkListFormArray.controls.forEach((formGroupItem: FormGroup) => {
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
        this.onModelChange(this.checkListFormArray.value);
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
      this.onModelChange(this.checkListFormArray.value);
      formGroup.updateValueAndValidity();
    }
  }

  getSelectedItems(): IChecklistItem[] {
    let selArray = new Array<ChecklistItem>();
    this.checkListFormArray.controls.forEach((fg: FormGroup) => {
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
