import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { OperationModeKind } from './operation-mode-kind.enum';

@Component({
  selector: 'app-angular-page-content15',
  templateUrl: './angular-page-content15.component.html',
  styleUrls: ['./angular-page-content15.component.scss']
})
export class AngularPageContent15Component implements OnInit {
  INCREMENT_ONE = 1;
  DECREMENT_ONE = -1;
  githubLogoPath: string;
  defaultRows = 5;
  logValue: string;
  fieldRequired: boolean;
  customTextMaxLength = 250;
  customTextMinLength = 0;
  maxRowstLimit = 10;  
  debounceTimeValue = 500;
  displayDate: Date;
  useSelectedOperator = false;
  operationModeKind = OperationModeKind.KIND_DEBOUNCE;
  operationModeKindIsDebounce: boolean;
  lastOperationModeKindIsDebounce: boolean;
  datePipe = new DatePipe('en-US');
  private buttonClickedSubject = new Subject<number>();
  buttonClicked$: Observable<number>;
  @ViewChild('dataEntryForm', {static: true} ) dataEntryForm: NgForm;
  
  constructor() { }

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.logValue = '';
    this.displayDate = new Date(Date.now());
    this.operationModeKindIsDebounce = true;
    this.lastOperationModeKindIsDebounce = true;
    this.evaluateModeKind();
    this.setupObservable();

    this.buttonClicked$.subscribe((value: number) => {
      console.log('Value ' + value);
      const dt = this.datePipe.transform(this.displayDate, 'MMM d, y');
      this.logValue = this.logValue + ' ' + dt + '\n';
    });
    this.dataEntryForm.statusChanges?.subscribe(() => {
      this.evaluateModeKind();
    });
    
  }

  private setNewDate(date: Date, increment: boolean) {
    let newDate = 0;
    if (increment) {
      newDate = date.setDate(date.getDate() + this.INCREMENT_ONE);
    } else {
      newDate = date.setDate(date.getDate() + this.DECREMENT_ONE);
    }
    this.displayDate = new Date(newDate);
  }

  onClickLeft() {
    this.setNewDate(this.displayDate, false);
    if (this.useSelectedOperator) {
      switch (this.operationModeKind) {
        case OperationModeKind.KIND_DEBOUNCE : {
          this.buttonClickedSubject.next(this.DECREMENT_ONE);
          break;
        }
        case OperationModeKind.KIND_SWITCHMAP : {
          this.buttonClickedSubject.next(this.DECREMENT_ONE);
          break;
        }
      }
    } else {
      const dt = this.datePipe.transform(this.displayDate, 'MMM d, y');
      this.logValue = this.logValue + ' ' + dt + '\n';
      console.log('onClickRight value:' + this.DECREMENT_ONE);
    }
  }

  onClickRight() {
    this.setNewDate(this.displayDate, true);
    if (this.useSelectedOperator) {
      switch (this.operationModeKind) {
        case OperationModeKind.KIND_DEBOUNCE : {
          this.buttonClickedSubject.next(this.INCREMENT_ONE);
          break;
        }
        case OperationModeKind.KIND_SWITCHMAP : {
          this.buttonClickedSubject.next(this.INCREMENT_ONE);
          break;
        }
      }
    } else {
      const dt = this.datePipe.transform(this.displayDate, 'MMM d, y');
      this.logValue = this.logValue + ' ' + dt + '\n';
      console.log('onClickRight value:' + this.INCREMENT_ONE);
    }
  }

  onClickClearLogs() {
    this.logValue = '';
  }

  onClearClicked(date: Date) {

    console.log('onClearClicked event arg ' + JSON.stringify(date) + ' customDate ' + JSON.stringify(this.displayDate));
  }

  onTodayClicked(date: Date) {
    console.log('onTodayClicked event arg ' + JSON.stringify(date) + ' customDate ' + JSON.stringify(this.displayDate));
  }

  onDateSelected(date: Date) {
    console.log('onDateSelected event arg ' + JSON.stringify(date) + ' customDate ' + JSON.stringify(this.displayDate));
  }

  setupObservable() {
    switch (this.operationModeKind) {
      case OperationModeKind.KIND_DEBOUNCE : {
        this.buttonClicked$ = this.buttonClickedSubject.pipe(debounceTime(this.debounceTimeValue));
        break;
      }
      case OperationModeKind.KIND_SWITCHMAP: {
        this.buttonClicked$ = this.buttonClickedSubject.pipe(switchMap(
          inputData => {
            return of(inputData);
          }
        ));
        break;
      }
    }    
  }

  evaluateModeKind() {
    if (this.lastOperationModeKindIsDebounce !== this.operationModeKindIsDebounce) {
      this.lastOperationModeKindIsDebounce = this.operationModeKindIsDebounce;
      this.operationModeKind = this.operationModeKindIsDebounce ?  OperationModeKind.KIND_DEBOUNCE : OperationModeKind.KIND_SWITCHMAP;
      this.setupObservable();
    }
  }
}
