import { Component, OnInit, Input, Output, EventEmitter, forwardRef, AfterViewInit, ElementRef } from '@angular/core';
import { IChecklistItem } from './../../models/checklist/checklist-item.interface';
import { FormGroup, FormBuilder, Validators, FormArray, ControlValueAccessor, AbstractControl, NG_VALUE_ACCESSOR, FormGroupDirective } from '@angular/forms';
import { ChecklistValidators } from './checklist-validators';
import { SelectionMode } from './selection-mode.enum';
import { ChecklistItem } from '../../models/checklist/checklist-item.model';

export const CHECKLIST_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChecklistComponent),
  multi: true
};
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  providers: [CHECKLIST_VALUE_ACCESSOR]
})
export class ChecklistComponent implements OnInit, ControlValueAccessor, AfterViewInit  {
  hoverIndex: any;
  @Input() elementRef: ElementRef;
  @Input() showErrorInside = false;
  private _values: any;
  @Input() 
  set checklistItems(v: Array<IChecklistItem>) {
    this._values = v;
    this._values.forEach((item: IChecklistItem) => {
      this.addChecklistItem(item);
    });
  }
  get checkListItems(): Array<IChecklistItem> {
    return this._values;
  }
  private _selectionMode: SelectionMode;
  @Input() 
  set selectionMode(v: SelectionMode) {
    this._selectionMode = v;
    if (this.getCheckListFormArray()) {
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
  }
  get selectNormal(): boolean {
    return this._selectNormal;
  }
  @Input() required: boolean = false;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  isDisabled = false;
  mainForm: FormGroup;
  parentForm: FormGroup;

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  // private formGroupDirective: FormGroupDirective can get parent FormGroup
  constructor(private formBuilder: FormBuilder, private formGroupDirective: FormGroupDirective) {}    
 
  ngOnInit(): void {
    // define the checklist
    if (!this.mainForm) {
      this.createInternalForm();
    }
    // get the parent form (FormGroup)

    this.parentForm = this.formGroupDirective.control as FormGroup;
    // capture the elementRef to get formGroupName attributze to replace formgGroup wich in used by the component
    let formGroupName = this.elementRef.nativeElement.getAttribute('formGroupName');
    // replace the build checkList on the parent form with the checkListFormArray which built in this component
    this.parentForm.setControl(formGroupName, this.mainForm.controls.checkListFormArray);

    // add items
    if (this.getCheckListFormArray().controls.length < 1) {
      this._values.forEach((item: IChecklistItem) => {
        this.addChecklistItem(item);
      });
    }
    this.mainForm.statusChanges.subscribe(status =>{
      console.log('mainForm status ', status);
    });

    this.getCheckListFormArray().statusChanges.subscribe(status =>{
      console.log('CheckListFormArray Status ' + status);
    });
    
    this.getCheckListFormArray().valueChanges.subscribe(value =>{
      console.log('CheckListFormArray Value ' + value);
    });
  }


  ngAfterViewInit(): void {
    // TODO !!!!!!! later I will fix with the right solution !!!!!!!
    setTimeout(() => {
      this.setupValidatorsDinamiclly();
    });
  }

  createInternalForm() {
    this.mainForm = this.formBuilder.group({
      checkListFormArray: this.formBuilder.array( [], [ ChecklistValidators.oneItemCheckRequiredValidator ] )
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
    this.getCheckListFormArray().controls.forEach((fg: FormGroup) => {
      fg.get('selected')?.patchValue(false);
    });
    this.onModelChange(this.getCheckListFormArray().value);
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
    if (!this.mainForm) {
      this.createInternalForm();
    }
    this.getCheckListFormArray().push(this.createChecklistItem(item));
  }

  trackById(ix: number, abstractControl: AbstractControl): number {
    const checkListItemFormGroup = <FormGroup>abstractControl;
    ix + 1;
    return checkListItemFormGroup.value.id;
  }

  onChecklistItemClick(abstractControl: AbstractControl) {
    this.selectListItem(abstractControl);
    this.onClick.emit(this.mainForm.controls.checkListFormArray);
  }


  /*
   * Writes a new value to the element.
   *
   * This method will be called by the forms API to write to the view when programmatic
   * (model -> view) changes are requested.
   */
  writeValue(values: any[]): void {
    this.getCheckListFormArray()?.patchValue(values);
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
    this.getCheckListFormArray().controls.forEach((formGroupItem: FormGroup) => {
      if (formGroupItem.value.id !== selectedFormGroup.value.id) {
        // original value
        const value = formGroupItem.get('selected')?.value;
        if (value) {
          formGroupItem.get('selected')?.patchValue(false);
          //!!!!!!!formGroupItem.markAsTouched();
          //!!!!!!!formGroupItem.markAsDirty();
        }
      }  
    });
    this.onModelTouched();
    this.onModelChange(this.getCheckListFormArray().value);
  }
  
  private setupValidatorsDinamiclly() {
    // if the validation is required
    if (this.required) {
      // has not added oneItemCheckRequiredValidator
      if (!this.getCheckListFormArray().hasValidator(ChecklistValidators.oneItemCheckRequiredValidator)) {
        // add the oneItemCheckRequiredValidator
        this.getCheckListFormArray().addValidators(ChecklistValidators.oneItemCheckRequiredValidator);
      }
    } else {
      // has already added oneItemCheckRequiredValidator
      if (this.getCheckListFormArray().hasValidator(ChecklistValidators.oneItemCheckRequiredValidator)) {
        // remove oneItemCheckRequiredValidator
        this.getCheckListFormArray().removeValidators(ChecklistValidators.oneItemCheckRequiredValidator);
      }
    }
    this.getCheckListFormArray().updateValueAndValidity();
  }

  private setAllItemsSelection(selected: boolean) {
    this.getCheckListFormArray().controls.forEach((formGroupItem: FormGroup) => {
      formGroupItem.get('selected')?.patchValue(selected);
      formGroupItem.markAsTouched();
      formGroupItem.markAsDirty();
    });
    this.onModelTouched();
    this.onModelChange(this.getCheckListFormArray().value);
  }

  private setAllNormalItemsSelection(selected: boolean) {
    if (this.getCheckListFormArray()) {
      this.getCheckListFormArray().controls.forEach((formGroupItem: FormGroup) => {
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
      this.onModelTouched();
      this.onModelChange(this.getCheckListFormArray().value);
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
      this.onModelChange(this.getCheckListFormArray().value);
      formGroup.updateValueAndValidity();
    }
  }

  getCheckListFormArray(): FormArray {
    return this.mainForm.get('checkListFormArray') as FormArray;
  }
  getSelectedItems(): IChecklistItem[] {
    let selArray = new Array<ChecklistItem>();
    this.getCheckListFormArray().controls.forEach((fg: FormGroup) => {
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
