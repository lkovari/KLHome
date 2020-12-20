import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  hoverIndex: any;
  private _checklistItems: Array<IChecklistItem>;
  @Input() 
  set checklistItems(v: Array<IChecklistItem>) {
    this._checklistItems = v;
  }

  get checklistItems(): Array<IChecklistItem> {
    return this._checklistItems;
  }
  @Input() multiple: boolean = false;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() listStyle: any;
  @Input() listStyleClass: string;
  @Input() disabled: boolean = false;

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();

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

  getFormGroupsOfChecklistFormArray(): Array<FormGroup> {
    //return (<FormArray>this.parentForm?.get('checklist')).controls;
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
    if (this.multiple) {
      if (itemFound) {
        itemFound.selected = !itemFound.selected;
      }  
    } else {
      if (itemFound) {
        itemFound.selected = true;
        this.checklistItems.forEach((item: IChecklistItem) => {
          if (item.id !== itemFound.id) {
            item.selected = false;
          }
        });
      }
    }
    
    console.log('onChecklistItemClick' + event + " " + JSON.stringify(formGroup.value));
  }

  isChecklistItemSelected(formGroup: FormGroup): boolean {
    console.log('isChecklistItemSelected' + JSON.stringify(formGroup.value));
    const itemFound = this.checklistItems.find((item: IChecklistItem) => {
      return formGroup.value.id === item.id;
    });
    return itemFound ? itemFound.selected : false;;
  }

  isCheckListItemVisible(formGroup: FormGroup): boolean {
    console.log('isChecklistItemVisible' + JSON.stringify(formGroup.value));
    return true;
  }

  isChecklistItemDisabled(formGroup: FormGroup): boolean {
    return formGroup.value.disabled;
  }

}
