import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, of, Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { debounceTime, concatMap, takeUntil, distinctUntilChanged, catchError } from 'rxjs/operators';
import { CategoryType } from './category.enum';
import { CategoryModel } from './data-models/category.model';
import { FormDataModel } from './data-models/form-data.model';
import { CustomFormArrayValidators } from './custom-formarray-validators';
// import { DummyFormdataService } from './services/dummy-formdata.service';
import { MessageService } from 'primeng/api';
import { AngularFireList } from '@angular/fire/database/angular-fire-database';
import { FirebaseService } from './services/firebase.service';
import { map } from 'rxjs/operators';

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
  allowWaitIndicator = false;
  emptyString: string;
  table_pg12$: AngularFireList<any>;
  rowAdd = false;

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              // private dummyFormDataService: DummyFormdataService,
              private firebaseService: FirebaseService
             ) { }

  ngOnInit(): void {
    this.mainForm = this.formBuilder.group(
      {
        formArrayItems: this.formBuilder.array( [] , CustomFormArrayValidators.formArrayValidator )
      }
    );
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.initializeModuleCategory();
    this.loadRows();
  }


  private initializeModuleCategory() {
    this.categories = [];
    const enumMembers = Object.keys(CategoryType);
    const enumMap = enumMembers.filter((x) => Number.isNaN(parseInt(x, 10)));
    this.categories = enumMap.map((key) => {
      return { label: key, value: CategoryType[key], disabled: false };
    });
  }

  private clearModel(clear: boolean) {
    const formArray = <FormArray>this.mainForm.get('formArrayItems');
    if (formArray) {
      formArray.markAsPristine();
      formArray.markAsTouched();
      if (clear) {
        formArray.clear();
        formArray.reset();
        this.mainForm.reset();    
      }
    }
  }

  /**
   * 
   * @param value: any) 
   * @returns Observable<void>
   */
  private saveRow(value: any): Observable<void> {
    if (this.isFormValid()) {
      const changedItem = <FormDataModel>value;
      // is the form is filled?
      if (value.hexId !== null && value.category !== null) {
        // save the form value
        console.log(`FormData save started : ${JSON.stringify(changedItem)}.`);
        this.messageService.add({severity:'info', summary: 'Info', detail: `FormData save started, HexId : ${changedItem.hexId}.`});
        // res = this.dummyFormDataService.saveData(value);
        if (!changedItem.key) {
          return this.firebaseService.createFormArrayItem(value);
        } else {
          return from(this.firebaseService.update(changedItem.key, changedItem));
        }
      }
    } else {
      console.log(`saveRow Form invalid : ${JSON.stringify(value)}.`);      
    }
    return of();
  }

  private loadRows() {
    // get FormArray
    const formArrayFormGroups = <FormArray>this.mainForm.get('formArrayItems');
    this.firebaseService.getAllFormArrayItems().snapshotChanges().pipe(
      map(changes =>
        // set the key into key FormControl for the update
        changes.map(c =>
          // set the key from the returned data
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(items => {
      // clear datamodel, more exactly the items in the -> <FormArray>this.mainForm.get('formArrayItems')
      this.clearModel(true);
      items.forEach(( item: any) => {
        const formItem = this.createFormArrayItem(item);
        formArrayFormGroups.push(formItem);
      });
    });
  }
  
  private setupValueChanges(formArrayItem: FormGroup) {
    formArrayItem.valueChanges.pipe(
      // prevent unnecessary save
      debounceTime(this.AUTOSAVE_DEBOUNCE_TIME),
      distinctUntilChanged(),

      // to execute the save calls one after another
      concatMap(value => this.saveRow(value)),
      // Emit values until provided observable emits.
      takeUntil(this.unsubscribe$),
      catchError(err => {
        this.rowAdd = false;
        console.error(`Error during save : ${err}.`);
        return throwError(err);
    }),
    ) 
    .subscribe(() => {
      formArrayItem.markAsPristine();
      formArrayItem.markAsUntouched();
      this.rowAdd = false;
      this.messageService.add({severity:'success', summary: 'Success', detail: `FormData save is successed!`});
    });    
}

  private createFormArrayItem(formData?: FormDataModel): FormGroup {
    const formArrayItem = this.formBuilder.group({
      key: [ null ],
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
    const currentDate = formData && formData.currentDate ? new Date(formData.currentDate) : new Date();
    formArrayItem.get('currentDate')?.patchValue(currentDate);
    const description = formData ? formData.description : null;
    formArrayItem.get('description')?.patchValue(description);
    const comment = formData ? formData.comment : null;
    formArrayItem.get('comment')?.patchValue(comment);
    const key = formData ? formData.key : null;
    formArrayItem.get('key')?.patchValue(key);
    this.setupValueChanges(formArrayItem);
    return formArrayItem;
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
      this.rowAdd = true;
      console.log(`onAddRow  : ${JSON.stringify(formArrayItem.value)} at ${event.target}.`)
    }
  }


  onClearModel(event: Event) {
    if (this.mainForm) {
      if (confirm("Are you sure to remove all rows?")) {
        const mainFormContent = this.mainForm.value;
        this.clearModel(true);
        this.firebaseService.deleteAll().then(() => {
          console.log(`Delete all FormArray items : ${JSON.stringify(mainFormContent)} at ${event.target}.`);
          this.messageService.add({severity:'success', summary: 'Success', detail: `Deleted All FormArray items!`});
        }, reason => {
          console.error(`Error when try to delete all FormArray item! Error ${reason}`);
        });
      }
    }
  }

  isFormValid(): boolean {
    return this.mainForm && this.mainForm.valid;
  }

  hasFormArrayItems(): boolean {
    return this.getRowCount().length > 0;
  }

  onClickDeleteItem(rowAsFormArrayItem: FormGroup, ix: number) {
    const key = rowAsFormArrayItem.get('key')?.value;
    const hexId = rowAsFormArrayItem.get('hexId')?.value;
    const formArray = <FormArray>this.mainForm.get('formArrayItems');
    formArray.removeAt(ix);
    if (key) {
      this.firebaseService.delete(key).then(() => {
        console.log(`Delete FormArray item : ${JSON.stringify(rowAsFormArrayItem.value)} at Hex Id: ${hexId}.`)
        this.messageService.add({severity:'success', summary: 'Success', detail: `FormData delete is successed! Hex Id: ${hexId}.`});
      }, reason => {
        console.error(`Error when try to delete FormArray item : ${JSON.stringify(rowAsFormArrayItem.value)} at Hex Id: ${hexId} Error ${reason}.`)
      });
    } else {
      this.rowAdd = false;
    }
  }

  trackByFn(item: FormDataModel) {
    return item.hexId;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }  
}
