import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-angular-page-content15',
  templateUrl: './angular-page-content15.component.html',
  styleUrls: ['./angular-page-content15.component.scss']
})
export class AngularPageContent15Component implements OnInit {
  githubLogoPath: string;
  defaultRows = 5;
  logValue: string;
  fieldRequired: boolean;
  customTextMaxLength = 250;
  customTextMinLength = 0;
  maxRowstLimit = 10;  
  debounceTimeValue = 500;
  displayDate: Date;
  withDebounceTime = false;
  useDebounceTime: boolean;
  datePipe = new DatePipe('en-US');
  private buttonClickedSubject = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.logValue = '';
    this.displayDate = new Date(Date.now());
    this.useDebounceTime = true;

    const buttonClickedDebounced = this.buttonClickedSubject.pipe(debounceTime(this.debounceTimeValue));
    buttonClickedDebounced.subscribe((value: number) => {
      console.log('Value ' + value);
      const dt = this.datePipe.transform(this.displayDate, 'MMM d, y');
      this.logValue = this.logValue + ' ' + dt + '\n';
    });

    
  }

  private setNewDate(date: Date, increment: boolean) {
    let newDate = 0;
    if (increment) {
      newDate = date.setDate(date.getDate() + 1);
    } else {
      newDate = date.setDate(date.getDate() + -1);
    }
    this.displayDate = new Date(newDate);
  }

  onClickLeft() {
    this.setNewDate(this.displayDate, false);
    if (this.withDebounceTime) {
      this.buttonClickedSubject.next(-1);
    } else {
      const dt = this.datePipe.transform(this.displayDate, 'MMM d, y');
      this.logValue = this.logValue + ' ' + dt + '\n';
    }
  }

  onClickRight() {
    this.setNewDate(this.displayDate, true);
    if (this.withDebounceTime) {
      this.buttonClickedSubject.next(1);
    } else {
      const dt = this.datePipe.transform(this.displayDate, 'MMM d, y');
      this.logValue = this.logValue + ' ' + dt + '\n';
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
}
