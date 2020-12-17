import { Component, OnInit, Input } from '@angular/core';
import { IChecklistItem } from './../../models/checklist/checklist-item.interface';
import { FormGroup, FormGroupDirective, FormBuilder, Validators, FormArray, ControlContainer, FormControl } from '@angular/forms';
import { ChecklistValidators } from './checklist-validators';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective } ]
})
export class ChecklistComponent implements OnInit {
  private _checklistItems: Array<IChecklistItem>;
  @Input() 
  set checklistItems(v: Array<IChecklistItem>) {
    this._checklistItems = v;
  }

  get checklistItems(): Array<IChecklistItem> {
    return this._checklistItems;
  }


  isDisabled = false;
  checklistFormArray: FormArray;
  private parentForm
  constructor(private formGroupDirective: FormGroupDirective, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    // adding it into parent form form controls
    this.parentForm = this.formGroupDirective.form;
    this.parentForm.addControl('checklist', this.checklistFormArray);   

    // remove the first "dummy" item which used to initialization
    this.checklistFormArray.removeAt(0);
    // add items
    this._checklistItems.forEach((item: IChecklistItem) => {
      this.addChecklistItem(item);
    });        
  }

  initializeFormGroup() {
    // define the checklist
    this.checklistFormArray = this.formBuilder.array( [ this.createChecklistItem() ], ChecklistValidators.mandatoryFieldsDuplicationValidator );
  }

  getFormGroupsOfChecklistFormArray() {
    // (<FormArray>this.mainForm?.get('userRoles')).controls;
    return (<FormArray>this.parentForm?.get('checklist')).controls;
    /*
    const checklistFA = this.parentForm.get('checklist');
    return (<FormArray>checklistFA).controls;
    */
  }

  getFormGControlOfFormGroup(formGroup: FormGroup, controlName: string): FormControl {
    return  (<FormControl>formGroup.get(controlName));
  }

  createChecklistItem(item?: IChecklistItem): FormGroup {
    // every change shoulkd triggering update
    const updateOnObj = { updateOn: 'change' };
    // create one form item
    const checklistGroup = this.formBuilder.group({
      id: [ null, [ Validators.required ] ],
      label: [ null, [ Validators.required ] ],
      value: [ null ],
      selected: [ false ],
      normal: [ null ]
    }, updateOnObj);
    if (item) {
      checklistGroup.patchValue({
        'id': item && item.id ? item.id : null,
        'label':  item && item.label ?item.label : null,
        'value': item.value,
        'selected': item.selected,
        'normal': item.normal
      });
     }
    return checklistGroup;
  }
 
  addChecklistItem(item: IChecklistItem): void {
    if (this.parentForm) {
      const checklistFA = this.parentForm.get('checklist');
      (<FormArray>checklistFA).push(this.createChecklistItem(item));
    }
  }
  
}
