import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { debounceTime, concatMap, takeUntil } from 'rxjs/operators';
import { CategoryType } from './category.enum';
import { CategoryModel } from './data-models/category.model';
import { FormDataModel } from './data-models/form-data.model';
import { FormArrayCustomValidators } from './formarray-custom-validators';
import { DummyFormdataService } from './services/dummy-formdata.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-angular-page-content12',
  templateUrl: './angular-page-content12.component.html',
  styleUrls: ['./angular-page-content12.component.scss'],
  providers: [MessageService]
})
export class AngularPageContent12Component implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>()
  githubLogoPath: string;
  hexIdMinLength = 8;
  descriptionMaxLength = 24;
  mainForm: FormGroup;
  hexPattern = '^[0-9a-fA-F]+$';
  categories: Array<CategoryModel>;
  AUTOSAVE_DEBOUNCE_TIME = 1500;
  saveInProgress = false;
  allowWaitIndicator = false;
  todayDate: Date;
  emptyString: string;

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private dummyFormDataService: DummyFormdataService
             ) { }

  ngOnInit(): void {
    const updateOnObj = { updateOn: 'change' };
    this.mainForm = this.formBuilder.group({
      formArrayItems: this.formBuilder.array( [] , FormArrayCustomValidators.formArrayValidator )
    }, updateOnObj);
    this.todayDate = new Date();
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.initializeModuleCategory();
  }


  private initializeModuleCategory() {
    this.categories = [];
    const enumMembers = Object.keys(CategoryType);
    const enumMap = enumMembers.filter((x) => Number.isNaN(parseInt(x, 10)));
    this.categories = enumMap.map((key) => {
      return { label: key, value: CategoryType[key], disabled: false };
    });
  }

  private clearModel() {
    const formArray = <FormArray>this.mainForm.get('formArrayItems');
    if (formArray) {
      formArray.clear();
      formArray.reset();
    }
    this.mainForm.reset();    
  }

  /**
   * 
   * @param value: any) 
   * @returns Observable<boolean>
   */
  private rowSave(value: any):Observable<string> {
    let res = of(this.emptyString);
    if (this.isFormValid()) {
      const changedItem = <FormDataModel>value;
      // is the form is filled?
      if (value.hexId !== null && value.category !== null) {
        // save the form value
        console.log(`FormData save started : ${JSON.stringify(changedItem)}.`);
        this.messageService.add({severity:'info', summary: 'Info', detail: `FormData save started, HexId : ${changedItem.hexId}.`});
        res = this.dummyFormDataService.saveData(value);
      }
    } else {
      console.log(`rowSave Form invalid : ${JSON.stringify(value)}.`);      
    }
    return res;
  }

  /**
   * 
   * @param hexId: string 
   * @returns FormGroup | null
   */
  private findTheChangedFormGroupByHexId(hexId: string): FormGroup | null {
    let foundFormGroup;
    // get FormArray
    const formArrayFormGroups = <FormArray>this.mainForm.get('formArrayItems');
    // check each form (FormGroup) in the FormArray
    for (let ix = 0; ix < formArrayFormGroups.length; ix++) {
      // get a FormGroup
      const formGroup = <FormGroup>formArrayFormGroups.at(ix);
      // is the FormGroup changed and is valid?
      if (formGroup && formGroup.dirty && formGroup.valid) {
        const hexIdFormControl = formGroup.get('hexId');
        const hexIdValue = hexIdFormControl?.value;
        // is the sourceIdentifier matched?
        if (hexIdValue === hexId) {
          foundFormGroup = formGroup!;
        }
      }
    }
    return foundFormGroup;
  }

  /**
   * 
   * @param formGroup : FormGroup
   */
  private clearModifiedFormGroup(formGroup?: FormGroup | null) {
    if (formGroup) {
        // when the update return with succeess clear the walidation
        formGroup.markAsPristine();
        formGroup.clearValidators();
        const hexIdFormControl = <FormControl>formGroup.get('hexId');
        this.messageService.add({severity:'success', summary: 'Success', detail: `FormData save successed! Hex Id: ${hexIdFormControl.value}.`});
    }
  }

  private setupValueChanges(formArrayItem: FormGroup) {
    formArrayItem.valueChanges.pipe(
      // prevent unnecessary save
      debounceTime(this.AUTOSAVE_DEBOUNCE_TIME),
      // during save happened a new value skip the previous save and processing the new
      concatMap(value => this.rowSave(value)),
      // Emit values until provided observable emits.
      takeUntil(this.unsubscribe$)      
    ) 
    .subscribe((result: any) => {
      if (result) {
        this.saveInProgress = false;
        const newHexId = <string>result;
        // find the form control
        const formGroup = this.findTheChangedFormGroupByHexId(newHexId);
        this.clearModifiedFormGroup(formGroup);
      }
    });    
  }

  private createFormArrayItem(formData?: FormDataModel): FormGroup {
    const formArrayItem = this.formBuilder.group({
      hexId: [ {value: null, disabled: false }, [ Validators.required, Validators.minLength(this.hexIdMinLength),
        Validators.pattern(this.hexPattern) ] ],
      category: [{ value: null, disabled: false }, Validators.required ],
      currentDate: [ null ],
      description: [ null, [ Validators.required, Validators.maxLength(this.descriptionMaxLength) ] ],
      comment: [ null ],
    });
    const hexId = formData ? formData.hexId : null;
    formArrayItem.get('hexId')?.patchValue(hexId);
    const category = formData ? formData.category : null;
    formArrayItem.get('category')?.patchValue(category);
    const currentDate = formData ? formData.currentDate : this.todayDate;
    formArrayItem.get('currentDate')?.patchValue(currentDate);
    const description = formData ? formData.description : null;
    formArrayItem.get('description')?.patchValue(description);
    const comment = formData ? formData.comment : null;
    formArrayItem.get('comment')?.patchValue(comment);
    this.setupValueChanges(formArrayItem);
    return formArrayItem;
  }

  isFieldInvalid(formControl: FormControl | null, field: string): boolean {
    let isInvalid = false;
    if (formControl) {
      const dataField = formControl.get(field);
      if (dataField) {
        isInvalid = dataField.invalid;
      } else {
        isInvalid = false;
      }
    } else {
      isInvalid = false;
    }
    return isInvalid;
  }

  calcTabIndex(ix: number, seq: number): number {
    return (ix * 10) + seq;
  }

  hasDuplicatedRows(form: FormGroup | null): any {
    const formArrayItems = form ?  form?.get('formArrayItems') : null;
    return formArrayItems ? formArrayItems?.errors && formArrayItems.errors.hexIdDuplication : null;
  }

  extractErrorValue(): string | null {
    const formArrayItems = this.mainForm?.get('formArrayItems');
    return formArrayItems?.errors?.hexIdDuplication.value;
  }

  getRowCount(): AbstractControl[] {
    return (<FormArray>this.mainForm?.get('formArrayItems')).controls;
  }  

  onAddRow(event: Event) {
    if (this.mainForm) {
      const formArrayItem = this.createFormArrayItem();
      const formArray = <FormArray>this.mainForm.get('formArrayItems');
      formArray.push(formArrayItem);
      console.log(`onAddRow  : ${JSON.stringify(formArrayItem.value)} at ${event.target}.`)
    }
  }


  onClearModel(event: Event) {
    if (this.mainForm) {
      this.clearModel();
      console.log(`onClearModel  : ${JSON.stringify(this.mainForm.value)} at ${event.target}.`)
    }
  }

  isFormValid(): boolean {
    return this.mainForm && this.mainForm.valid;
  }

  hasFormArrayItems(): boolean {
    return this.getRowCount().length > 0;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }  
}
